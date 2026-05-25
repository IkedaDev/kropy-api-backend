import { Criteria, FilterOperator } from "@core/criteria/criteria.js";
import { PaginatedResult } from "@core/models/pagination.model.js";
import { BrandRepository } from "./domain/repository/brand.repository.js";
import { Brand } from "./domain/entities/brand.entity.js";
import { BrandFindBy } from "./use-cases/brand-find-by.use-case.js";


export class BrandService {
    constructor(private readonly repository: BrandRepository) { }

    public async findBy(tenantId: string | number, criteria: Criteria): Promise<PaginatedResult<Brand>> {

        const securityFilters = [
            ...(criteria.filters || []),
            { field: "tenantId", value: String(tenantId), operator: FilterOperator.EQUAL }
        ];

        const scopedCriteria = new Criteria({
            pagination: criteria.pagination,
            orderBy: criteria.orderBy,
            filters: securityFilters
        });

        const useCase = new BrandFindBy(this.repository);
        return await useCase.execute(scopedCriteria);
    }
}