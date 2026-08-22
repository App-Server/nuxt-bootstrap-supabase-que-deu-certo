import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  const client = await serverSupabaseServiceRole(event)

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'ID do usuário não fornecido' })
  }

  // Monta o objeto com os dados que serão atualizados
  const updateData: Record<string, any> = {
    email: body.email,
    user_metadata: {
      nome: body.nome
    }
  }

  // Só altera a senha caso o campo não tenha ficado em branco
  if (body.senha && body.senha.trim() !== '') {
    updateData.password = body.senha
  }

  // Atualiza as credenciais no Supabase Auth
  const { data, error } = await client.auth.admin.updateUserById(id, updateData)

  if (error) {
    throw createError({ statusCode: 400, statusMessage: error.message })
  }

  return { sucesso: true, user: data.user }
})