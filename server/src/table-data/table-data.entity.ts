import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: "drug"})
export class TableDataEntity {

  @PrimaryGeneratedColumn()
  'id': number;

  @Column()
  'Gene_symbol': string;

  @Column({
    nullable: true
  })
  'Drug_name': string;

  @Column({
    nullable: true
  })
  'Drug_type': string;

  @Column({
    nullable: true
  })
  'disease': string;

  @Column({
    nullable: true
  })
  'FDA Source': string;
}
