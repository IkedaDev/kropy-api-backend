import { Criteria } from "@core/criteria/criteria.js";
import { FindByResponseRepository } from "@core/models/pagination.model.js";
import { EcommerceSettingRepository } from "../domain/repository/ecommerce-setting.repository.js";
import { EcommerceSetting } from "../domain/entities/ecommerce-setting.entity.js";

export abstract class EcommerceSettingFindByUseCase {
    abstract execute(criteria: Criteria): Promise<FindByResponseRepository<EcommerceSetting>>
}

export class EcommerceSettingFindBy implements EcommerceSettingFindByUseCase {
    constructor(private readonly repository: EcommerceSettingRepository) { }

    public async execute(criteria: Criteria): Promise<FindByResponseRepository<EcommerceSetting>> {
        return await this.repository.findBy(criteria);
    }
}