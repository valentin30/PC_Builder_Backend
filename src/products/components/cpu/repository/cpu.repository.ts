import { BadRequestException } from '@nestjs/common'
import { EntityRepository, ObjectLiteral } from 'typeorm'
import { ComponentRepository } from '../../component.repository'
import { CPU } from '../entity/cpu.entity'

@EntityRepository(CPU)
export class CPURepository extends ComponentRepository<CPU> {
    protected filterFields: string[] = [
        'generation',
        'series',
        'socket',
        'ramType',
        'ramCapacity',
        'ramChannels',
        'model',
        ...this.filterFields
    ]

    protected createConditionForComponentKey(key: string, parsedFilters: ObjectLiteral): string {
        switch (key) {
            case 'ramCapacity' || 'ramChannels':
                if (typeof parsedFilters[key] !== 'number') throw new BadRequestException()
                return `component.${key} >= :${key}`
            default:
                return super.createConditionForComponentKey(key, parsedFilters)
        }
    }
}