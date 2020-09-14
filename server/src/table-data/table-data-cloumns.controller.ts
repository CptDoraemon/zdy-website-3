import {Controller, Get} from '@nestjs/common';
import {TableDataService} from "./table-data.service";
import {SuccessResponse} from "../utils/response-template";
import {TableDataDto} from "./table-data.dto";

@Controller('table-data-columns')
export class TableDataColumnsController {

  constructor(private tableDataService: TableDataService) {}

  @Get()
  async getData(): Promise<SuccessResponse<TableDataDto>> {

    const columns = await this.tableDataService.getTableColumns();

    return {
      status: 'ok',
      data: {
        columns
      },
    };
  }
}
