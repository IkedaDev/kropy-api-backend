import { Criteria } from "@core/criteria/criteria.js";
import { Tenant } from "../entities/tenant.entity.js";
import { FindByResponseRepository } from "@core/models/pagination.model.js";

export abstract class TenantRepository {
    abstract findBy(req: Criteria): Promise<FindByResponseRepository<Tenant>>
}