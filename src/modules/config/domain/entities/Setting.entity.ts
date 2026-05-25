import { Tenant } from "@core/models/business/tenant.entity.js"

interface ContactInfo {
    phone?: string
    email?: string
    address?: string
}
interface SocialLinks {
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
    concactInfo: ContactInfo
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
    public concactInfo: ContactInfo
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
        this.concactInfo = props.concactInfo
        this.socialLinks = props.socialLinks
        this.updatedAt = props.updatedAt
        this.createdAt = props.createdAt
    }
}