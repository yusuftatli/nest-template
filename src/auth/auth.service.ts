import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private jwtTokenService: JwtService) { }

    async loginWithCredentials(user: any) {
        const payload = { nameSurname: user.dataValues.nameSurname, id: user.dataValues.id, email: user.dataValues.email };

        return {
            ...payload,
            access_token: this.jwtTokenService.sign(payload),
        };
    }
}