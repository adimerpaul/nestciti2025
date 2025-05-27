import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly users= [
    { id: 1, username: 'sara', password: '123456' },
    { id: 2, username: 'angela', password: '123456' },
  ];
  findOne(username: string) {
    return this.users.find(user => user.username === username);
  }
}
