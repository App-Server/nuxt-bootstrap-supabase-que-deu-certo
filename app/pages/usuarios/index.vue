<script setup>
const { data: usuarios, pending, refresh } = await useFetch('/api/usuarios')

const deletandoId = ref(null)

const deletarUsuario = async (id, nome) => {
  if (!confirm(`Tem certeza que deseja excluir o usuário "${nome}"?`)) {
    return
  }

  deletandoId.value = id

  try {
    await $fetch(`/api/usuarios/${id}`, {
      method: 'DELETE'
    })
    // Recarrega a lista atualizada após deletar
    await refresh()
  } catch (err) {
    alert(err.data?.statusMessage || 'Erro ao excluir usuário.')
  } finally {
    deletandoId.value = null
  }
}
</script>

<template>
  <NavbarAdmin />
  <div class="container-fluid">
    <!-- Cabeçalho com Título e Botão de Novo -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="mb-0">Lista de Usuários</h2>
      <NuxtLink to="/usuarios/cadastro" class="btn btn-success">
        + Novo Usuário
      </NuxtLink>
    </div>

    <!-- Loading -->
    <div v-if="pending" class="text-center my-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Carregando...</span>
      </div>
    </div>

    <!-- Alerta de Vazio -->
    <div v-else-if="!usuarios || usuarios.length === 0" class="alert alert-info">
      Nenhum usuário encontrado.
    </div>

    <!-- Card Envolvendo a Tabela -->
    <div v-else class="card shadow-sm border-0">
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0">
            <thead class="table-light">
              <tr>
                <th class="ps-3">Nome</th>
                <th>E-mail</th>
                <th>ID</th>
                <th class="text-end pe-3">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in usuarios" :key="user.id">
                <td class="ps-3 fw-medium">{{ user.nome }}</td>
                <td>{{ user.email }}</td>
                <td><small class="text-muted font-monospace">{{ user.id }}</small></td>
                <td class="text-end pe-3">
                  <div class="btn-group gap-1">
                    <NuxtLink :to="`/usuarios/editar/${user.id}`" class="btn btn-outline-primary btn-sm">
                      Editar
                    </NuxtLink>
                    <button 
                      @click="deletarUsuario(user.id, user.nome)" 
                      class="btn btn-outline-danger btn-sm"
                      :disabled="deletandoId === user.id"
                    >
                      {{ deletandoId === user.id ? 'Excluindo...' : 'Excluir' }}
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>