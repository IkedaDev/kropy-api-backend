import { Criteria } from "@core/criteria/criteria.js";
import { FindByResponseRepository } from "@core/models/pagination.model.js";
import { Brand } from "../entities/brand.entity.js";

export interface BrandRepository {
    findBy(req: Criteria): Promise<FindByResponseRepository<Brand>>;
}