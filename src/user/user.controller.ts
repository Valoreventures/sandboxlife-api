// src/user/user.controller.ts

import { Controller, Get, Post, Body, Patch, Param, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  getUser(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post()
  createUser(@Body() userData: User): Promise<User> {
    // Implement the logic to create a new user
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() userData: User): Promise<User> {
    // Implement the logic to update an existing user
  }

  @Patch(':id')
  partialUpdateUser(@Param('id') id: string, @Body() userData: Partial<User>): Promise<User> {
    // Implement the logic for partial updates
  }
}
