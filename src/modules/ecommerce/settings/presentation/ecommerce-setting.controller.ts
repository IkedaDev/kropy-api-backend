import type { Context } from "hono";
import { EcommerceSettingService } from "../ecommerce-setting.service.js";
import { APIResponse } from "@core/decorators/api-response.js";

export class EcommerceSettingController {


    constructor(private readonly service: EcommerceSettingService) {
    }

    @APIResponse("Web page settings successfully")
    async findOne(c: Context) {
        const tenant = c.get('tenant');
        const settings = await this.service.getByTenantId(tenant.id);
        return settings
    }
}