// src/user/user.service.ts

import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async findAll() {
    const data = await this.supabaseService.getTable('users');
    return data;
  }

  async findOne(id: string) {
    return await this.supabaseService.getIdFromTable('users', id);
  }

  async registerUser(user: User) {
    return await this.supabaseService.insertRowIntoTable('users', user);
  }

  async updateUser(user: User, emailId: string) {
    return await this.supabaseService.updateRowInTable(
      'users',
      user,
      'email_id',
      emailId,
    );
  }

  async loginUser(username: string, password: string) {
    return await this.supabaseService.verifyLoginOfUser(
      'users',
      username,
      password,
    );
  }

  // Add methods for creating and updating users as needed
}
