import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AuthUserDto } from 'src/auth/dto/auth-user.dto'
import { CreateUserDto } from 'src/auth/dto/create-user.dto'
import { RefreshTokenService } from 'src/refresh-token/refresh-token.service'
import { User } from 'src/user/entity/user.entity'
import { UserService } from 'src/user/user.service'
import { TokenResponse } from './interface/auth-response.interface'
import { JwtPayload } from './interface/jwt-payload.interface'

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly refreshTokenService: RefreshTokenService
    ) {}

    async signUp(createUserDto: CreateUserDto): Promise<TokenResponse> {
        const user: User = await this.userService.create(createUserDto)
        return this.getTokens(user)
    }

    async signIn(authUserDto: AuthUserDto): Promise<TokenResponse> {
        const user: User = await this.userService.findAuthUser(authUserDto)
        return this.getTokens(user)
    }

    getTokens(user: User): TokenResponse {
        return {
            token: this.signToken(user.id),
            refreshToken: this.refreshTokenService.signToken({
                id: user.id,
                tokenVersion: user.tokenVersion
            })
        }
    }

    private signToken(id: number): string {
        const payload: JwtPayload = { id }
        return this.jwtService.sign(payload)
    }
}
