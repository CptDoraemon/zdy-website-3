import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: "drug"})
export class TableDataEntity {

  @PrimaryGeneratedColumn()
  'id': number;

  @Column()
  'Gene': string;

  @Column({
    nullable: true
  })
  'Alterations': string;

  @Column({
    nullable: true
  })
  'Cancer_Type': string;

  @Column({
    nullable: true
  })
  'Drugs': string;

  @Column({
    nullable: true
  })
  'Level': string;
}
