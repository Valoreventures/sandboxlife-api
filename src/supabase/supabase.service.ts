// src/supabase/supabase.service.ts

import { Injectable, Inject } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

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

  // Add more functions as needed to interact with your Supabase project
}
