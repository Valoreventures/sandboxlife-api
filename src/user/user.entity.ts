// src/user/user.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password_hash: string;

  @Column({ unique: true })
  username: string;

  @Column()
  full_name: string;

  @CreateDateColumn()
  created_at: Date;
}
