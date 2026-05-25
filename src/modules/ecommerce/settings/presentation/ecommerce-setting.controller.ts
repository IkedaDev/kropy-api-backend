import type { Context } from "hono";
import { EcommerceSettingService } from "../ecommerce-setting.service.js";

export class EcommerceSettingController {


    constructor(private readonly service: EcommerceSettingService) {
    }

    public async findOne(c: Context) {
        // Extraemos el tenant resuelto de forma transparente por tu Middleware
        const tenant = c.get("tenant");
        if (!tenant) {
            return c.json({ error: "Contexto del tenant no inicializado" }, 400);
        }

        try {
            const settings = await this.service.getByTenantId(tenant.id);
            if (!settings) {
                return c.json({ error: "Configuración de tienda no encontrada para esta organización" }, 404);
            }

            return c.json({
                success: true,
                data: {
                    id: settings.id,
                    name: settings.name,
                    shipping: settings.shipping,
                    updatedAt: settings.updatedAt
                }
            }, 200);
        } catch (error: any) {
            return c.json({ error: error.message || "Error interno consultando ecommerce settings" }, 500);
        }
    }
}