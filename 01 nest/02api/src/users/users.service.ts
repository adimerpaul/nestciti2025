import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [{id:1, nombre:"Sheldon"}]
  find(){
    return this.users
  }

  store(body){
    return this.users.push({...body, id: this.users.length + 1})
  }
  
  destroy(id: number){
    this.users = this.users.filter(user => user.id !== id)
    return {message: "Usuario eliminado"}
  }
}
