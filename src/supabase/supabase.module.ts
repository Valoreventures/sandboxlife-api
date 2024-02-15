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
        const supabaseUrl = configService.get<string>(process.env.SUPABASE_URL);
        const supabaseKey = configService.get<string>(process.env.SUPABASE_KEY);
        return createClient(supabaseUrl, supabaseKey);
      },
      inject: [ConfigService],
    },
    SupabaseService,
  ],
  exports: ['SupabaseClient', SupabaseService],
})
export class SupabaseModule {}
