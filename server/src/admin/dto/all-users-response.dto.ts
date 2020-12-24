import { Exclude, Type } from 'class-transformer';
import {UserEntity} from "../../user/user.entity";

class User extends UserEntity {

  @Exclude()
  password: string;

  constructor(partial: Partial<UserEntity>) {
    super();
    Object.assign(this, partial);
  }
}

export class AllUsersResponse {
  @Type(() => User)
  users: User[];
}
