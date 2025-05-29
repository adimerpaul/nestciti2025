import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [AuthService],
  imports: [UsersModule, 
    JwtModule.register({
      global: true,
      secret: 'secretKey',
      // signOptions: { expiresIn: '60s' },
    }),],
  controllers: [AuthController],
})
export class AuthModule {}
