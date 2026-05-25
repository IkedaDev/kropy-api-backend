import { CmsBaseRepository } from "@core/repository/cms-base.repository.js";
import { BrandRepository } from "../domain/repository/brand.repository.js";
import { Brand } from "../domain/entities/brand.entity.js";

export class BrandCMSRepository
    extends CmsBaseRepository<Brand>
    implements BrandRepository {
    protected readonly endpoint = "brands";
    protected readonly defaultSort = "name"; // Ordena alfabéticamente por defecto
    protected readonly fieldMapping = {
        tenantId: "tenant.id",
        name: "name"
    };

    protected mapToDomain(plain: any): Brand {
        return new Brand({
            id: plain.id,
            tenant: plain.tenant,
            name: plain.name,
            logo: plain.logo?.url || null,
            updatedAt: plain.updatedAt,
            createdAt: plain.createdAt,
        });
    }
}