import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}

    @Post('login')
    login(@Body() body) {
        return this.authService.login(body.username, body.password);
    }

    @UseGuards(AuthGuard)
    @Get('me')
    me(@Request() req) {
        return req.user;
    }
}
