import { createSuccessSchema } from "@core/models/api-response.model.js";
import { createRoute } from "@hono/zod-openapi";
import { settingsResponseSchema } from "../domain/dtos/setting-response.dto.js";
import { Context } from "hono";
import { SettingService } from "../setting.service.js";
import { SettingsController } from "./setting.controller.js";

const service = new SettingService()
const controller = new SettingsController(service)

const findOne = createRoute({
    method: "get",
    path: "/settings",
    tags: ["Settings"],
    summary: "Get web page settings",
    request: {},
    responses: {
        200: {
            description: "Web page settings retrieved successfully",
            content: {
                "application/json": {
                    schema: createSuccessSchema(settingsResponseSchema),
                },
            },
        },
    },
});

export const settingRoutes = {
    findOne: findOne,
};

export const settingHandlers = {
    findOne: (c: Context) => controller.findOne(c) as any,
};
