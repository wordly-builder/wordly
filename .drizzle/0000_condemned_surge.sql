CREATE TABLE IF NOT EXISTS "account" (
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT "account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"sessionToken" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"emailVerified" timestamp,
	"image" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "verificationToken_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "character_fields" (
	"id" serial PRIMARY KEY NOT NULL,
	"character_id" serial NOT NULL,
	"data" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "characters_panel" (
	"id" serial PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "characters_templates_field" (
	"id" serial PRIMARY KEY NOT NULL,
	"template_id" serial NOT NULL,
	"name" text DEFAULT '' NOT NULL,
	"type" text DEFAULT 'text' NOT NULL,
	"column" integer DEFAULT 1 NOT NULL,
	"row" integer DEFAULT 1 NOT NULL,
	"column_size" integer DEFAULT 1 NOT NULL,
	"row_size" integer DEFAULT 1 NOT NULL,
	"is_main_picture" boolean DEFAULT false NOT NULL,
	"is_main_name" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "characters_template" (
	"id" serial PRIMARY KEY NOT NULL,
	"panel_id" serial NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "character" (
	"id" serial PRIMARY KEY NOT NULL,
	"panel_id" integer NOT NULL,
	"template_id" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "maps_panel" (
	"id" serial PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "map" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"panel_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "profile" (
	"id" serial PRIMARY KEY NOT NULL,
	"googleId" text,
	"name" text,
	"email" text,
	"image" text,
	"createdAt" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "universe" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"owner" serial NOT NULL,
	"characters_panel" integer DEFAULT NULL,
	"maps_panel" integer DEFAULT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "character_fields" ADD CONSTRAINT "character_fields_character_id_character_id_fk" FOREIGN KEY ("character_id") REFERENCES "character"("id") ON DELETE no action ON UPDATE no action;
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
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "character" ADD CONSTRAINT "character_panel_id_characters_panel_id_fk" FOREIGN KEY ("panel_id") REFERENCES "characters_panel"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "character" ADD CONSTRAINT "character_template_id_characters_template_id_fk" FOREIGN KEY ("template_id") REFERENCES "characters_template"("id") ON DELETE no action ON UPDATE no action;
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
 ALTER TABLE "universe" ADD CONSTRAINT "universe_owner_profile_id_fk" FOREIGN KEY ("owner") REFERENCES "profile"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "universe" ADD CONSTRAINT "universe_characters_panel_characters_panel_id_fk" FOREIGN KEY ("characters_panel") REFERENCES "characters_panel"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "universe" ADD CONSTRAINT "universe_maps_panel_maps_panel_id_fk" FOREIGN KEY ("maps_panel") REFERENCES "maps_panel"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
