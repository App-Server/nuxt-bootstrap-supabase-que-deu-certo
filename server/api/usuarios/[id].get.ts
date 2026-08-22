import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const client = await serverSupabaseServiceRole(event)

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'ID do usuário não fornecido' })
  }

  // Busca o usuário específico no Supabase Auth
  const { data: { user }, error } = await client.auth.admin.getUserById(id)

  if (error || !user) {
    throw createError({ statusCode: 404, statusMessage: 'Usuário não encontrado' })
  }

  return {
    usuario: {
      id: user.id,
      email: user.email,
      nome: user.user_metadata?.nome || ''
    }
  }
})