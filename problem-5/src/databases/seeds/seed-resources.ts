import { AppDataSource } from "../../databases/data-source.ts";
import { Resource } from "../entities/resource.entity.ts";

export async function seedResources() {
  if (!AppDataSource.isInitialized) await AppDataSource.initialize();
  const repo = AppDataSource.getRepository(Resource);
  const count = await repo.count();
  if (count > 0) return;
  const samples: Array<Partial<Resource>> = [
    { name: "Alpha", description: "First resource", category: "general" },
    { name: "Beta", description: "Second resource", category: "general" },
    { name: "Gamma", description: "Third resource", category: "special" },
  ];
  await repo.save(samples.map((s) => repo.create(s)));
}

if (process.argv[1]?.includes("seed-resources")) {
  seedResources().then(() => {
    // eslint-disable-next-line no-console
    console.log("Seeded resources");
    process.exit(0);
  });
}
