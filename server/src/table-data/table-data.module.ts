import { Module } from '@nestjs/common';
import { TableDataController } from './table-data.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TableDataEntity} from "./table-data.entity";
import {TableDataService} from "./table-data.service";

@Module({
  imports: [TypeOrmModule.forFeature([TableDataEntity])],
  controllers: [
    TableDataController
  ],
  providers: [TableDataService]
})
export class TableDataModule {

}
