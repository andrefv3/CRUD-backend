-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "names" VARCHAR(255) NOT NULL,
    "last_names" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255),
    "state_code" INTEGER NOT NULL,
    "document_number" VARCHAR(255),
    "document_type" VARCHAR(255),
    "phone" DECIMAL(22,2),
    "profile_picture" VARCHAR(255),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),

    CONSTRAINT "pk_users" PRIMARY KEY ("user_id","email")
);
