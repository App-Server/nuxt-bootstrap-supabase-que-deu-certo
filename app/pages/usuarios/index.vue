<template>
  <div>
    <NavbarAdmin />
    <div class="container-fluid">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h3>Lista de Usuários</h3>
        <NuxtLink to="/usuarios/cadastro" class="btn btn-primary btn-sm">
          + Novo Usuário
        </NuxtLink>
      </div>

      <!-- Barra de Pesquisa -->
      <div class="row mb-4">
        <div class="col-md-6">
          <input
            v-model="filtro"
            type="text"
            class="form-control"
            placeholder="Pesquisar por nome ou e-mail..."
          />
        </div>
      </div>

      <!-- Estado de Carregamento -->
      <div v-if="pending" class="text-center my-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Carregando...</span>
        </div>
      </div>

      <!-- Estado de Erro -->
      <div v-else-if="error" class="alert alert-danger" role="alert">
        Erro ao carregar a lista de usuários.
      </div>

      <!-- Grid de Cards de Usuários -->
      <div v-else class="row g-3">
        <div
          v-for="usuario in usuariosFiltrados"
          :key="usuario.id"
          class="col-12 col-md-6 col-lg-4"
        >
          <div class="card h-100 shadow-sm border-0">
            <div class="card-body">
              <h5 class="card-title text-primary mb-1">{{ usuario.nome }}</h5>
              <h6 class="card-subtitle mb-3 text-muted fs-7">{{ usuario.email }}</h6>
              <div class="text-secondary small">
                <i class="bi bi-calendar"></i>
                Cadastrado em: {{ formatarData(usuario.created_at) }}
              </div>
            </div>
            
            <div class="card-footer bg-transparent border-0 d-flex justify-content-between align-items-center pb-3">
              <span class="badge bg-light text-dark border">ID #{{ usuario.id }}</span>
              
              <!-- Ações: Editar e Excluir -->
              <div class="d-flex gap-2">
                <NuxtLink :to="`/usuarios/editar/${usuario.id}`" class="btn btn-outline-warning btn-sm">
                  Editar
                </NuxtLink>
                <button 
                  @click="confirmarEExcluir(usuario.id, usuario.nome)"
                  class="btn btn-outline-danger btn-sm"
                  :disabled="deletandoId === usuario.id"
                >
                  {{ deletandoId === usuario.id ? 'Excluindo...' : 'Excluir' }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Mensagem de Nenhum Usuário Encontrado -->
        <div v-if="usuariosFiltrados.length === 0" class="col-12">
          <div class="alert alert-info text-center">
            Nenhum usuário encontrado.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const filtro = ref('')
const deletandoId = ref(null)

// Busca automática usando o composable do Nuxt 3 (inclui a função refresh)
const { data, pending, error, refresh } = await useFetch('/api/usuarios')

// Computada para filtrar a lista dinamicamente
const usuariosFiltrados = computed(() => {
  const lista = data.value?.usuarios || []
  if (!filtro.value.trim()) return lista

  const termo = filtro.value.toLowerCase()
  return lista.filter(
    (u) =>
      u.nome.toLowerCase().includes(termo) ||
      u.email.toLowerCase().includes(termo)
  )
})

// Função para excluir o usuário e recarregar a lista
const confirmarEExcluir = async (id, nome) => {
  if (!confirm(`Tem certeza que deseja excluir o usuário "${nome}"?`)) {
    return
  }

  deletandoId.value = id

  try {
    const res = await $fetch(`/api/usuarios/${id}`, {
      method: 'DELETE'
    })

    if (res.sucesso) {
      // Atualiza os dados da tela automaticamente
      await refresh()
    }
  } catch (err) {
    alert(err.data?.statusMessage || 'Erro ao excluir usuário.')
  } finally {
    deletandoId.value = null
  }
}

// Função auxiliar para formatar a data do Supabase
const formatarData = (dataIso) => {
  if (!dataIso) return '-'
  return new Date(dataIso).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}
</script>