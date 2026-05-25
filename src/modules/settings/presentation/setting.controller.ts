import { Context } from "hono";
import { SettingService } from "../setting.service.js";
import { APIResponse } from "@core/decorators/api-response.js";
import { settingsResponseSchema } from "../domain/dtos/setting-response.dto.js";


export class SettingsController {
    constructor(private service: SettingService) { }

    @APIResponse("Web page settings successfully")
    async findOne(c: Context) {
        const tenant = c.get('tenant');
        const response = await this.service.findOne(tenant.id);
        return settingsResponseSchema.parse(response)
    }

}
