import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ConsumerService {
  private readonly logger = new Logger(ConsumerService.name);

  async handleTask(data: any) {
    this.logger.log('Handling', data);
  }
}
