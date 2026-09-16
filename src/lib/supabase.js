import { createClient } from '@supabase/supabase-js'

const defaultUrl = 'https://fzjldmfcfymdncydchkz.supabase.co'
const defaultAnonKey = 'sb_publishable_uN-YzmA4QUZnwe8nYIkV6w_VLk3qMH0'

const metaEnv = (typeof import.meta !== 'undefined' && import.meta.env) ? import.meta.env : {}
const supabaseUrl = metaEnv.VITE_SUPABASE_URL || defaultUrl
const supabaseAnonKey = metaEnv.VITE_SUPABASE_ANON_KEY || defaultAnonKey

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('your-project-ref')
)

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null
