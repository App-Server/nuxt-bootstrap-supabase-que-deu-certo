import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  // Conecta ao Supabase com privilégios de Admin para ler o Auth
  const client = await serverSupabaseServiceRole(event)
  
  const { data: { users }, error } = await client.auth.admin.listUsers()

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  // Mapeia os usuários retornando nome e e-mail
  return users.map(user => ({
    id: user.id,
    email: user.email,
    nome: user.user_metadata?.nome || 'Sem Nome',
    created_at: user.created_at
  }))
})