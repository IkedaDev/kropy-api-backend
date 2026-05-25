import qs from "qs";
import { Criteria } from "@core/criteria/criteria.js";
import { KropyCmsCriteriaConverter } from "@core/criteria/converters/cms-critera.converter.js";
import { FindByResponseRepository } from "@core/models/pagination.model.js";
import { Envs } from "@core/adapters/envs.adapter.js";

export abstract class CmsBaseRepository<T> {
    protected abstract readonly fieldMapping: Record<string, string>;
    protected abstract readonly endpoint: string;
    protected abstract readonly defaultSort: string;

    protected getGlobalFilters(): Record<string, any> | null {
        return null;
    }

    // Método obligatorio para que cada hijo convierta JSON plano a su Entidad de Dominio
    protected abstract mapToDomain(plainData: any): T;

    /**
     * URL Base construida dinámicamente
     */
    private get baseUrl(): string {
        return `${Envs.URL_KROPY_CMS}/${this.endpoint}`;
    }

    /**
     * READ (Múltiples con filtros Complejos)
     */
    public async findBy(req: Criteria): Promise<FindByResponseRepository<T>> {
        const criteriaConverter = new KropyCmsCriteriaConverter(this.fieldMapping);
        const queryArgs = criteriaConverter.convert(req);

        let finalWhere = queryArgs.where;
        const globalFilter = this.getGlobalFilters();

        if (globalFilter && Object.keys(globalFilter).length > 0) {
            if (finalWhere) {
                if (finalWhere.and && Array.isArray(finalWhere.and)) {
                    finalWhere.and.push(globalFilter);
                } else {
                    finalWhere = { and: [finalWhere, globalFilter] };
                }
            } else {
                finalWhere = globalFilter;
            }
        }

        const cleanQueryArgs = {
            where: finalWhere?.where ? finalWhere.where : finalWhere,
            limit: queryArgs.limit,
            page: queryArgs.page,
            sort: queryArgs.sort || this.defaultSort
        };

        const queryString = qs.stringify(cleanQueryArgs, {
            addQueryPrefix: true,
            arrayFormat: 'indices',
            encodeValuesOnly: true
        });

        const url = `${this.baseUrl}${queryString}`;
        const response = await fetch(url);
        console.info('ℹ️  CMS -> Query ', url);
        if (!response.ok) throw new Error(`[CMS] Error en findBy de ${this.endpoint}: ${response.statusText}`);

        const data: any = await response.json();

        return {
            data: (data.docs || []).map((doc: any) => this.mapToDomain(doc)),
            total: data.totalDocs,
        } as FindByResponseRepository<T>;
    }

    /**
     * READ (Por ID único)
     */
    public async getById(id: string): Promise<T | null> {
        const response = await fetch(`${this.baseUrl}/${id}`);

        if (response.status === 404) return null;
        if (!response.ok) throw new Error(`[CMS] Error al obtener ${this.endpoint} por ID: ${response.statusText}`);

        const data = await response.json();
        return this.mapToDomain(data);
    }

    /**
     * CREATE
     */
    public async create(entityData: Partial<T>): Promise<T> {
        const response = await fetch(this.baseUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(entityData)
        });

        if (!response.ok) throw new Error(`[CMS] Error al crear en ${this.endpoint}: ${response.statusText}`);

        const data: any = await response.json();
        // Payload devuelve un objeto { doc: { ... }, message: "..." } o el doc directo dependiendo de la versión
        const plainDoc = data.doc ? data.doc : data;
        return this.mapToDomain(plainDoc);
    }

    /**
     * UPDATE
     */
    public async update(id: string, entityData: Partial<T>): Promise<T> {
        const response = await fetch(`${this.baseUrl}/${id}`, {
            method: "PATCH", // Payload CMS utiliza PATCH para actualizaciones parciales
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(entityData)
        });

        if (!response.ok) throw new Error(`[CMS] Error al actualizar ${this.endpoint}: ${response.statusText}`);

        const data: any = await response.json();
        const plainDoc = data.doc ? data.doc : data;
        return this.mapToDomain(plainDoc);
    }

    /**
     * DELETE
     */
    public async delete(id: string): Promise<boolean> {
        const response = await fetch(`${this.baseUrl}/${id}`, {
            method: "DELETE"
        });

        if (response.status === 404) return false;
        if (!response.ok) throw new Error(`[CMS] Error al eliminar en ${this.endpoint}: ${response.statusText}`);

        return true;
    }
}