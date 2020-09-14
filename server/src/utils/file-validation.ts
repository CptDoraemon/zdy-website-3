import {BadRequestException, Injectable} from '@nestjs/common';
import * as path from 'path'

@Injectable()
export class FileValidation {
  private readonly KB = 1024;
  private readonly MB = 1024 * 1024;
  private readonly GB = 1024 * 1024 * 1024;

  getSizeString(size: number) {
    let result = '';

    if (size < this.KB) {
      return `${result} Byte`
    } else if (size >= this.KB && size < this.MB) {
      result = `${(size / this.KB).toFixed(1)} KB`;
    } else if (size >= this.MB && size < this.GB) {
      result = `${(size / this.MB).toFixed(1)} MB`;
    } else if (size >= this.GB) {
      result = `${(size / this.GB).toFixed(1)} GB`
    }

    return result
  }

  validate(file: Express.Multer.File, size: number, extensions: string[]) {
    if (!file) {
      throw new BadRequestException(`File required`)
    } else if (file.size >= size) {
      throw new BadRequestException(`Maximum file size allowed: ${this.getSizeString(size)}`)
    } else if (extensions.indexOf(path.extname(file.originalname)) === -1) {
      throw new BadRequestException(`File types allowed: ${extensions.join(', ')}`)
    }

    return file
  }
}
