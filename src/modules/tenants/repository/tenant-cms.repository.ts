import qs from "qs";
import { Criteria } from "@core/criteria/criteria.js";
import { FindByResponseRepository } from "@core/models/pagination.model.js";
import { Tenant } from "../domain/entities/tenant.entity.js";
import { TenantRepository } from "../domain/repository/tenant.repository.js";
import { KropyCmsCriteriaConverter } from "@core/criteria/converters/cms-critera.converter.js";
import { Envs } from "@core/adapters/envs.adapter.js";

export class TenantCMSRepository implements TenantRepository {
    async findBy(req: Criteria): Promise<FindByResponseRepository<Tenant>> {
        const tenantFieldMapping: Record<string, string> = {
            domain: "domain",
            slug: "slug",
            id: "id",
        };
        const criteriaConverter = new KropyCmsCriteriaConverter(tenantFieldMapping);
        const queryArgs = criteriaConverter.convert(req);

        const defaultFilter = {};
        if (queryArgs.where) {
            if (queryArgs.where.and && Array.isArray(queryArgs.where.and)) {
                queryArgs.where.and.push(defaultFilter);
            } else {
                queryArgs.where = { and: [queryArgs.where, defaultFilter] };
            }
        } else {
            queryArgs.where = defaultFilter;
        }

        if (!queryArgs.sort) {
            queryArgs.sort = "slug";
        }
        const cleanQueryArgs = {
            where: queryArgs.where.where ? queryArgs.where.where : queryArgs.where,
            limit: queryArgs.limit,
            page: queryArgs.page,
            sort: queryArgs.sort
        };

        const queryString = qs.stringify(cleanQueryArgs, {
            addQueryPrefix: true,
            arrayFormat: 'indices',
            encodeValuesOnly: true
        });


        const response = await fetch(`${Envs.URL_KROPY_CMS}/tenants${queryString}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch tenants from CMS: ${response.statusText}`);
        }

        const data: any = await response.json();

        return {
            data: data.docs,
            total: data.totalDocs,
            limit: data.limit,
            page: data.page,
            totalPages: data.totalPages,
            hasNextPage: data.hasNextPage,
            hasPrevPage: data.hasPrevPage,
            nextPage: data.nextPage,
            prevPage: data.prevPage,
            pagingCounter: data.pagingCounter,
        } as FindByResponseRepository<Tenant>;
    }

}