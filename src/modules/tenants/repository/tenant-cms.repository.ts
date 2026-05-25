import { Tenant } from "../domain/entities/tenant.entity.js";
import { TenantRepository } from "../domain/repository/tenant.repository.js";
import { CmsBaseRepository } from "@core/repository/cms-base.repository.js";

export class TenantCMSRepository extends CmsBaseRepository<Tenant> implements TenantRepository {
    protected readonly endpoint = "tenants";
    protected readonly defaultSort = "slug";
    protected readonly fieldMapping = { domain: "domain", slug: "slug", id: "id" };

    protected mapToDomain(plain: any): Tenant {
        return new Tenant({
            id: plain.id,
            name: plain.name,
            domain: plain.domain,
            slug: plain.slug,
            allowPublicRead: plain.allowPublicRead,
            enabledModules: plain.enabledModules,
            updatedAt: plain.updatedAt,
            createdAt: plain.createdAt,
        });
    }

}