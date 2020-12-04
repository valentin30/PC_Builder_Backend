import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ImageController } from './image.controller'
import { Image } from './image.entity'
import { ImageService } from './image.service'

@Module({
    imports: [TypeOrmModule.forFeature([Image])],
    providers: [ImageService],
    controllers: [ImageController]
})
export class ImageModule {}