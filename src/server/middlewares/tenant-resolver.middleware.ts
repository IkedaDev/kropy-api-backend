import { Criteria, FilterOperator } from '@core/criteria/criteria.js';
import { Tenant } from '@modules/tenants/domain/entities/tenant.entity.js';
import { TenantCMSRepository } from '@modules/tenants/repository/tenant-cms.repository.js';
import { TenantFindBy } from '@modules/tenants/use-cases/tenant-find-by.use-case.js';
import type { MiddlewareHandler } from 'hono';

export type TenantContextEnv = {
    Variables: {
        tenant: Tenant;
    }
};

export const tenantResolver = (): MiddlewareHandler<TenantContextEnv> => {
    return async (c, next) => {
        let tenantIdentifier = c.req.header('X-Tenant-Slug');
        if (!tenantIdentifier) {
            const host = c.req.header('host') || '';
            tenantIdentifier = host.replace('www.', '').split(':')[0];
        }

        if (!tenantIdentifier) {
            return c.json({ error: 'Falta el identificador del Tenant' }, 400);
        }

        try {
            const repository = new TenantCMSRepository()
            const tenant = await new TenantFindBy(repository).execute(new Criteria({
                pagination: { page: 1, limit: 1 },
                filters: [{ field: 'slug', value: tenantIdentifier, operator: FilterOperator.EQUAL }]
            }))

            if (tenant.data.length <= 0) {
                return c.json({ error: 'Organización no registrada en Kropy' }, 404);
            }

            c.set('tenant', tenant.data[0]);

            await next();
        } catch (error) {
            return c.json({ error: 'Error interno resolviendo el contexto' }, 500);
        }
    };
};