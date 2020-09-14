import { Module } from '@nestjs/common';
import { TableDataController } from './table-data.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TableDataEntity} from "./table-data.entity";
import {TableDataService} from "./table-data.service";
import {TableDataColumnOptionsController} from "./table-data-column-options.controller";
import {TableDataColumnsController} from "./table-data-cloumns.controller";

@Module({
  imports: [TypeOrmModule.forFeature([TableDataEntity])],
  controllers: [
    TableDataController,
    TableDataColumnOptionsController,
    TableDataColumnsController
  ],
  providers: [TableDataService]
})
export class TableDataModule {

}
