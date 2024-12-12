import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';

export const ExtractToken = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): string => {
        const request = ctx.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('Token no proporcionado o inválido');
        }
        return authHeader.split(' ')[1]; // Retorna el token
    },
);
