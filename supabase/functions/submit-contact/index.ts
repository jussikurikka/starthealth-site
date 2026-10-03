import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};
const reply = (status: number, data: unknown) => new Response(JSON.stringify(data), {
  status, headers: { ...cors, 'Content-Type': 'application/json' },
});

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: cors });
  if (req.method !== 'POST') return reply(405, { error: 'Method not allowed' });
  if (Number(req.headers.get('content-length') || 0) > 16000) return reply(413, { error: 'Request too large' });
  try {
    const raw = await req.text();
    if (raw.length > 16000) return reply(413, { error: 'Request too large' });
    const input = JSON.parse(raw);
    const { name, email, company = '', message } = input;
    if (typeof name !== 'string' || !name.trim() || name.length > 200 ||
        typeof email !== 'string' || email.length > 320 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
        typeof company !== 'string' || company.length > 200 ||
        typeof message !== 'string' || !message.trim() || message.length > 10000) {
      return reply(400, { error: 'Invalid submission' });
    }
    const url = Deno.env.get('SUPABASE_URL');
    const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!url || !key) return reply(500, { error: 'Service unavailable' });
    const client = createClient(url, key);
    const address = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(address));
    const requestKey = Array.from(new Uint8Array(hash), byte => byte.toString(16).padStart(2, '0')).join('');
    const { data: allowed, error: limitError } = await client.rpc('check_contact_rate_limit', { request_key: requestKey });
    if (limitError) return reply(500, { error: 'Service unavailable' });
    if (!allowed) return reply(429, { error: 'Too many submissions' });
    const { data, error } = await client.from('contact_submissions').insert({ name: name.trim(), email: email.trim(), company: company.trim(), message: message.trim() }).select('id').single();
    if (error) return reply(500, { error: 'Could not store submission' });
    return reply(201, { id: data.id });
  } catch {
    return reply(400, { error: 'Invalid request' });
  }
});