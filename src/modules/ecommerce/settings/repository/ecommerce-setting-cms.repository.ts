import { CmsBaseRepository } from "@core/repository/cms-base.repository.js";
import { EcommerceSettingRepository } from "../domain/repository/ecommerce-setting.repository.js";
import { EcommerceSetting } from "../domain/entities/ecommerce-setting.entity.js";

export class EcommerceSettingCMSRepository
    extends CmsBaseRepository<EcommerceSetting>
    implements EcommerceSettingRepository {
    protected readonly endpoint = "store-settings";
    protected readonly defaultSort = "id";
    protected readonly fieldMapping = { tenantId: "tenant.id" };

    protected mapToDomain(plain: any): EcommerceSetting {
        return new EcommerceSetting({
            id: plain.id,
            tenant: plain.tenant,
            name: plain.name,
            shipping: {
                flatRate: plain.shipping?.flatRate || 0,
                shippingPolicies: plain.shipping?.shippingPolicies || null,
            },
            updatedAt: plain.updatedAt,
            createdAt: plain.createdAt,
        });
    }
}