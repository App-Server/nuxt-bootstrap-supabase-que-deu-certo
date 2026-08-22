export default defineNuxtRouteMiddleware((to) => {
  const authCookie = useCookie('auth_user')

  // Array com todas as rotas do site público que não exigem login
  const rotasPublicas = ['/', '/quem-somos', '/login', '/contato',]

  // Se a rota acessada for pública, libera o acesso sem checar o cookie
  if (rotasPublicas.includes(to.path)) {
    // Se tentar acessar a página de login já estando autenticado, manda para o painel
    if (to.path === '/login' && authCookie.value) {
      return navigateTo('/painel')
    }
    return
  }

  // Se a rota for privada (ex: /usuarios, /painel) e NÃO houver cookie, manda para /login
  if (!authCookie.value) {
    return navigateTo('/login')
  }
})