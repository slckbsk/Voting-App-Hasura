alter table "public"."votes" add column "ids" serial
 not null unique;
