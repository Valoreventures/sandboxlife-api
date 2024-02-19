// src/user/user.service.ts

import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { Journal } from './journal.entity';

@Injectable()
export class JournalService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async findAll() {
    const data = await this.supabaseService.getTable('journal_entries');
    return data;
  }

  async findOne(id: string) {
    return await this.supabaseService.getIdFromTable('journal_entries', id);
  }

  async findUserJournals(user_id: string) {
    return await this.supabaseService.getRowsFromTable(
      'journal_entries',
      'user_id',
      user_id,
    );
  }

  async addJournal(journal: Journal) {
    return await this.supabaseService.insertRowIntoTable(
      'journal_entries',
      journal,
    );
  }

  async updateJournal(journal: Journal, entryId: string) {
    return await this.supabaseService.updateRowInTable(
      'journal_entries',
      journal,
      'entry_id',
      entryId,
    );
  }
}
