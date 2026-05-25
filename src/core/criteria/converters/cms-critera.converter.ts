import {
    Condition,
    Criteria,
    FilterNode,
    FilterOperator,
    LogicalGroup,
} from "../criteria.js";

export class KropyCmsCriteriaConverter {

    constructor(private readonly fieldMap: Record<string, string> = {}) { }

    public convert(criteria: Criteria): any {
        const kropyCmsQuery: any = {};

        // 1. Filtros (Where)
        if (criteria.hasFilters()) {
            // Payload maneja "and" y "or" en minúsculas en su estructura de filtros
            kropyCmsQuery.where = {
                and: criteria.filters.map((filter) => this.buildFilter(filter)),
            };
        }

        // 2. Ordenación (Sort)
        // En Payload, el orden se pasa como un string. Ej: "createdAt" o "-createdAt" para descendente.
        if (criteria.orderBy) {
            const mappedOrderBy = this.mapField(criteria.orderBy);
            const isDesc = criteria.orderType?.toLowerCase() === "desc";
            kropyCmsQuery.sort = `${isDesc ? "-" : ""}${mappedOrderBy}`;
        }

        // 3. Paginación
        if (criteria.pagination?.limit !== undefined) {
            kropyCmsQuery.limit = criteria.pagination.limit;
        }
        if (criteria.pagination?.page !== undefined) {
            kropyCmsQuery.page = criteria.pagination.page; // Payload acepta la página directamente (no usa 'skip')
        }

        return kropyCmsQuery;
    }

    private buildFilter(node: FilterNode): any {
        if ("logic" in node) {
            const group = node as LogicalGroup;
            // Forzamos a minúsculas porque Payload espera 'and' / 'or'
            const logicOperator = group.logic.toLowerCase();
            return {
                [logicOperator]: group.filters.map((f) => this.buildFilter(f)),
            };
        }
        return this.buildCondition(node as Condition);
    }

    private buildCondition(condition: Condition): any {
        const mappedField = this.mapField(condition.field);
        const operation = this.getPayloadOperation(condition.operator, condition.value);

        // Payload no anida objetos para campos con puntos (ej: relación.campo), 
        // sino que usa la notación de punto directamente como llave: { "relacion.campo": { equals: value } }
        return {
            [mappedField]: operation,
        };
    }

    private mapField(domainField: string): string {
        return this.fieldMap[domainField] || domainField;
    }

    private getPayloadOperation(operator: FilterOperator, value: any): any {
        // Mapeo de operadores nativos de tu dominio a los operadores de Payload CMS
        switch (operator) {
            case FilterOperator.EQUAL:
                return { equals: value };
            case FilterOperator.NOT_EQUAL:
                return { not_equals: value };
            case FilterOperator.CONTAINS:
                return { contains: value }; // Payload busca de manera parcial y es insensible a mayúsculas por defecto en la mayoría de DBs
            case FilterOperator.GT:
                return { greater_than: value };
            case FilterOperator.GTE:
                return { greater_than_equal: value };
            case FilterOperator.LT:
                return { less_than: value };
            case FilterOperator.LTE:
                return { less_than_equal: value };
            case FilterOperator.IN:
                return { in: Array.isArray(value) ? value : [value] };
            case FilterOperator.NOT_IN:
                return { not_in: Array.isArray(value) ? value : [value] };
            default:
                throw new Error(`Operator ${operator} not supported by Kropy CMS converter`);
        }
    }
}