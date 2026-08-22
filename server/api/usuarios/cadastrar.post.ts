import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const client = await serverSupabaseServiceRole(event)

  const { data, error } = await client.auth.admin.createUser({
    email: body.email,
    password: body.senha,
    email_confirm: true, // Corrigido para 'email_confirm'
    user_metadata: {
      nome: body.nome // Corrigido para 'body.nome'
    }
  })

  if (error) {
    throw createError({ 
      statusCode: 400, 
      statusMessage: error.message 
    })
  }

  return { sucesso: true, user: data.user }
})