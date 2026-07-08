-- CreateTable
CREATE TABLE `categories` (
    `id` VARCHAR(36) NOT NULL,
    `slug` VARCHAR(64) NOT NULL,
    `name_ar` VARCHAR(128) NOT NULL,
    `name_en` VARCHAR(128) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `categories_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `products` (
    `id` VARCHAR(36) NOT NULL,
    `slug` VARCHAR(128) NOT NULL,
    `title_ar` VARCHAR(255) NOT NULL,
    `title_en` VARCHAR(255) NOT NULL,
    `location_ar` VARCHAR(255) NOT NULL,
    `location_en` VARCHAR(255) NOT NULL,
    `price` INTEGER NOT NULL,
    `currency` VARCHAR(8) NOT NULL DEFAULT 'EGP',
    `image` TEXT NOT NULL,
    `bedrooms` INTEGER NULL,
    `bathrooms` INTEGER NULL,
    `area` INTEGER NULL,
    `posted_at` DATE NOT NULL,
    `badges` JSON NULL,
    `featured` BOOLEAN NOT NULL DEFAULT false,
    `is_new` BOOLEAN NOT NULL DEFAULT false,
    `is_shared` BOOLEAN NOT NULL DEFAULT false,
    `expected_return` INTEGER NULL,
    `monthly_installment` INTEGER NULL,
    `category_id` VARCHAR(36) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `products_slug_key`(`slug`),
    INDEX `products_category_id_idx`(`category_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
