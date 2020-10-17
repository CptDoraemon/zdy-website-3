import {MaxLength, MinLength} from "class-validator";

export class CreateUserDto {
  @MinLength(5)
  @MaxLength(20)
  username: string;

  @MinLength(5)
  @MaxLength(20)
  password: string
}
