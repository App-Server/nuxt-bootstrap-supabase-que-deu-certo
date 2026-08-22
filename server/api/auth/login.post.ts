// server/api/auth/login.post.ts
import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const client = await serverSupabaseClient(event)

  // Autentica diretamente no Auth do Supabase (que grava os cookies corretos de sessão)
  const { data, error } = await client.auth.signInWithPassword({
    email: body.email,
    password: body.senha
  })

  if (error) {
    throw createError({ statusCode: 401, statusMessage: 'Credenciais inválidas' })
  }

  return { sucesso: true }
})