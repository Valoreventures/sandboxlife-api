// src/user/user.controller.ts

import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
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
  getUser(@Param('id') id: string): Promise<any[]> {
    return this.userService.findOne(id);
  }

  @Post()
  createUser(@Body() userData: User): Promise<User> {
    // Implement the logic to create a new user
    return this.userService.registerUser(userData);
  }

  @Post('/login')
  loginUser(@Body() userData: User): Promise<any[] | { login: string }> {
    // Implement the logic to create a new user
    // console.log(userData, 'log');
    return this.userService.loginUser(userData.email, userData.password_hash);
  }

  @Put(':email_id')
  updateUser(@Param('email_id') email: string, @Body() userData: User) {
    return this.userService.updateUser(userData, email);
    // Implement the logic to update an existing user
  }

  // @Patch(':id')
  // partialUpdateUser(@Param('id') id: string, @Body() userData: Partial<User>): Promise<User> {
  //   // Implement the logic for partial updates
  // }
}
