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

  async getEmailDetailsFromTable(tableName: string, email: string) {
    const { data, error } = await this.supabase
      .from(tableName)
      .select()
      .eq('email', email)
      .limit(1);

    if (error) throw new Error(error.message);
    return data;
  }

  async insertRowIntoTable(tableName: string, user: User) {
    const { data, error } = await this.supabase.from(tableName).insert(user);

    if (error) throw new Error(error.message);
    return data;
  }

  async verifyLoginOfUser(tableName: string, email: string, password: string) {
    const [data] = await this.getEmailDetailsFromTable(tableName, email);
    console.log(data.password_hash, 'data');
    if (data.password_hash === password) {
      return data;
    }
    return { login: 'failed' };
  }

  // Add more functions as needed to interact with your Supabase project
}
