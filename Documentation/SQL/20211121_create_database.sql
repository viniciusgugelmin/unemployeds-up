create database `unemployeds` character set utf8mb4 collate utf8mb4_unicode_ci;
use `unemployeds`;

create table `administrators` (
	`id` bigint auto_increment primary key,
    `name` varchar(200) not null,
    `email` varchar(200) not null,
    `password` varchar(200) not null,
    `created_at` timestamp null,
    `updated_at` timestamp null
);

create table `companies` (
	`id` bigint auto_increment primary key,
    `name` varchar(200) not null,
    `description` mediumtext null,
    `created_at` timestamp null,
    `updated_at` timestamp null,
    `deleted_at` timestamp null
);

create table `vacancies` (
	`id` bigint auto_increment primary key,
    `company_id` bigint not null,
    `name` varchar(200) not null,
    `description` mediumtext null,
    `created_at` timestamp null,
    `updated_at` timestamp null,
    `deleted_at` timestamp null,
    foreign key (`company_id`) references `companies` (`id`)
);

create table `vacancy_skills` (
	`id` bigint auto_increment primary key,
    `vacancy_id` bigint not null,
    `name` varchar(200) not null,
    `created_at` timestamp null,
    `updated_at` timestamp null,
    foreign key (`vacancy_id`) references `vacancies` (`id`)
);

create table `courses` (
	`id` bigint auto_increment primary key,
    `name` varchar(200) not null,
    `description` mediumtext null,
    `created_at` timestamp null,
    `updated_at` timestamp null,
	`deleted_at` timestamp null
);

create table `subjects` (
	`id` bigint auto_increment primary key,
    `course_id` bigint not null,
    `name` varchar(200) not null,
    `description` mediumtext null,
    `created_at` timestamp null,
    `updated_at` timestamp null,
    `deleted_at` timestamp null,
    foreign key (`course_id`) references `courses` (`id`)
);

create table `subject_skills` (
	`id` bigint auto_increment primary key,
    `subject_id` bigint not null,
    `name` varchar(200) not null,
    `created_at` timestamp null,
    `updated_at` timestamp null,
    foreign key (`subject_id`) references `subjects` (`id`)
);

create table `students` (
	`id` bigint auto_increment primary key,
    `course_id` bigint not null,
    `name` varchar(200) not null,
    `gender` enum('M', 'F') not null,
    `birthdate` date not null,
    `zipcode` varchar(50) not null,
    `number` smallint unsigned not null,
    `street` varchar(100) not null,
    `city` varchar(100) not null,
    `district` varchar(100) not null,
    `complement` varchar(50) null,
    `created_at` timestamp null,
    `updated_at` timestamp null,
	`deleted_at` timestamp null,
    foreign key (`course_id`) references `courses` (`id`)
);

create table `student_skills` (
	`id` bigint auto_increment primary key,
    `student_id` bigint not null,
    `name` varchar(200) not null,
    `created_at` timestamp null,
    `updated_at` timestamp null,
    foreign key (`student_id`) references `students` (`id`)
);

create table `student_vacancies` (
    `student_id` bigint not null,
    `vacancy_id` bigint not null,
    `created_at` timestamp null,
    `updated_at` timestamp null,
	primary key clustered ( student_id, vacancy_id ),
    foreign key (`student_id`) references `students` (`id`),
    foreign key (`vacancy_id`) references `vacancies` (`id`)
);