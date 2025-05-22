import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    console.log('createUserDto', createUserDto);
    const user = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(user);
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`El usuario con ${id} no existe`);
    }
    return this.usersRepository.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`El usuario con ${id} no existe`);
    }
    await this.usersRepository.update(id, updateUserDto);
    return await this.usersRepository.findOne({ where: { id } });
  }

  async remove(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`El usuario con ${id} no existe`);
    }
    await this.usersRepository.softDelete(id);
    return user;
  
  }
}
