CREATE TABLE "categories" (
	"category" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" varchar(50) NOT NULL,
	"slug" varchar(50) NOT NULL,
	"image" varchar(100) NOT NULL
);
