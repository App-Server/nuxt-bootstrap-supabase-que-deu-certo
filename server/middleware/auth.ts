import { serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event)

  // Ignora chamadas de arquivos estáticos, do Nuxt e favicons
  if (
    url.pathname.startsWith('/_nuxt') ||
    url.pathname.startsWith('/favicon.ico') ||
    url.pathname.includes('.')
  ) {
    return
  }

  // Tenta recuperar o usuário autenticado da sessão oficial do Supabase
  let user = null
  try {
    user = await serverSupabaseUser(event)
  } catch (err) {
    user = null
  }

  // 1. TRATAMENTO DE APIS (/api/...)
  if (url.pathname.startsWith('/api')) {
    // Libera a própria rota de login do backend
    if (url.pathname.startsWith('/api/auth/login')) {
      return
    }

    // Se for outra API e não houver usuário logado no Supabase
    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Sessão inválida ou expirada.'
      })
    }
    return
  }

  // 2. TRATAMENTO DE PÁGINAS HTML
  const rotasPublicas = ['/', '/quem-somos', '/login', '/contato']

  if (rotasPublicas.includes(url.pathname)) {
    // Se tentar acessar o /login já estando logado, redireciona
    if (url.pathname === '/login' && user) {
      return sendRedirect(event, '/usuarios', 302)
    }
    return
  }

  // Se for página privada e não tiver sessão ativa no Supabase
  if (!user) {
    return sendRedirect(event, '/login', 302)
  }
})