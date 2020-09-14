import {Controller, Get, Query, Req} from '@nestjs/common';
import {SuccessResponse} from "../utils/response-template";
import {TableDataDto} from "./table-data.dto";
import { Request } from 'express';
import {TableDataService} from "./table-data.service";
import {TableDataQueryDto} from "./table-data-query.dto";

@Controller('table-data')
export class TableDataController {

  constructor(private tableDataService: TableDataService) {}

  @Get()
  async getData(
    @Req() req: Request,
    @Query() query: TableDataQueryDto
  ): Promise<SuccessResponse<TableDataDto>> {

    const {sortBy, sortOrder, rowPerPage, page, Gene_symbol} = query;
    const {result, totalRows} = await this.tableDataService.getTableData(sortBy, sortOrder, rowPerPage, page, Gene_symbol);

    return {
      status: 'ok',
      data: {
        tableData: result,
        currentPage: page,
        totalPages: Math.ceil(totalRows / rowPerPage),
        totalRows: totalRows,
      },
    };
  }
}
