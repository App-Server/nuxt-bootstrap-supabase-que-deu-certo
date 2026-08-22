export default defineEventHandler((event) => {
  const sessionCookie = getCookie(event, 'auth_session')

  if (!sessionCookie) {
    return { autenticado: false, usuario: null }
  }

  try {
    const usuario = JSON.parse(sessionCookie)
    return { autenticado: true, usuario }
  } catch {
    return { autenticado: false, usuario: null }
  }
})