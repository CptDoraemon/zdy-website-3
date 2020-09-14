import { Injectable } from '@nestjs/common';
import * as archiver from 'archiver';
import * as stream from 'stream'
import {Stream} from "stream";

@Injectable()
export class GenerateZipService {
  /**
   * given name, email, note and a Multer file
   * generate zip file contains a txt file and the .csv file
   * txt file includes name, email and note
   */
  getZip(name: string, email: string, note: string, file: Express.Multer.File) {
    return new Promise<Stream>((resolve, reject) => {
      const writable = new stream.PassThrough();
      const info = `name: ${name} \nemail: ${email} \nnote: ${note} \n`;

      const zip = archiver('zip', {
        zlib: { level: 9 } // Sets the compression level.
      });

      zip.on('warning', (e) => {
        console.log(e);
      });

      zip.on('error', (e) => {
        console.log(e);
        reject(e)
      });

      zip.on('finish', () => {
        resolve(writable)
      });

      zip.pipe(writable);
      zip.append(info, {name: 'info.txt'});
      zip.append(file.buffer, {name: file.originalname});
      zip.finalize();
    })
  }
}
