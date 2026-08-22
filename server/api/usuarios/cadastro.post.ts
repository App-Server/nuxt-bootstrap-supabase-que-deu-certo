import { serverSupabaseClient } from '#supabase/server'
import bcrypt from 'bcrypt'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { nome, email, senha } = body || {}

  // 1. Validações e Sanitização
  if (!nome || typeof nome !== 'string' || nome.trim().length < 3) {
    throw createError({ statusCode: 400, statusMessage: 'Nome inválido (mínimo 3 caracteres).' })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email || !emailRegex.test(email)) {
    throw createError({ statusCode: 400, statusMessage: 'Formato de e-mail inválido.' })
  }

  if (!senha || typeof senha !== 'string' || senha.length < 6) {
    throw createError({ statusCode: 400, statusMessage: 'A senha deve ter no mínimo 6 caracteres.' })
  }

  // Sanitização de entradas
  const nomeSanitizado = nome.trim().replace(/</g, "&lt;").replace(/>/g, "&gt;")
  const emailSanitizado = email.trim().toLowerCase()

  // 2. Hash Seguro da Senha
  const saltRounds = 10
  const senhaHash = await bcrypt.hash(senha, saltRounds)

  try {
    const client = await serverSupabaseClient<any>(event)

    const { data, error } = await client
      .from('usuarios')
      .insert([
        {
          nome: nomeSanitizado,
          email: emailSanitizado,
          senha: senhaHash // Salva apenas o hash encriptado
        }
      ])
      .select('id, nome, email, created_at') // Retorna dados sem a senha

    if (error) {
      if (error.code === '23505') {
        throw createError({ statusCode: 409, statusMessage: 'E-mail já cadastrado.' })
      }
      throw createError({ statusCode: 500, statusMessage: 'Erro ao salvar registro.' })
    }

    return {
      sucesso: true,
      mensagem: 'Usuário cadastrado com segurança!',
      dados: data[0]
    }
  } catch (err: any) {
    if (err.statusCode) throw err
    throw createError({ statusCode: 500, statusMessage: 'Erro interno no servidor.' })
  }
})