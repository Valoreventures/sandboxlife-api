// src/user/user.controller.ts

import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { JournalService } from './journal.service';
import { Journal } from './journal.entity';

@Controller('journal')
export class JournalController {
  constructor(private readonly journalService: JournalService) {}

  @Get()
  getAllJournalEntries(): Promise<Journal[]> {
    return this.journalService.findAll();
  }

  @Get(':id')
  getJournalEntry(@Param('id') id: string): Promise<Journal> {
    const data = this.journalService.findOne(id);
    return data[0];
  }

  @Get(':user_id')
  getJournalEntriesOfUser(
    @Param('user_id') user_id: string,
  ): Promise<Journal[]> {
    return this.journalService.findUserJournals(user_id);
  }

  @Post()
  addJournal(@Body() journalData: Journal): Promise<Journal> {
    return this.journalService.addJournal(journalData);
  }

  @Put(':entry_id')
  updateJournal(
    @Param('entry_id') entryId: string,
    @Body() journalData: Journal,
  ) {
    return this.journalService.updateJournal(journalData, entryId);
  }

  // @Patch(':id')
  // partialUpdateUser(@Param('id') id: string, @Body() userData: Partial<User>): Promise<User> {
  //   // Implement the logic for partial updates
  // }
}
