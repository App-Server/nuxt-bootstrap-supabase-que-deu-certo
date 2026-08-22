<script setup>
const efetuarLogout = async () => {
  try {
    await $fetch('/api/auth/logout', { method: 'POST' })
    // Redireciona limpo para a tela de login
    window.location.href = '/login'
  } catch (err) {
    console.error('Erro ao sair:', err)
  }
}
</script>

<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Navbar</a>
        <button 
          class="navbar-toggler" 
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
              <NuxtLink class="nav-link" to="/painel">Painel</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/usuarios">Usuários</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/usuarios/cadastro">Novo Usuários</NuxtLink>
            </li>
          </ul>
          <div class="d-flex">
            <button @click="efetuarLogout" class="btn btn-outline-danger btn-sm">
              Sair
            </button>
          </div>
        </div>
      </div>
    </nav>
  </div>
  <br>
</template>