import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AdminService } from 'src/admin/admin.service'
import { User } from 'src/user/user.entity'
import { AuthUserDto, CreateUserDto } from 'src/user/user.model'
import { UserService } from 'src/user/user.service'
import { JwtPayload, LoginResponse } from './auth.models'

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly adminService: AdminService
    ) {}

    async register(createUserDto: CreateUserDto): Promise<string> {
        const user: User = await this.userService.createUser(createUserDto)
        return this.signToken(user.email)
    }

    async login(authUserDto: AuthUserDto): Promise<LoginResponse> {
        const user: User = await this.userService.getAuthUser(authUserDto)
        const authToken: string = this.signToken(user.email)
        const adminToken: string = await this.adminService.getAccessByUser(user)
        return { authToken, adminToken }
    }

    private signToken(email: string): string {
        const payload: JwtPayload = { email }
        return this.jwtService.sign(payload)
    }
}
