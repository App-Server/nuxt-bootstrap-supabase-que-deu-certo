export default defineEventHandler((event) => {
  // Apaga o cookie de autenticação do navegador
  deleteCookie(event, 'auth_user', {
    path: '/'
  })

  return { sucesso: true }
})