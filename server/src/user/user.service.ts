import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UserEntity} from "./user.entity";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private repository: Repository<UserEntity>,
  ) {}

  async findOne(username: string): Promise<UserEntity | undefined> {
    return this.repository.findOne({where: {username}})
  }

  private getTimeStamp() {
    return new Date().toISOString();
  };

  async updateLastLogin (user: UserEntity) {
    user.lastLogin = this.getTimeStamp();
    await this.repository.save(user);
  };

  async createUser(username: string, password: string, isAdmin: boolean) {
    // check if user exists
    const user = await this.findOne(username);
    if (user) throw new BadRequestException('user exists');

    // create user
    const newUser = new UserEntity();
    const now = this.getTimeStamp();
    newUser.password = await bcrypt.hash(password, 10);
    newUser.username = username;
    newUser.isAdmin = isAdmin;
    newUser.created = now;
    newUser.lastLogin = now;
    return await this.repository.save(newUser);
  }

  async getAllUsers() {
    return await this.repository.find();
  }

  async deleteUsers(username: string) {
    // check if user exists
    const user = await this.findOne(username);
    if (!user) throw new BadRequestException('no such user');

    await this.repository.delete(user);
    return true
  }
}
