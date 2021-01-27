import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository, In, getConnection} from 'typeorm';
import {TableDataEntity} from "./table-data.entity";
import {OnApplicationBootstrap} from "@nestjs/common";
import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'fast-csv';

@Injectable()
export class TableDataService implements OnApplicationBootstrap {

  public readonly csvFilePath = path.join(__dirname, 'table-data.csv');

  constructor(
    @InjectRepository(TableDataEntity) private repository: Repository<TableDataEntity>,
  ) {}

  async onApplicationBootstrap() {
    const generateCsvFile = (data, stream) => {
      return new Promise((resolve) => {
        csv
          .write(data, { headers: true, writeBOM: true })
          .on("finish", function() {
            console.log("table data csv generated");
            return resolve(true)
          })
          .pipe(stream);
      })
    };
    const ws = fs.createWriteStream(this.csvFilePath, {encoding: 'utf8'});
    const jsonData = await this.repository.find();
    await generateCsvFile(jsonData, ws);
  }

  async getTableData(sortBy, sortOrder, rowPerPage, page, Gene) {
    const skip = (page - 1) * rowPerPage;

    const where = Gene ? {where: {'Gene': In(Gene)}} : {};

    const result = await this.repository.find({
      ...where,
      order: {
        [sortBy]: sortOrder
      },
      skip,
      take: rowPerPage
    });

    const totalRows = await this.repository.count({
      ...where,
    });

    return {
      result,
      totalRows
    }
  }

  getTableColumns() {
    return this.repository.metadata.columns.map(obj => obj.propertyName);
  }

  async getColumnOptions(columnName) {
    const result = await getConnection()
      .createQueryBuilder(TableDataEntity, "table")
      .select(`table.${columnName}`)
      // .setParameter("columnName", columnName)
      .groupBy(`table.${columnName}`)
      // .setParameter("columnName", columnName)
      .execute();

    const options = result.map(obj => Object.values(obj)[0]);
    options.sort((a, b) => a.localeCompare(b));
    return options
  }

}
