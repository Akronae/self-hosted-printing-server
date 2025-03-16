import {
  Body,
  Controller,
  Post,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';
import { AuthGuard, AuthReq } from '../auth/auth.guard';
import { Roles } from '../auth/roles.guard';
import { PrismaService } from '../prisma';
import { PrintRequestDto } from './print.dto';
import { PrintService } from './print.service';

@Controller('print')
export class PrintController {
  constructor(
    private readonly service: PrintService,
    private readonly db: PrismaService,
  ) {}

  @Post()
  @Roles(['verified'])
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(AnyFilesInterceptor())
  @UseGuards(AuthGuard)
  async print(
    @Req() req: AuthReq,
    @Body() body: PrintRequestDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    console.log({ files });
    await this.service.print(req.user.sub, files[0]);
  }
}
