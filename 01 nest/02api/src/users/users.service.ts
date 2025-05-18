import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [{ id: 1, nombre: 'Sheldon' }];
  find() {
    return this.users;
  }

  store(body) {
    return this.users.push({ ...body, id: this.users.length + 1 });
  }

  destroy(id: number) {
    this.users = this.users.filter((user) => user.id !== id);
    return { message: 'Usuario eliminado' };
  }
  update(id, body){
    const userFind = this.users.find((user) => user.id === id);
    if (!userFind) {
      throw new NotFoundException('Usuario no encontrado');
    }
    this.users = this.users.map((user) => {
      if (user.id === id) {
        console.log('user', user);
        console.log('body', body);
        console.log('comparacion', { ...user, ...body });
        return { ...user, ...body };
      }
      return user;
    });
  }
}
