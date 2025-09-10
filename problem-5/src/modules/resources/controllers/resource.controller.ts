import type { Request, Response, NextFunction } from "express";
import { Resource } from "../../../databases/entities/resource.entity.ts";
import { ResourceService } from "../services/resource.service.ts";
import { NotFoundError } from "../../../utils/http-error.ts";
import type { ListFilters } from "../repositories/resource.repository.ts";

type ListQuery = {
  q?: string;
  category?: string;
  limit?: number;
  offset?: number;
};
type IdParams = { id: number };

export class ResourceController {
  constructor(private readonly service: ResourceService) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    const saved = await this.service.create(
      req.body as Pick<Resource, "name" | "description" | "category">
    );
    return res.status(201).json(saved);
  };

  list = async (req: Request, res: Response) => {
    const { q, category, limit, offset } = req.query as ListQuery;
    const filters: ListFilters = {};

    if (q !== undefined) filters.q = q;
    if (category !== undefined) filters.category = category;
    if (limit !== undefined) filters.limit = limit;
    if (offset !== undefined) filters.offset = offset;

    const result = await this.service.list(filters);
    return res.json({
      data: result.data,
      pagination: { limit, offset, total: result.total },
    });
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!id) return next(new NotFoundError("Not found"));
    const row = await this.service.getById(Number(id));
    if (!row) return next(new NotFoundError("Not found"));
    return res.json(row);
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { name, description, category } = req.body as Partial<Resource>;

    const patch: Partial<Resource> = {};
    if (name !== undefined) {
      patch.name = name;
    }
    if (description !== undefined) {
      patch.description = description;
    }
    if (category !== undefined) {
      patch.category = category;
    }

    const saved = await this.service.update(Number(id), patch);
    if (!saved) return next(new NotFoundError("Not found"));
    return res.json(saved);
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const ok = await this.service.delete(Number(id));
    if (!ok) return next(new NotFoundError("Not found"));
    return res.status(204).send();
  };
}
