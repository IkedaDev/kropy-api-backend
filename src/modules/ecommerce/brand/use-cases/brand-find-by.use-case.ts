import { Criteria } from "@core/criteria/criteria.js";
import { PaginatedResult, paginate } from "@core/models/pagination.model.js";
import { BrandRepository } from "../domain/repository/brand.repository.js";
import { Brand } from "../domain/entities/brand.entity.js";

abstract class BrandFindByUseCase {
    abstract execute(criteria: Criteria): Promise<PaginatedResult<Brand>>
}

export class BrandFindBy implements BrandFindByUseCase {
    constructor(private readonly repository: BrandRepository) { }

    public async execute(criteria: Criteria): Promise<PaginatedResult<Brand>> {
        const { data, total } = await this.repository.findBy(criteria);
        const paginatedCategories = paginate(
            data,
            total,
            criteria.pagination?.page || 1,
            criteria.pagination?.limit || 10,
        );
        return paginatedCategories;
    }
}