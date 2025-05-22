import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    @Post()
    create(
        @Body() createUserDto: CreateUserDto
    ) {
        return 'This action adds a new user';
    }
    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto
    ){
        return updateUserDto;
    }
}
