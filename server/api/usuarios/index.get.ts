import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  try {
    const client = await serverSupabaseClient<any>(event)

    // Busca apenas campos públicos (ocultando a senha)
    const { data, error } = await client
      .from('usuarios')
      .select('id, nome, email, created_at')
      .order('id', { ascending: false })

    if (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Erro ao buscar usuários do banco.'
      })
    }

    return { sucesso: true, usuarios: data }
  } catch (err: any) {
    throw createError({
      statusCode: 500,
      statusMessage: err.message || 'Erro interno no servidor.'
    })
  }
})