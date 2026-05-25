import { Criteria, FilterOperator } from "@core/criteria/criteria.js";
import { PaginatedResult } from "@core/models/pagination.model.js";
import { CategoryRepository } from "./domain/repository/category.repository.js";
import { CategoryFindBy } from "./use-cases/category-find-by.use-case.js";
import { Category } from "./domain/entities/category.entity.js";

export class CategoryService {
    constructor(private readonly repository: CategoryRepository) { }

    public async findBy(tenantId: string | number, criteria: Criteria): Promise<PaginatedResult<Category>> {

        const securityFilters = [
            ...(criteria.filters || []),
            { field: "tenantId", value: String(tenantId), operator: FilterOperator.EQUAL }
        ];

        const scopedCriteria = new Criteria({
            pagination: criteria.pagination,
            orderBy: criteria.orderBy,
            filters: securityFilters
        });

        const useCase = new CategoryFindBy(this.repository);
        return await useCase.execute(scopedCriteria);
    }
}