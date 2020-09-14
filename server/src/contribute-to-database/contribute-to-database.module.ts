import { Module } from '@nestjs/common';
import { ContributeToDatabaseController } from './contribute-to-database.controller';
import {FileValidation} from "../utils/file-validation";
import {StorageModule} from "../storage/storage.module";
import { GenerateZipService } from './generate-zip.service';

@Module({
  imports: [
    StorageModule
  ],
  providers: [
    FileValidation,
    GenerateZipService,
  ],
  controllers: [ContributeToDatabaseController]
})
export class ContributeToDatabaseModule {}
