import { Resource } from "../../../databases/entities/resource.entity.ts";
import { ResourceRepository } from "../repositories/resource.repository.ts";
import type { ListFilters } from "../repositories/resource.repository.ts";

export class ResourceService {
  constructor(private readonly repository: ResourceRepository) {}

  create(payload: Pick<Resource, "name" | "description" | "category">) {
    return this.repository.create(payload);
  }

  list(filters: ListFilters) {
    return this.repository.list(filters);
  }

  getById(id: number) {
    return this.repository.getById(id);
  }

  update(id: number, patch: Partial<Resource>) {
    return this.repository.updatePartial(id, patch);
  }

  delete(id: number) {
    return this.repository.delete(id);
  }
}
