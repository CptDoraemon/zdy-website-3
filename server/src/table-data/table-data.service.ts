import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository, Between, In, createQueryBuilder, getConnection} from 'typeorm';
import {TableDataEntity} from "./table-data.entity";

@Injectable()
export class TableDataService {
  constructor(
    @InjectRepository(TableDataEntity)
    private repository: Repository<TableDataEntity>,
  ) {}

  async getTableData(sortBy, sortOrder, rowPerPage, page, Gene_symbol) {
    const skip = (page - 1) * rowPerPage;

    const where = Gene_symbol ? {where: {'Gene_symbol': In(Gene_symbol)}} : {};

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
    console.log(where);

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

    return result.map(obj => Object.values(obj)[0])
  }

}
