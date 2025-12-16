# Security Model

## Public Information (By Design)

This application uses client-side JavaScript with Supabase backend.

**Intentionally Public:**
- Supabase URL: `https://qkxnwpnguwtvtpxqrggr.supabase.co`
- Supabase Anon Key: `sb_publishable_b701hMqncj7uo43rVd82tw_l3vbYRzI`

These are designed to be public (like a Google Maps API key).

**Security Protection:**
- Row Level Security (RLS) enabled on all tables
- Anon key can INSERT analytics (write-only)
- Anon key CANNOT SELECT analytics (read-blocked)
- Only authenticated users can read data

## Data Privacy

Athlete analytics data is protected by Supabase RLS policies.
Random users cannot read athlete data even with the public anon key.

## Reporting Issues

Contact: ja.lerman@ignitionapg.com
