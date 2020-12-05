import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/user/user.entity'
import { Repository } from 'typeorm'
import { Admin } from './admin.entity'
import { JwtAdminPayoad } from './interface/jwt-admin.interface'

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(Admin)
        private readonly adminRepository: Repository<Admin>,
        private jwtService: JwtService
    ) {}

    async getTokenByUser(user: User): Promise<string> {
        const admin: Admin = await this.adminRepository.findOne({ user })
        return admin ? this.signToken(admin.id) : null
    }

    create(user: User) {
        const admin: Admin = this.adminRepository.create(user)
        return this.adminRepository.save(admin)
    }

    private signToken(id: number): string {
        const payload: JwtAdminPayoad = { id }
        return this.jwtService.sign(payload)
    }
}
