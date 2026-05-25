import { Criteria } from "@core/criteria/criteria.js";
import { FindByResponseRepository } from "@core/models/pagination.model.js";
import { Category } from "../entities/category.entity.js";

export interface CategoryRepository {
    findBy(req: Criteria): Promise<FindByResponseRepository<Category>>;
}