import { CmsBaseRepository } from "@core/repository/cms-base.repository.js";
import { SettingRepository } from "../domain/repository/setting.repository.js";
import { Setting } from "../domain/entities/setting.entity.js";

export class SettingCMSRepository extends CmsBaseRepository<Setting> implements SettingRepository {
    protected readonly endpoint = "pages";
    protected readonly defaultSort = "id";
    protected readonly fieldMapping = { tenantId: "tenant.id" };

    protected mapToDomain(plain: any): Setting {
        return new Setting({
            id: plain.id,
            tenant: plain.tenant,
            title: plain.title,
            slug: plain.slug,
            logo: plain.logo?.url || null,
            favicon: plain.favicon?.url || null,
            contactInfo: plain.contactInfo,
            socialLinks: plain.socialLinks,
            updatedAt: plain.updatedAt,
            createdAt: plain.createdAt,
        });
    }

}