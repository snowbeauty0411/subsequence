CREATE TABLE `user` (
  `id` integer PRIMARY KEY,
  `email` char,
  `password` char,
  `created_at` timestamp,
  `updated_at` timestamp,
  `admin_check_date` date,
  `identity_verification_status` integer
);

CREATE TABLE `buyer` (
  `id` integer PRIMARY KEY,
  `email` char
  `password` char
  `name` char,
  `first_name` char,
  `last_name` char,
  `phone` char,
  `profile` char,
  `profile_img_url` char,
  `id_certificate` boolean,
  `nda_certificate` boolean,
  `person` char,
  `gender` char,
  `created_at` timestamp,
  `updated_at` timestamp,
  `login_at` timestamp
);

CREATE TABLE `favoriteTag` (
  `id` integer,
  `name` char,
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `favorite` (
  `id` integer,
  `service_id` integer,
  `buyer_id` integer,
  `favorite_tag_id` integer,
  `created_at` timestamp,
  `updated_at` timestamp,
  PRIMARY KEY (`id`, `service_id`)
);

CREATE TABLE `shopper` (
  `id` integer PRIMARY KEY,
  `email` char
  `password` char
  `name` char,
  `businessCat` char,
  `first_name` char,
  `last_name` char,
  `phone` char,
  `profile` char,
  `profile_img_url` char,
  `id_certificate` boolean,
  `nda_certificate` boolean,
  `gender` char,
  `url` char,
  `type_of_industry` char,
  `formality` char
  `created_at` timestamp,
  `updated_at` timestamp,
  `login_at` timestamp
);

CREATE TABLE `service` (
  `id` char PRIMARY KEY,
  `shopper_id` integer,
  `name` char,
  `service_type_id` integer,
  `caption` char,
  `area` char,
  `service_cat_id` integer,
  `service_content` char,
  `address` char,
  `private` boolean,
  `age_confirm` char
);

CREATE TABLE `serviceType` (
  `id` integer PRIMARY KEY,
  `name` char,
  `table_id` char
);

CREATE TABLE `serviceImage` (
  `id` integer,
  `service_id` integer,
  `image_url` char,
  `position` integer,
  PRIMARY KEY (`id`, `image_url`)
);

CREATE TABLE `serviceCategory` (
  `id` integer PRIMARY KEY,
  `name` char
);

CREATE TABLE `serviceStep` (
  `id` integer,
  `service_id` integer,
  `number` integer,
  `title` char,
  `content` char,
  PRIMARY KEY (`id`, `service_id`)
);

CREATE TABLE `serviceCourse` (
  `id` integer,
  `course_id` char,
  `name` char,
  `price` integer,
  `cycle` integer,
  `content` text,
  `max` integer,
  `firstPr` boolean,
  PRIMARY KEY (`id`, `course_id`)
);

CREATE TABLE `serviceCourseImage` (
  `id` integer,
  `course_id` char,
  `image_url` char,
  `position` integer,
  PRIMARY KEY (`id`, `course_id`, `image_url`)
);

CREATE TABLE `serviceLink` (
  `id` integer PRIMARY KEY,
  `url` char,
  `jump_count` integer
);

CREATE TABLE `serviceStore` (
  `id` integer,
  `course_id` char,
  `count` integer,
  PRIMARY KEY (`id`, `course_id`)
);

CREATE TABLE `serviceStoreBuyer` (
  `id` integer,
  `course_id` char,
  `buyer_id` char,
  `qrUrl` char,
  `count` integer,
  `start` datetime,
  `end` datetime,
  PRIMARY KEY (`id`, `course_id`, `buyer_id`)
);

CREATE TABLE `serviceDelivery` (
  `id` integer,
  `course_id` char,
  `date` date,
  `skip` integer,
  PRIMARY KEY (`id`, `course_id`)
);

CREATE TABLE `serviceDeliveryBuyer` (
  `id` integer,
  `course_id` char,
  `buyer_id` integer,
  `start` datetime,
  `end` datetime,
  `address` char,
  PRIMARY KEY (`id`, `course_id`, `buyer_id`)
);

CREATE TABLE `verify_user_identities` (
  `id` integer,
  `user_id` integer,
  `type_id` integer,
  `file` char,
  `approval_at` datetime,
  `denial_date` datetime,
  `delete_date` date
);

CREATE TABLE `exhibition` (
  `id` integer PRIMARY KEY,
  `service_name` char, 
  `category_name` char,
  `target_area` char,
  `service_type` char,
  `images` integer,
  `service_content` char,
  `tag` char,
  `disclosure_range` char,
  `url_non_public` char,
  `step01` char,
  `step02` char,
  `explanatory_text` char,
  `url_website` char,
  `location` char
);

ALTER TABLE `favorite` ADD FOREIGN KEY (`buyer_id`) REFERENCES `buyer` (`id`);

ALTER TABLE `favorite` ADD FOREIGN KEY (`service_id`) REFERENCES `service` (`id`);

ALTER TABLE `favoriteTag` ADD FOREIGN KEY (`id`) REFERENCES `favorite` (`favorite_tag_id`);

ALTER TABLE `serviceImage` ADD FOREIGN KEY (`service_id`) REFERENCES `service` (`id`);

ALTER TABLE `shopper` ADD FOREIGN KEY (`id`) REFERENCES `service` (`shopper_id`);

ALTER TABLE `service` ADD FOREIGN KEY (`service_cat_id`) REFERENCES `serviceCategory` (`id`);

ALTER TABLE `service` ADD FOREIGN KEY (`service_type_id`) REFERENCES `serviceType` (`id`);

ALTER TABLE `serviceStep` ADD FOREIGN KEY (`service_id`) REFERENCES `service` (`id`);

ALTER TABLE `serviceCourse` ADD FOREIGN KEY (`course_id`) REFERENCES `serviceCourseImage` (`course_id`);

ALTER TABLE `serviceCourse` ADD FOREIGN KEY (`id`) REFERENCES `service` (`id`);

ALTER TABLE `service` ADD FOREIGN KEY (`id`) REFERENCES `serviceLink` (`id`);

ALTER TABLE `serviceStore` ADD FOREIGN KEY (`course_id`) REFERENCES `serviceCourse` (`course_id`);

ALTER TABLE `serviceStoreBuyer` ADD FOREIGN KEY (`course_id`) REFERENCES `serviceCourse` (`course_id`);

ALTER TABLE `buyer` ADD FOREIGN KEY (`id`) REFERENCES `serviceStoreBuyer` (`buyer_id`);

ALTER TABLE `serviceCourse` ADD FOREIGN KEY (`course_id`) REFERENCES `serviceDelivery` (`course_id`);

ALTER TABLE `serviceCourse` ADD FOREIGN KEY (`course_id`) REFERENCES `serviceDeliveryBuyer` (`course_id`);

ALTER TABLE `buyer` ADD FOREIGN KEY (`id`) REFERENCES `serviceDeliveryBuyer` (`buyer_id`);

ALTER TABLE `verify_user_identities` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
