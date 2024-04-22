import {
  IJobTask,
  IncomeHistory,
  IncomeHistoryRepository,
  JobLogRepository,
  JobState,
  UserBalance,
  UserBalanceRepository,
  generateJobKey
} from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { ConsumerHelper } from './helper/consumer.helper';

@Injectable()
export class ConsumerService {
  private readonly logger = new Logger(ConsumerService.name);
  constructor(
    private jobLogRepository: JobLogRepository,
    private userBalanceRepository: UserBalanceRepository,
    private incomeHistoryRepository: IncomeHistoryRepository,
    private consumerHelper: ConsumerHelper
  ) {}

  async handleTask(data: IJobTask) {
    const { user_id, company_id, dateTime } = data;

    const jobKey = generateJobKey(user_id, company_id);
    const job = await this.jobLogRepository.getJobLogByKey(jobKey);

    if (job && (job.job_state === JobState.COMPLETED || job.job_state === JobState.PROCESSING)) return;

    const { user, userSalaryConfig } = await this.consumerHelper.getUserCalculateInfor(user_id, company_id);

    if (!user || !userSalaryConfig) {
      this.logger.error("IncorrectInformation", JSON.stringify(data));
      return;
    }

    const historyIncome = await this.incomeHistoryRepository.getHistoryIncome(user.email, dateTime);

    // Handle create new IncomeSalaryHistory
    const dailyIncome = this.consumerHelper.dailyIncomeFormula(userSalaryConfig.base_salary, userSalaryConfig.number_working_day);
    const newHistoryIncome = new IncomeHistory();
    newHistoryIncome.user_email = user.email;
    newHistoryIncome.daily_income = dailyIncome;
    newHistoryIncome.processed_date = dateTime;
    newHistoryIncome.total_income = historyIncome ? historyIncome.total_income + dailyIncome : dailyIncome;

    // Handle user balance;
    let userBalance = await this.userBalanceRepository.getUserBalance(user.email);

    if (!userBalance) {
      // Create new user balance
      userBalance = new UserBalance();
      userBalance.user_email = user.email;
      userBalance.available_balance = 0;
      userBalance.pending_balance = dailyIncome;
    } else {
      // Calculate user balance for user
      userBalance.available_balance = userBalance.available_balance + dailyIncome;
      userBalance.pending_balance = dailyIncome;
    }

    const session = await this.userBalanceRepository.startTransaction();
    try {
      await Promise.all([
        this.incomeHistoryRepository.create(newHistoryIncome, { session }),
        this.userBalanceRepository.create(userBalance, {session})
      ]);

      // All action success then commit transaction
      await session.commitTransaction();
    } catch (error) {
      this.logger.error("HandleTaskFailed", JSON.stringify({ userBalance, newHistoryIncome, userId: user_id, companyId: company_id}));
      await session.abortTransaction();
    }
  }

}
