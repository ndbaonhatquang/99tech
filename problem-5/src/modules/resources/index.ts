import type { Router } from "express";
import { Router as createRouter } from "express";
import { AppDataSource } from "../../databases/data-source.ts";
import { Resource } from "../../databases/entities/resource.entity.ts";
import { ResourceRepository } from "./repositories/resource.repository.ts";
import { ResourceService } from "./services/resource.service.ts";
import { ResourceController } from "./controllers/resource.controller.ts";
import { validateRequest } from "../../shared/middleware/joi.ts";
import {
  createResource,
  listResources,
  getResource,
  updateResource,
  deleteResource,
} from "./validations/resource.validation.ts";

export function resourceRouter(): Router {
  const router = createRouter();
  const repo = new ResourceRepository(AppDataSource.getRepository(Resource));
  const service = new ResourceService(repo);
  const controller = new ResourceController(service);

  router.post("/", validateRequest(createResource), controller.create);
  router.get("/", validateRequest(listResources), controller.list);
  router.get("/:id", validateRequest(getResource), controller.getById);
  router.patch("/:id", validateRequest(updateResource), controller.update);
  router.delete("/:id", validateRequest(deleteResource), controller.delete);

  return router;
}
