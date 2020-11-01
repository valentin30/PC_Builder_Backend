import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { User } from './user.entity'
import { JwtPayload } from './user.model'
import { UserRepository } from './user.repository'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'JWT_SECRET'
        })
    }

    async validate(payload: JwtPayload): Promise<User> {
        const user: User = await this.userRepository.getUserByEmail(payload.email)
        if (!user) throw new UnauthorizedException()
        return user
    }
}
