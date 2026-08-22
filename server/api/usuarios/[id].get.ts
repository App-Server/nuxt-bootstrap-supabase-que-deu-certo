import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  // Pega o parâmetro :id diretamente da URL da requisição
  const id = event.context.params?.id

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'ID não informado.' })
  }

  try {
    const client = await serverSupabaseClient<any>(event)

    const { data, error } = await client
      .from('usuarios')
      .select('id, nome, email, created_at')
      .eq('id', id)
      .single()

    if (error || !data) {
      throw createError({ statusCode: 404, statusMessage: 'Usuário não encontrado.' })
    }

    return { sucesso: true, usuario: data }
  } catch (err: any) {
    if (err.statusCode) throw err
    throw createError({ statusCode: 500, statusMessage: err.message || 'Erro interno.' })
  }
})