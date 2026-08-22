<script setup>
const client = useSupabaseClient()
const user = useSupabaseUser()

// Pega o nome dos metadados ou a primeira parte do e-mail
const nomeUsuario = computed(() => {
  if (!user.value) return ''
  return user.value.user_metadata?.nome || user.value.email?.split('@')[0] || 'Usuário'
})

// Pega apenas a primeira letra para a foto de perfil (Avatar)
const inicialNome = computed(() => {
  return nomeUsuario.value.charAt(0).toUpperCase()
})

const fazerLogout = async () => {
  await client.auth.signOut()
  await navigateTo('/login')
}
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg fixed-top border-bottom border-white border-opacity-10 custom-navbar">
      <div class="container-fluid px-4">
        
        <!-- Logo / Brand -->
        <NuxtLink class="navbar-brand d-flex align-items-center gap-2 text-white fw-bold fs-5 me-4" to="/painel">
          <span class="brand-icon d-flex align-items-center justify-content-center rounded-3 bg-primary text-white fw-extrabold fs-6">
            S
          </span>
          <span class="tracking-tight">Sistema</span>
        </NuxtLink>

        <!-- Toggle Mobile -->
        <button 
          class="navbar-toggler border-0 text-white shadow-none" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarAdminContent" 
          aria-controls="navbarAdminContent" 
          aria-expanded="false" 
          aria-label="Alternar navegação"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Links e Ações -->
        <div class="collapse navbar-collapse" id="navbarAdminContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0 gap-1">
            <li class="nav-item">
              <NuxtLink class="nav-link px-3 py-2 rounded-2 nav-custom-link" active-class="active-link" to="/painel">
                Painel
              </NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink class="nav-link px-3 py-2 rounded-2 nav-custom-link" active-class="active-link" to="/usuarios">
                Usuários
              </NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink class="nav-link px-3 py-2 rounded-2 nav-custom-link" active-class="active-link" to="/usuarios/cadastro">
                Novo Usuário
              </NuxtLink>
            </li>
          </ul>

          <!-- Perfil e Logout -->
          <div class="d-flex align-items-center gap-3 pt-2 pt-lg-0 border-top border-lg-0 border-white border-opacity-10">
            <!-- Usuário Logado -->
            <div class="d-flex align-items-center gap-2 text-white">
              <div class="user-avatar rounded-circle d-flex align-items-center justify-content-center text-white fw-bold">
                {{ inicialNome }}
              </div>
              <span class="d-none d-sm-inline font-monospace small text-white-50">
                {{ nomeUsuario }}
              </span>
            </div>

            <!-- Botão Sair -->
            <button 
              @click="fazerLogout" 
              class="btn btn-logout d-flex align-items-center gap-2 px-3 py-1-5 rounded-2 fs-7 fw-medium"
            >
              <span>Sair</span>
            </button>
          </div>

        </div>
      </div>
    </nav>
    
    <!-- Espaçador para compensate o fixed-top no layout -->
    <div class="navbar-spacer"></div>
  </header>
</template>

<style scoped>
/* Cor base e efeito de vidro temperado (Glassmorphism) */
.custom-navbar {
  background-color: rgba(53, 73, 94, 0.95) !important;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  transition: all 0.3s ease;
}

/* Espaçador superior para o conteúdo das páginas não esconderem atrás da nav */
.navbar-spacer {
  height: 72px;
}

/* Estilo do Ícone do Logo */
.brand-icon {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #42b883 0%, #35495e 100%) !important;
}

/* Customização dos Links de Navegação */
.nav-custom-link {
  color: rgba(255, 255, 255, 0.7) !important;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
}

.nav-custom-link:hover {
  color: #ffffff !important;
  background-color: rgba(255, 255, 255, 0.08);
}

/* Classe Ativa do NuxtLink */
.active-link {
  color: #ffffff !important;
  background-color: rgba(255, 255, 255, 0.15) !important;
  font-weight: 600;
}

/* Avatar do Usuário */
.user-avatar {
  width: 32px;
  height: 32px;
  background-color: rgba(255, 255, 255, 0.15);
  font-size: 0.85rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Botão de Logout Estilizado */
.btn-logout {
  background-color: rgba(239, 68, 68, 0.15);
  color: #fca5a5;
  border: 1px solid rgba(239, 68, 68, 0.3);
  transition: all 0.2s ease;
}

.btn-logout:hover {
  background-color: rgba(239, 68, 68, 0.85);
  color: #ffffff;
  border-color: rgba(239, 68, 68, 0.85);
}

.fs-7 {
  font-size: 0.85rem;
}
</style>