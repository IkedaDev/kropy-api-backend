
export type TenantModule = 'ecommerce' | 'blog' | 'restaurant' | 'gallery'

interface TenantProps {
    id: number,
    name: string,
    domain: string,
    slug: string,
    allowPublicRead: boolean,
    enabledModules: TenantModule[],
    updatedAt: string,
    createdAt: string
}


export class Tenant {
    public id: number;
    public name: string;
    public domain: string;
    public slug: string;
    public allowPublicRead: boolean;
    public enabledModules: TenantModule[];
    public updatedAt: string
    public createdAt: string

    constructor(props: TenantProps) {
        this.id = props.id;
        this.name = props.name;
        this.domain = props.domain;
        this.slug = props.slug;
        this.allowPublicRead = props.allowPublicRead;
        this.enabledModules = props.enabledModules;
        this.updatedAt = props.updatedAt;
        this.createdAt = props.createdAt;
    }
}