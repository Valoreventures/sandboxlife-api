// src/user/user.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Journal {
  @PrimaryGeneratedColumn('uuid')
  entry_id: string;

  @Column({ unique: true })
  user_id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ unique: true })
  icon_id: string;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}
