import { Criteria } from "@core/criteria/criteria.js";
import { FindByResponseRepository } from "@core/models/pagination.model.js";
import { EcommerceSetting } from "../entities/ecommerce-setting.entity.js";

export interface EcommerceSettingRepository {
    findBy(req: Criteria): Promise<FindByResponseRepository<EcommerceSetting>>;
}