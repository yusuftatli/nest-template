import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
    constructor(private usersService: UsersService,
        private jwtTokenService: JwtService) {
        super();
    }

    async validate(email: string, password: string): Promise<any> {
        const user = await this.usersService.loginByEmail(email.toLocaleLowerCase());
        const validPassword = await bcrypt.compare(password, user.password);
        if (user) {
            if (!validPassword)
                throw new UnauthorizedException();
            const { password, ...result } = user;
            return result;
        }
        throw new UnauthorizedException();
    }

    async loginWithCredentials(user: any) {
        const payload = { username: user.username, id: user.userId };
        return {
            access_token: this.jwtTokenService.sign(payload),
        };
    }
}