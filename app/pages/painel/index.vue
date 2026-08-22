<script setup>
// Busca a lista de usuários para obter a contagem total
const { data: usuarios, pending } = await useFetch('/api/usuarios')
</script>

<template>
  <div>
    <NavbarAdmin />
    <div class="container-fluid">
      <h3 class="mb-4">Painel Administrativo</h3>

      <div class="row">
        <!-- Card de Total de Usuários -->
        <div class="col-md-4">
          <div class="card shadow-sm border-0">
            <div class="card-body">
              <h6 class="card-subtitle mb-2 text-muted uppercase font-monospace">
                Total de Usuários
              </h6>

              <!-- Loading ou Contador -->
              <div v-if="pending" class="spinner-border spinner-border-sm text-primary" role="status"></div>
              <h2 v-else class="card-title fw-bold text-primary my-2">
                {{ usuarios ? usuarios.length : 0 }}
              </h2>

              <p class="card-text text-secondary small">
                Usuários ativos cadastrados no sistema.
              </p>

              <NuxtLink to="/usuarios" class="btn btn-outline-primary btn-sm mt-2">
                Gerenciar Usuários &rarr;
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>