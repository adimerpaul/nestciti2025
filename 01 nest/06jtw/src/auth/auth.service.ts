import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService,private jwtService: JwtService) {}

    async login(username: string, password: string) {

        const user = await this.usersService.findOne(username);
         if (!user || user.password !== password) {
            throw new NotFoundException('El usuario no existe o la contraseña es incorrecta');
        }

        const payload = { username: user.username, sub: user.id };

        const token = await this.jwtService.signAsync(payload)
        return {
            token: token,
            user: {
                id: user.id,
                username: user.username
            }
        }
    }
}
