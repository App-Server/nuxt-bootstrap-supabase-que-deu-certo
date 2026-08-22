import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const client = await serverSupabaseServiceRole(event)

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'ID do usuário não fornecido' })
  }

  // Deleta o usuário diretamente do Supabase Auth
  const { error } = await client.auth.admin.deleteUser(id)

  if (error) {
    throw createError({ statusCode: 400, statusMessage: error.message })
  }

  return { sucesso: true }
})