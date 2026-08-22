import { serverSupabaseClient } from '#supabase/server'
import bcrypt from 'bcrypt'

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  const body = await readBody(event)
  const { nome, email, senha } = body || {}

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'ID não informado.' })
  }

  if (!nome || typeof nome !== 'string' || nome.trim().length < 3) {
    throw createError({ statusCode: 400, statusMessage: 'Nome inválido.' })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email || !emailRegex.test(email)) {
    throw createError({ statusCode: 400, statusMessage: 'E-mail inválido.' })
  }

  const nomeSanitizado = nome.trim().replace(/</g, "&lt;").replace(/>/g, "&gt;")
  const emailSanitizado = email.trim().toLowerCase()

  const dadosAtualizacao: any = {
    nome: nomeSanitizado,
    email: emailSanitizado
  }

  // Só atualiza a senha se uma nova for fornecida
  if (senha && senha.trim() !== '') {
    if (senha.length < 6) {
      throw createError({ statusCode: 400, statusMessage: 'A nova senha deve ter no mínimo 6 caracteres.' })
    }
    dadosAtualizacao.senha = await bcrypt.hash(senha, 10)
  }

  try {
    const client = await serverSupabaseClient<any>(event)

    const { data, error } = await client
      .from('usuarios')
      .update(dadosAtualizacao)
      .eq('id', id)
      .select('id, nome, email, created_at')

    if (error) {
      if (error.code === '23505') {
        throw createError({ statusCode: 409, statusMessage: 'Este e-mail já pertence a outro usuário.' })
      }
      throw createError({ statusCode: 500, statusMessage: 'Erro ao atualizar usuário.' })
    }

    return { sucesso: true, mensagem: 'Usuário atualizado com sucesso!', dados: data[0] }
  } catch (err: any) {
    if (err.statusCode) throw err
    throw createError({ statusCode: 500, statusMessage: 'Erro interno no servidor.' })
  }
})