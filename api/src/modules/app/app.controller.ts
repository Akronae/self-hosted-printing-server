import { Controller, Get, Version } from '@nestjs/common';
import { AppService } from './app.service';

@Controller({
  version: '1',
})
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('status')
  getStatus() {
    return this.appService.getStatus();
  }

  @Get('status')
  @Version('2')
  getStatusV2() {
    return 'wow status version 2 wow';
  }
}
