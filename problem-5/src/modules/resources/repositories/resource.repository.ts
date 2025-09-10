import { Repository, ILike, type FindOptionsWhere } from "typeorm";
import { Resource } from "../../../databases/entities/resource.entity.ts";

export type ListFilters = {
  q?: string;
  category?: string;
  limit?: number;
  offset?: number;
};

export class ResourceRepository {
  private readonly repo: Repository<Resource>;

  constructor(repo: Repository<Resource>) {
    this.repo = repo;
  }

  async create(
    data: Pick<Resource, "name" | "description" | "category">
  ): Promise<Resource> {
    const entity = this.repo.create(data);

    return this.repo.save(entity);
  }

  async list(
    filters: ListFilters
  ): Promise<{ data: Resource[]; total: number }> {
    const { q, category, limit = 10, offset = 0 } = filters;
    const where: FindOptionsWhere<Resource> = {};
    
    if (category) {
      where.category = category;
    }

    if (q) {
      where.name = ILike(`%${q}%`);
    }

    const [data, total] = await this.repo.findAndCount({
      where,
      take: limit,
      skip: offset,
    });

    return { data, total };
  }

  async getById(id: number): Promise<Resource | null> {
    return this.repo.findOne({ where: { id } });
  }

  async updatePartial(
    id: number,
    patch: Partial<Resource>
  ): Promise<Resource | null> {
    const existing = await this.getById(id);

    if (!existing) {
      return null;
    }

    this.repo.merge(existing, patch);
    
    return this.repo.save(existing);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repo.delete({ id });

    return !!result.affected;
  }
}
