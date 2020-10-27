import { Exclude, Type, Transform } from 'class-transformer';
import {UserEntity} from "../../user/user.entity";

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const getTimeString = (ISOString: string) => {
  const date = new Date(ISOString);
  const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  return `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()} - ${hour}:${minute}`
};

class User extends UserEntity {

  @Exclude()
  password: string;

  @Transform(string => getTimeString(string))
  created: string;

  @Transform(string => getTimeString(string))
  lastLogin: string;

  constructor(partial: Partial<UserEntity>) {
    super();
    Object.assign(this, partial);
  }
}

export class AllUsersResponse {
  @Type(() => User)
  users: User[];
}
