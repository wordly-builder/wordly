CREATE TABLE IF NOT EXISTS "characters_templates_field" (
	"id" serial PRIMARY KEY NOT NULL,
	"template_id" serial NOT NULL,
	"name" text DEFAULT '' NOT NULL,
	"type" text DEFAULT 'text' NOT NULL,
	"columns" text DEFAULT '1' NOT NULL,
	"rows" text DEFAULT '1' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "characters_template" (
	"id" serial PRIMARY KEY NOT NULL,
	"panel_id" serial NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "character" ADD CONSTRAINT "character_panel_id_characters_panel_id_fk" FOREIGN KEY ("panel_id") REFERENCES "characters_panel"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "map" ADD CONSTRAINT "map_panel_id_maps_panel_id_fk" FOREIGN KEY ("panel_id") REFERENCES "maps_panel"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "characters_templates_field" ADD CONSTRAINT "characters_templates_field_template_id_characters_template_id_fk" FOREIGN KEY ("template_id") REFERENCES "characters_template"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "characters_template" ADD CONSTRAINT "characters_template_panel_id_characters_panel_id_fk" FOREIGN KEY ("panel_id") REFERENCES "characters_panel"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
