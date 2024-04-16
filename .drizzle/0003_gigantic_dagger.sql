CREATE TABLE IF NOT EXISTS "character_fields" (
	"id" serial PRIMARY KEY NOT NULL,
	"character_id" serial NOT NULL,
	"data" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "character" ADD COLUMN "template_id" serial NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "character" ADD CONSTRAINT "character_template_id_characters_template_id_fk" FOREIGN KEY ("template_id") REFERENCES "characters_template"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "character_fields" ADD CONSTRAINT "character_fields_character_id_character_id_fk" FOREIGN KEY ("character_id") REFERENCES "character"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
