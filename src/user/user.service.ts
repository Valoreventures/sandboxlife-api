// src/user/user.service.ts

import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { User } from './user.entity';
// import bcrypt from 'bcrypt';
const crypto = require('crypto');
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
    const data = await this.supabaseService.getTable('users');
    return data;
  }

  async findOne(id: string) {
    return await this.supabaseService.getIdFromTable('users', id);
  }

  async registerUser(user: User) {
    // const salt = crypto.randomBytes(16).toString('hex');
    // // Hashing user's salt and password with 1000 iterations,
    // const hash = crypto
    //   .pbkdf2Sync(user.password_hash, salt, 1000, 64, `sha512`)
    //   .toString(`hex`);
    // user.password_hash = hash;
    return await this.supabaseService.insertRowIntoTable('users', user);
  }

  async updateUser(user: User, emailId: string) {
    // const salt = crypto.randomBytes(16).toString('hex');
    // // Hashing user's salt and password with 1000 iterations,
    // const hash = crypto
    //   .pbkdf2Sync(user.password_hash, salt, 1000, 64, `sha512`)
    //   .toString(`hex`);
    // user.password_hash = hash;
    return await this.supabaseService.updateRowInTable('users', user, emailId);
  }

  async loginUser(username: string, password: string) {
    // const salt = crypto.randomBytes(16).toString('hex');
    // // Hashing user's salt and password with 1000 iterations,
    // const hash = crypto
    //   .pbkdf2Sync(user.password_hash, salt, 1000, 64, `sha512`)
    //   .toString(`hex`);
    // user.password_hash = hash;
    return await this.supabaseService.verifyLoginOfUser(
      'users',
      username,
      password,
    );
  }

  // Add methods for creating and updating users as needed
}
