import { Controller, Delete, Get, Post, Put, Body, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {}
  @Get()
  find(){
    return this.usersService.find()
  }
  @Post()
  store(
    @Body() body
  ){
    return this.usersService.store(body)
  }
  @Put()
  update(){
    return 'modificar usuario'
  }
  @Delete(":id")
  destroy(
    @Param('id', ParseIntPipe) id: number
  ){
    return this.usersService.destroy(id)
  }
}
