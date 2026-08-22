export default defineEventHandler((event) => {
  const url = getRequestURL(event)
  const authUser = getCookie(event, 'auth_user')

  // Lista de rotas públicas que não precisam de login
  const rotasPublicas = ['/', '/quem-somos', '/login', '/contato']

  // Ignora chamadas de API ou arquivos estáticos (_nuxt, imagens, etc.)
  if (url.pathname.startsWith('/api') || url.pathname.startsWith('/_nuxt')) {
    return
  }

  // Se a rota for pública
  if (rotasPublicas.includes(url.pathname)) {
    // Se tentar acessar o /login estando logado, manda para /usuarios
    if (url.pathname === '/login' && authUser) {
      return sendRedirect(event, '/painel', 302)
    }
    return
  }

  // Se for uma página privada (ex: /usuarios) e NÃO houver cookie
  if (!authUser) {
    // Redireciona DIRETAMENTE no servidor HTTP antes de renderizar qualquer Vue/HTML
    return sendRedirect(event, '/login', 302)
  }
})