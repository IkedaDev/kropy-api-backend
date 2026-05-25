import { Criteria } from "@core/criteria/criteria.js";
import { FindByResponseRepository } from "@core/models/pagination.model.js";
import { SettingCMSRepository } from "../repository/setting-cms.repository.js";
import { Setting } from "../domain/entities/setting.entity.js";

export abstract class SettingFindByUseCase {
    abstract execute(req: Criteria): Promise<FindByResponseRepository<Setting>>
}

export class SettingFindBy implements SettingFindByUseCase {
    constructor(private readonly settingRepository: SettingCMSRepository) { }

    execute(req: Criteria): Promise<FindByResponseRepository<Setting>> {
        return this.settingRepository.findBy(req)
    }
}