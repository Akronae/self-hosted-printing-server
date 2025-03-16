import { ApiProperty } from '@nestjs/swagger';

export class PrintRequestDto {
  @ApiProperty({ type: 'string', format: 'binary', required: true })
  file: Express.Multer.File;
}
