import {Controller, Get, Query, Req, Response} from '@nestjs/common';
import {SuccessResponse} from "../utils/response-template";
import {TableDataDto} from "./table-data.dto";
import {TableDataService} from "./table-data.service";
import {TableDataQueryDto} from "./table-data-query.dto";

@Controller('table-data')
export class TableDataController {

  constructor(private tableDataService: TableDataService) {}

  @Get()
  async getData(
    @Req() req,
    @Query() query: TableDataQueryDto
  ): Promise<SuccessResponse<TableDataDto>> {

    const {sortBy, sortOrder, rowPerPage, page, Gene} = query;
    const {result, totalRows} = await this.tableDataService.getTableData(sortBy, sortOrder, rowPerPage, page, Gene);

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

  @Get('/columns')
  async columns(): Promise<SuccessResponse<TableDataDto>> {

    const columns = await this.tableDataService.getTableColumns();

    return {
      status: 'ok',
      data: {
        columns
      },
    };
  }

  @Get('/column-options')
  async columnOptions(
    @Query('column') column: string
  ): Promise<SuccessResponse<TableDataDto>> {

    const options = await this.tableDataService.getColumnOptions(column);

    return {
      status: 'ok',
      data: {
        options
      },
    };
  }

  @Get('/csv')
  async getCsv(@Response() res) {
    res.download(this.tableDataService.csvFilePath)
  }
}
