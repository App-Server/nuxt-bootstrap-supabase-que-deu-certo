import { serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  try {
    // Busca o usuário logado na sessão do Supabase
    const user = await serverSupabaseUser(event)

    if (!user) {
      return { autenticado: false, usuario: null }
    }

    return { 
      autenticado: true, 
      usuario: {
        id: user.id,
        email: user.email
      } 
    }
  } catch (err) {
    return { autenticado: false, usuario: null }
  }
})