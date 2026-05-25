import { Criteria, FilterOperator } from "@core/criteria/criteria.js";
import { SettingFindBy } from "./use-cases/setting-find-by.use-case.js";
import { SettingCMSRepository } from "./repository/setting-cms.repository.js";
import { HTTPException } from "hono/http-exception";

export class SettingService {

    private readonly settingRepository = new SettingCMSRepository();

    async findOne(tenantId: number) {
        const results = await new SettingFindBy(this.settingRepository).execute(
            new Criteria({
                pagination: { page: 1, limit: 1 },
                filters: [{ field: "tenant.id", value: tenantId, operator: FilterOperator.EQUAL }],
            }),
        );

        if (results.data.length < 1) {
            throw new HTTPException(404, { message: "Client not found" });
        }

        return results.data[0];
    }
}