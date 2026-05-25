import { ApiResponse } from "@core/models/api-response.model.js";
import { OpenAPIHono } from "@hono/zod-openapi";
import { ecommerceSettingHandlers, ecommerceSettingRoutes } from "@modules/ecommerce/settings/presentation/ecommerce-setting.routes.js";
import {
  healthHandlers,
  healthRouter,
} from "@modules/health/presentation/health.routes.js";
import { settingHandlers, settingRoutes } from "@modules/settings/presentation/setting.routes.js";

import { generalLimiter } from "@server/middlewares/rate-limit.middleware.js";
import { tenantResolver } from "@server/middlewares/tenant-resolver.middleware.js";

const v1 = new OpenAPIHono({
  defaultHook: (result, c) => {
    if (!result.success) {
      return ApiResponse.error(
        c,
        "Error de Validación (Datos inválidos)",
        result.error,
        400,
      );
    }
  },
});

v1.use("/*", generalLimiter);
v1.use("/*", tenantResolver());

// Health
v1.openapi(healthRouter.healthCheck, healthHandlers.healthCheck);

v1.openapi(settingRoutes.findOne, settingHandlers.findOne)


v1.openapi(ecommerceSettingRoutes.findOne, ecommerceSettingHandlers.findOne)

export default v1;
