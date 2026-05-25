import { createRoute } from "@hono/zod-openapi";
import { EcommerceSettingCMSRepository } from "../repository/ecommerce-setting-cms.repository.js";
import { EcommerceSettingService } from "../ecommerce-setting.service.js";
import { EcommerceSettingController } from "./ecommerce-setting.controller.js";
import { Context } from "hono";


const service = new EcommerceSettingService(new EcommerceSettingCMSRepository());
const controller = new EcommerceSettingController(service);

const findOne = createRoute({
    method: "get",
    path: "/ecommerce/settings",
    tags: ["Ecommerce"],
    summary: "Obtiene las configuraciones del módulo de e-commerce de la tienda",
    description: "Devuelve tarifas de envío y bloques informativos de despacho basados en el contexto del Tenant.",
    responses: {
        200: {
            description: "Configuraciones devueltas exitosamente",
        },
        404: {
            description: "No se encontraron configuraciones o tienda no registrada",
        }
    }
});


export const ecommerceSettingRoutes = {
    findOne: findOne,
};

export const ecommerceSettingHandlers = {
    findOne: (c: Context) => controller.findOne(c) as any,
};
