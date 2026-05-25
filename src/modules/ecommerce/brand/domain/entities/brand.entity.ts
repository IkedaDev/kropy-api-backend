import { Tenant } from "@modules/tenants/domain/entities/tenant.entity.js";

export interface BrandProps {
    id: string | number;
    tenant: Tenant;
    name: string;
    logo: string | null;
    updatedAt: string;
    createdAt: string;
}

export class Brand {
    public readonly id: string | number;
    public readonly tenant: Tenant;
    public readonly name: string;
    public readonly logo: string | null;
    public readonly updatedAt: string;
    public readonly createdAt: string;

    constructor(props: BrandProps) {
        this.id = props.id;
        this.tenant = props.tenant;
        this.name = props.name;
        this.logo = props.logo;
        this.updatedAt = props.updatedAt;
        this.createdAt = props.createdAt;
    }
}