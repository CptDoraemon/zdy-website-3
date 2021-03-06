import {MinLength, MaxLength} from "class-validator";

export class AdminRegisterRequestDto {
  @MinLength(5)
  @MaxLength(20)
  username: string;

  @MinLength(5)
  @MaxLength(20)
  password: string;

  @MinLength(5)
  @MaxLength(20)
  token: string;
}
