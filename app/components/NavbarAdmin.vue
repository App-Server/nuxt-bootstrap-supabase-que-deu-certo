<script setup>
const client = useSupabaseClient()

const fazerLogout = async () => {
  // 1. Encerra a sessão no Supabase e limpa os cookies HTTP
  await client.auth.signOut()
  
  // 2. Redireciona o usuário para a tela de login
  await navigateTo('/login')
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark shadow-sm" style="background-color: #35495E;">
    <div class="container">
      <NuxtLink class="navbar-brand fw-bold text-white" to="/painel">
        Sistema
      </NuxtLink>

      <button 
        class="navbar-toggler border-0" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarSupportedContent" 
        aria-controls="navbarSupportedContent" 
        aria-expanded="false" 
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <NuxtLink class="nav-link text-white-50" active-class="text-white fw-semibold active" to="/painel">
              Painel
            </NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink class="nav-link text-white-50" active-class="text-white fw-semibold active" to="/usuarios">
              Usuários
            </NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink class="nav-link text-white-50" active-class="text-white fw-semibold active" to="/usuarios/cadastro">
              Novo Usuário
            </NuxtLink>
          </li>
        </ul>

        <div class="d-flex">
          <button @click="fazerLogout" class="btn btn-outline-light btn-sm px-3">
            Sair
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>