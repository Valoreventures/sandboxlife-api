// src/supabase/supabase.service.ts

import { Injectable, Inject } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { User } from 'src/user/user.entity';

@Injectable()
export class SupabaseService {
  constructor(@Inject('SupabaseClient') private supabase: SupabaseClient) {}

  // Example function to get data from a table
  async getTable(tableName: string) {
    const { data, error } = await this.supabase.from(tableName).select('*');

    if (error) throw new Error(error.message);
    return data;
  }

  async getIdFromTable(tableName: string, id: string) {
    const { data, error } = await this.supabase
      .from(tableName)
      .select()
      .eq('id', id);

    if (error) throw new Error(error.message);
    return data;
  }

  async getUsernameFromTable(tableName: string, username: string) {
    const { data, error } = await this.supabase
      .from(tableName)
      .select()
      .eq('username', username);

    if (error) throw new Error(error.message);
    return data;
  }

  async insertRowIntoTable(tableName: string, user: User) {
    const { data, error } = await this.supabase.from(tableName).insert(user);

    if (error) throw new Error(error.message);
    return data;
  }

  async verifyLoginOfUser(tableName: string, user: User, password: string) {
    const data = await this.getUsernameFromTable(tableName, user.username);
    if (user.password_hash === password) {
      return data[0];
    }
    return { login: 'failed' };
  }

  // Add more functions as needed to interact with your Supabase project
}
