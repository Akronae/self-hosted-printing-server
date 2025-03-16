import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma';
import { PrintController } from './print.controller';
import { PrintService } from './print.service';

@Module({
  imports: [PrismaModule],
  providers: [PrintService],
  controllers: [PrintController],
})
export class PrintModule {}
