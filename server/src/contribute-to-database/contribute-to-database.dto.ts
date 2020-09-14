import {MinLength, MaxLength, ValidateIf} from "class-validator";

export class ContributeToDatabaseDto {
  @ValidateIf(o => o.name !== undefined)
  @MaxLength(200)
  name: string;

  @ValidateIf(o => o.name !== undefined)
  @MaxLength(200)
  email: string;

  @MinLength(20)
  @MaxLength(2000)
  note: string;
}
