import { Injectable } from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import * as COS from 'cos-nodejs-sdk-v5';
import {Stream} from "stream";

@Injectable()
export class StorageService {
  private cos = new COS({
    SecretId: this.configService.get<string>('STORAGE_SECRET_ID'),
    SecretKey: this.configService.get<string>('STORAGE_SECRET_KEY'),
  });

  constructor(private configService: ConfigService) {}

  putObject(key: string, file: Stream) {
    return new Promise((resolve, reject) => {
      const cb = (err, data) => {
        if (err) {
          console.log(err);
          reject(err);
          return;
        }
        resolve(data)
      };

      this.cos.putObject(
        {
          Bucket: this.configService.get<string>('STORAGE_BUCKET'),
          Region: this.configService.get<string>('STORAGE_REGION'),
          Key: key,
          StorageClass: 'STANDARD',
          Body: file
        },
        cb
      )
    });
  }
}
