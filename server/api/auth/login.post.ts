import { serverSupabaseClient } from '#supabase/server'
import bcrypt from 'bcrypt'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, senha } = body || {}

  if (!email || !senha) {
    throw createError({ statusCode: 400, statusMessage: 'Informe e-mail e senha.' })
  }

  const client = await serverSupabaseClient<any>(event)

  const { data: usuario, error } = await client
    .from('usuarios')
    .select('id, nome, email, senha')
    .eq('email', email.trim().toLowerCase())
    .single()

  if (error || !usuario) {
    throw createError({ statusCode: 401, statusMessage: 'E-mail ou senha incorretos.' })
  }

  const senhaValida = await bcrypt.compare(senha, usuario.senha)

  if (!senhaValida) {
    throw createError({ statusCode: 401, statusMessage: 'E-mail ou senha incorretos.' })
  }

  // Seta o cookie com path global
  setCookie(event, 'auth_user', String(usuario.id), {
    httpOnly: false,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  })

  return { sucesso: true }
})