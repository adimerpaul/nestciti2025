import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class UpdateUserDto {
    @IsNotEmpty({ message: 'El nombre es requerido' })
    @MinLength(4, { message: 'El nombre debe tener al menos 4 caracteres' })
    name?: string;
    @IsNotEmpty({ message: 'El correo es requerido' })
    @IsEmail({
        allow_utf8_local_part: false,
    }, { message: 'El correo no es válido' })
    email?: string;
    @IsNotEmpty({ message: 'La contraseña es requerida' })
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    password?: string;
}