import type { MigrationInterface, QueryRunner } from "typeorm";

export class CreateResources1700000000000 implements MigrationInterface {
  name = "CreateResources1700000000000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "resources" (
        "id" SERIAL PRIMARY KEY,
        "name" VARCHAR(200) NOT NULL,
        "description" TEXT NOT NULL DEFAULT '',
        "category" VARCHAR(100) NOT NULL DEFAULT '',
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
      );
      CREATE INDEX IF NOT EXISTS "IDX_resources_category" ON "resources" ("category");
      CREATE INDEX IF NOT EXISTS "IDX_resources_name" ON "resources" ("name");
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP INDEX IF EXISTS "IDX_resources_name";
      DROP INDEX IF EXISTS "IDX_resources_category";
      DROP TABLE IF EXISTS "resources";
    `);
  }
}
