import { Module } from '@nestjs/common'
import { BrandModule } from './additions/brand/brand.module'
import { CaseModule } from './components/case/case.module'
import { CPUModule } from './components/cpu/cpu.module'
import { GPUModule } from './components/gpu/gpu.module'
import { ProductModule } from './product/product.module'

@Module({
    imports: [ProductModule, CPUModule, BrandModule, CaseModule, GPUModule]
})
export class ProductsModule {}
