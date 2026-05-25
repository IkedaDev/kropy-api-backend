import { Tenant } from "@modules/tenants/domain/entities/tenant.entity.js"


export class ContactInfo {
    phone?: string
    email?: string
    address?: string
}
export class SocialLinks {
    whatsapp?: string
    facebook?: string
    instagram?: string
    twitter?: string
}

interface SettingProps {
    id: number
    tenant: Tenant
    title?: string
    slug?: string
    logo?: string
    favicon?: string
    contactInfo: ContactInfo
    socialLinks: SocialLinks
    updatedAt: string
    createdAt: string
}


export class Setting {
    public id: number
    public tenant: Tenant
    public title?: string
    public slug?: string
    public logo?: string
    public favicon?: string
    public contactInfo: ContactInfo
    public socialLinks: SocialLinks
    public updatedAt: string
    public createdAt: string

    constructor(props: SettingProps) {
        this.id = props.id
        this.tenant = props.tenant
        this.title = props.title
        this.slug = props.slug
        this.logo = props.logo
        this.favicon = props.favicon
        this.contactInfo = props.contactInfo
        this.socialLinks = props.socialLinks
        this.updatedAt = props.updatedAt
        this.createdAt = props.createdAt
    }
}