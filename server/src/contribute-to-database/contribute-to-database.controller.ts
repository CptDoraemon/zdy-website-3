import {Body, Controller, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {SuccessResponse} from "../utils/response-template";
import {FileInterceptor} from "@nestjs/platform-express";
import {ContributeToDatabaseDto} from "./contribute-to-database.dto";
import {FileValidation} from "../utils/file-validation";
import {StorageService} from "../storage/storage.service";
import {GenerateZipService} from "./generate-zip.service";

@Controller('contribute-to-database')
export class ContributeToDatabaseController {
  private maxFileSize = 5 * 1024 * 1024; //5mb

  constructor(
    private fileValidation: FileValidation,
    private storageService: StorageService,
    private generateZipService: GenerateZipService
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async postForm(
    @Body() form: ContributeToDatabaseDto,
    @UploadedFile() file,
  ): Promise<SuccessResponse<string>> {
    const validatedFile = this.fileValidation.validate(file, this.maxFileSize, ['.csv', '.txt']);

    const filename = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}.zip`;
    const zipStream = await this.generateZipService.getZip(form.name, form.email, form.note, validatedFile);
    const uploadStatus = await this.storageService.putObject(filename, zipStream);

    return {
      status: 'ok',
      data: 'submitted'
    };
  }
}
