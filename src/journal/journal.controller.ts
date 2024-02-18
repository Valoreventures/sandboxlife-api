// src/user/user.controller.ts

import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { JournalService } from './journal.service';
import { Journal } from './journal.entity';

@Controller('journal_entries')
export class JournalController {
  constructor(private readonly journalService: JournalService) {}

  @Get()
  getAllJournalEntries(): Promise<Journal[]> {
    return this.journalService.findAll();
  }

  @Get(':id')
  getAllJournalEntry(@Param('id') id: string): Promise<Journal> {
    const data = this.journalService.findOne(id);
    return data[0];
  }

  @Post()
  addJournal(@Body() journalData: Journal): Promise<Journal> {
    // Implement the logic to create a new user
    return this.journalService.addJournal(journalData);
  }

  @Put(':entry_id')
  updateJournal(
    @Param('entry_id') entryId: string,
    @Body() journalData: Journal,
  ) {
    return this.journalService.updateJournal(journalData, entryId);
    // Implement the logic to update an existing user
  }

  // @Patch(':id')
  // partialUpdateUser(@Param('id') id: string, @Body() userData: Partial<User>): Promise<User> {
  //   // Implement the logic for partial updates
  // }
}
