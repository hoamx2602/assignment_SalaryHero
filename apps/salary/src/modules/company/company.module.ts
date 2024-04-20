import { Module } from '@nestjs/common';
import { CoreModule } from '../../core/core.module';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { CompanyRepository } from '@app/common';
@Module({
  imports: [CoreModule],
  controllers: [CompanyController],
  providers: [CompanyService, CompanyRepository],
})
export class CompanyModule {}
