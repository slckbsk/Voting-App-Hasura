alter table "public"."votes" alter column "ids" set default nextval('votes_ids_seq'::regclass);
alter table "public"."votes" add constraint "votes_ids_key" unique (ids);
alter table "public"."votes" alter column "ids" drop not null;
alter table "public"."votes" add column "ids" int4;
