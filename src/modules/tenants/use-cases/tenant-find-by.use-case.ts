import { Criteria } from "@core/criteria/criteria.js";
import { Tenant } from "../domain/entities/tenant.entity.js";
import { FindByResponseRepository } from "@core/models/pagination.model.js";
import { TenantRepository } from "../domain/repository/tenant.repository.js";

abstract class TenantFindByUseCase {
    abstract execute(req: Criteria): Promise<FindByResponseRepository<Tenant>>
}

export class TenantFindBy implements TenantFindByUseCase {

    constructor(private readonly tenantRepository: TenantRepository) { }

    execute(req: Criteria): Promise<FindByResponseRepository<Tenant>> {
        return this.tenantRepository.findBy(req);
    }

}


