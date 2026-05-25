import { Tenant } from "@modules/tenants/domain/entities/tenant.entity.js";

export interface CategoryProps {
    id: string | number;
    tenant: Tenant;
    title: string;
    slug: string;
    updatedAt: string;
    createdAt: string;
}

export class Category {
    public readonly id: string | number;
    public readonly tenant: Tenant;
    public readonly title: string;
    public readonly slug: string;
    public readonly updatedAt: string;
    public readonly createdAt: string;

    constructor(props: CategoryProps) {
        this.id = props.id;
        this.tenant = props.tenant;
        this.title = props.title;
        this.slug = props.slug;
        this.updatedAt = props.updatedAt;
        this.createdAt = props.createdAt;
    }
}