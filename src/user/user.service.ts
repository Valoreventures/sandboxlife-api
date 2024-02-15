// src/user/user.service.ts

import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { User } from './user.entity';
// src/your_module/your.service.ts

@Injectable()
export class UserService {
  constructor(
    // @InjectRepository(User)
    // private usersRepository: Repository<User>,
    private readonly supabaseService: SupabaseService,
  ) {}

  async findAll() {
    // return this.usersRepository.find();
    const data = await this.supabaseService.getTable('user');
    return data;
  }

  async findOne(id: string) {
    return await this.supabaseService.getIdFromTable('user', id);
  }

  // Add methods for creating and updating users as needed
}
