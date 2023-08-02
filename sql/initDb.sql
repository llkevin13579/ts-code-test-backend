DROP SCHEMA IF EXISTS public CASCADE;

CREATE SCHEMA public;

SET search_path = public;

CREATE TABLE todos (
    id serial PRIMARY KEY,
    title varchar(100) NOT NULL
);



