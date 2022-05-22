alter table "public"."votes" alter column "id" set default nextval('options_id_seq'::regclass);
