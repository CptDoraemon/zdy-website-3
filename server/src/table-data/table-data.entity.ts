import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: "drug"})
export class TableDataEntity {

  @PrimaryGeneratedColumn()
  'Gene_symbol': string;

  @Column()
  'Drug_name': string;

  @Column()
  'Drug_type': string;

  @Column()
  'disease': string;

  @Column()
  'FDA Source': string;
}
