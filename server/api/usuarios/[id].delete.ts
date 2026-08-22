import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const params = getRouterParams(event)
  const id = params.id

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'ID não informado.' })
  }

  try {
    const client = await serverSupabaseClient<any>(event)

    const { error } = await client
      .from('usuarios')
      .delete()
      .eq('id', id)

    if (error) {
      throw createError({ statusCode: 500, statusMessage: 'Erro ao excluir usuário no banco de dados.' })
    }

    return { sucesso: true, mensagem: 'Usuário excluído com sucesso!' }
  } catch (err: any) {
    if (err.statusCode) throw err
    throw createError({ statusCode: 500, statusMessage: err.message || 'Erro interno no servidor.' })
  }
})