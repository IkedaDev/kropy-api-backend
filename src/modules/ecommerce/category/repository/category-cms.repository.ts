import { CmsBaseRepository } from "@core/repository/cms-base.repository.js";
import { CategoryRepository } from "../domain/repository/category.repository.js";
import { Category } from "../domain/entities/category.entity.js";

export class CategoryCMSRepository
    extends CmsBaseRepository<Category>
    implements CategoryRepository {
    protected readonly endpoint = "categories";
    protected readonly defaultSort = "-createdAt"; // Ordena por defecto las más recientes
    protected readonly fieldMapping = {
        tenantId: "tenant.id",
        title: "title",
        slug: "slug"
    };

    protected mapToDomain(plain: any): Category {
        return new Category({
            id: plain.id,
            tenant: plain.tenant,
            title: plain.title,
            slug: plain.slug,
            updatedAt: plain.updatedAt,
            createdAt: plain.createdAt,
        });
    }
}