import {Controller, Get, Query} from '@nestjs/common';
import {TableDataService} from "./table-data.service";
import {SuccessResponse} from "../utils/response-template";
import {TableDataDto} from "./table-data.dto";

@Controller('table-data-column-options')
export class TableDataColumnOptionsController {

  constructor(private tableDataService: TableDataService) {}

  @Get()
  async getData(
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
}
