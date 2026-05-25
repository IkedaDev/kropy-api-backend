import { Criteria } from "@core/criteria/criteria.js";
import { paginate, PaginatedResult } from "@core/models/pagination.model.js";
import { CategoryRepository } from "../domain/repository/category.repository.js";
import { Category } from "../domain/entities/category.entity.js";

abstract class CategoryFindByUseCase {
    abstract execute(criteria: Criteria): Promise<PaginatedResult<Category>>
}

export class CategoryFindBy implements CategoryFindByUseCase {
    constructor(private readonly repository: CategoryRepository) { }

    public async execute(criteria: Criteria): Promise<PaginatedResult<Category>> {
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