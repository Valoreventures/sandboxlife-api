// src/supabase/supabase.service.ts

import { Injectable, Inject } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { table } from 'console';
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
      .eq('user_id', id)
      .limit(1);

    if (error) throw new Error(error.message);
    return data;
  }

  async getRowsFromTable(tableName: string, key: string, id: string) {
    const { data, error } = await this.supabase
      .from(tableName)
      .select()
      .eq(key, id);

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

  async insertRowIntoTable(tableName: string, object: any) {
    const { data, error } = await this.supabase.from(tableName).insert(object);

    if (error) throw new Error(error.message);
    return data;
  }

  async updateRowInTable(
    tableName: string,
    object: any,
    whereKey: string,
    userId: string,
  ) {
    const [data] = await this.getIdFromTable(tableName, userId);
    if (data) {
      await this.supabase.from(tableName).update(object).eq(whereKey, userId);
      const updatedData = this.getIdFromTable(tableName, userId);
      return updatedData;
    }
    throw new Error('User Id not present');
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
