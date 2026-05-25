import { Criteria } from "@core/criteria/criteria.js";
import { FindByResponseRepository } from "@core/models/pagination.model.js";
import { Setting } from "../entities/setting.entity.js";

export abstract class SettingRepository {
    abstract findBy(req: Criteria): Promise<FindByResponseRepository<Setting>>
}