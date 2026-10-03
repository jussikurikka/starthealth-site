CREATE TABLE public.contact_submissions (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), created_at timestamptz NOT NULL DEFAULT now(), name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 200), email text NOT NULL CHECK (char_length(email) <= 320), company text NOT NULL DEFAULT '' CHECK (char_length(company) <= 200), message text NOT NULL CHECK (char_length(message) BETWEEN 1 AND 10000));
GRANT ALL ON public.contact_submissions TO service_role;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
CREATE TABLE public.contact_rate_limits (key text PRIMARY KEY, window_start timestamptz NOT NULL DEFAULT now(), count integer NOT NULL DEFAULT 1);
GRANT ALL ON public.contact_rate_limits TO service_role;
ALTER TABLE public.contact_rate_limits ENABLE ROW LEVEL SECURITY;
CREATE FUNCTION public.check_contact_rate_limit(request_key text) RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$ DECLARE hits integer; BEGIN INSERT INTO public.contact_rate_limits AS limits (key, window_start, count) VALUES (request_key, now(), 1) ON CONFLICT (key) DO UPDATE SET window_start = CASE WHEN limits.window_start < now() - interval '1 hour' THEN now() ELSE limits.window_start END, count = CASE WHEN limits.window_start < now() - interval '1 hour' THEN 1 ELSE limits.count + 1 END RETURNING count INTO hits; RETURN hits <= 5; END; $$;
REVOKE ALL ON FUNCTION public.check_contact_rate_limit(text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.check_contact_rate_limit(text) TO service_role;