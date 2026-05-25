import { Criteria, FilterOperator } from "@core/criteria/criteria.js";
import { EcommerceSettingRepository } from "./domain/repository/ecommerce-setting.repository.js";
import { EcommerceSetting } from "./domain/entities/ecommerce-setting.entity.js";
import { EcommerceSettingFindBy } from "./use-cases/ecommerce-setting-find-by.use-case.js";

export class EcommerceSettingService {
    constructor(private readonly repository: EcommerceSettingRepository) { }

    public async getByTenantId(tenantId: string | number): Promise<EcommerceSetting | null> {
        const useCase = new EcommerceSettingFindBy(this.repository);
        const result = await useCase.execute(
            new Criteria({
                pagination: { page: 1, limit: 1 },
                filters: [{ field: "tenantId", value: String(tenantId), operator: FilterOperator.EQUAL }]
            })
        );

        return result.data.length > 0 ? result.data[0] : null;
    }
}