import { env } from '@/src/utils/env/load-env';
import { Injectable } from '@nestjs/common';
import { randomInt } from 'crypto';
import { addSeconds } from 'date-fns';
import ipp, { Printer } from 'ipp';
import Pngtojpeg from 'png-to-jpeg';
import { PrismaService } from '../prisma';
const pngtojpeg = Pngtojpeg();

export class DocumentNotSupportedError extends Error {}

@Injectable()
export class PrintService {
  constructor(private readonly db: PrismaService) {}

  async print(userid: number, file: Express.Multer.File) {
    const { pdf } = await eval('import("pdf-to-img")');
    const printer = new ipp.Printer(env.PRINTER_URL);
    const exec: Printer['execute'] = (operation, message) => {
      return new Promise((resolve, reject) => {
        printer.execute(operation, message, (error, response) => {
          if (error) return reject(error);
          return resolve(response);
        });
      });
    };

    const filename = file.originalname;
    const pages: Buffer[] = [];

    if (filename.endsWith('.pdf')) {
      console.log(file.buffer);
      const doc = await pdf(file.buffer, { scale: 2 });
      for await (const image of doc) {
        pages.push(await pngtojpeg(image));
      }
    } else if (filename.endsWith('.png')) {
      pages.push(await pngtojpeg(file.buffer));
    } else if (filename.endsWith('.jpeg') || filename.endsWith('.jpg')) {
      pages.push(file.buffer);
    } else {
      throw new DocumentNotSupportedError(filename);
    }

    const jobname = `${filename}-${randomInt(10, 99)}`;

    for (const page of pages) {
      const printjob = await exec('Print-Job', {
        data: page,
        'operation-attributes-tag': {
          'requesting-user-name': 'Alex',
          'job-name': `${jobname}-page-${pages.indexOf(page)}`,
          'document-format': 'image/jpeg',
        },
        'job-attributes-tag': { 'print-color-mode': 'monochrome' },
      });
      console.log({ printjob });
    }

    const attributes = exec('Get-Job-Attributes');
    const ppm =
      attributes?.['printer-attributes-tag']?.['pages-per-minute'] ?? 10;

    await this.db.userPrintedDocuments.create({
      data: {
        userId: userid,
        name: filename,
        pages: pages.length,
        eta: addSeconds(new Date(), (pages.length / ppm) * 60),
      },
    });
  }
}
