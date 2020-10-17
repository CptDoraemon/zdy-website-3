import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: "user"})
export class UserEntity {

  @PrimaryGeneratedColumn()
  'id': number;

  @Column()
  'username': string;

  @Column()
  'password': string;

  @Column()
  'isAdmin': boolean;

  @Column()
  'created': string;

  @Column()
  'lastLogin': string
}
