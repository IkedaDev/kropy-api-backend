export interface EcommerceSettingProps {
    id: string | number;
    tenant: any;
    name: string;
    shipping: {
        flatRate: number;
        shippingPolicies: Record<string, any> | null;
    };
    updatedAt: string;
    createdAt: string;
}

export class EcommerceSetting {
    public readonly id: string | number;
    public readonly tenant: any;
    public readonly name: string;
    public readonly shipping: {
        flatRate: number;
        shippingPolicies: Record<string, any> | null;
    };
    public readonly updatedAt: string;
    public readonly createdAt: string;

    constructor(props: EcommerceSettingProps) {
        this.id = props.id;
        this.tenant = props.tenant;
        this.name = props.name;
        this.shipping = props.shipping;
        this.updatedAt = props.updatedAt;
        this.createdAt = props.createdAt;
    }
}