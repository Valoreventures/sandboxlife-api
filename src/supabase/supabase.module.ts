// src/supabase/supabase.module.ts

import { Module, Global } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SupabaseService } from './supabase.service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'SupabaseClient',
      useFactory: (configService: ConfigService) => {
        const supabaseUrl = 'https://teyudjxlutkavyyigwwz.supabase.co';
        // configService.get<string>(process.env.SUPABASE_URL);
        const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRleXVkanhsdXRrYXZ5eWlnd3d6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYzMDQ2NjgsImV4cCI6MjAyMTg4MDY2OH0.MvaDhHKE55sSIEiasenRbR9U1LKnt7ae6dZUa89LUJg';
        // configService.get<string>(process.env.SUPABASE_KEY);
        console.log(supabaseKey, supabaseUrl, 'lets go');
        return createClient(supabaseUrl, supabaseKey);
      },
      inject: [ConfigService],
    },
    SupabaseService,
  ],
  exports: ['SupabaseClient', SupabaseService],
})
export class SupabaseModule {}
