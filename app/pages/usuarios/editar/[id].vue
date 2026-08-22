<template>
  <div>
    <NavbarAdmin />
    <div class="container my-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h3>Editar Usuário #{{ id }}</h3>
        <NuxtLink to="/usuarios" class="btn btn-secondary btn-sm">
          Voltar para Lista
        </NuxtLink>
      </div>

      <!-- Estado de Carregamento -->
      <div v-if="pending" class="text-center my-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Carregando dados...</span>
        </div>
      </div>

      <!-- Mensagens de Alerta -->
      <div v-else-if="error || erroForm" class="alert alert-danger" role="alert">
        {{ erroForm || error?.data?.statusMessage || 'Erro ao carregar dados do usuário.' }}
      </div>

      <div v-if="sucessoForm" class="alert alert-success" role="alert">
        {{ sucessoForm }}
      </div>

      <!-- Formulário de Edição -->
      <div v-if="!pending && usuario" class="card shadow-sm border-0">
        <div class="card-body">
          <form @submit.prevent="salvarAlteracoes">
            <div class="mb-3">
              <label class="form-label">Nome Completo</label>
              <input
                v-model="usuario.nome"
                type="text"
                class="form-control"
                required
              />
            </div>

            <div class="mb-3">
              <label class="form-label">E-mail</label>
              <input
                v-model="usuario.email"
                type="email"
                class="form-control"
                required
              />
            </div>

            <div class="mb-3">
              <label class="form-label">Nova Senha</label>
              <input
                v-model="novaSenha"
                type="password"
                class="form-control"
                placeholder="Deixe em branco para não alterar"
              />
            </div>

            <div class="d-flex justify-content-end gap-2">
              <NuxtLink to="/usuarios" class="btn btn-outline-secondary">
                Cancelar
              </NuxtLink>
              <button type="submit" class="btn btn-primary" :disabled="salvando">
                {{ salvando ? 'Salvando...' : 'Salvar Alterações' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'

const route = useRoute()
const router = useRouter()
const id = route.params.id

const usuario = ref({ nome: '', email: '' })
const novaSenha = ref('')
const salvando = ref(false)
const erroForm = ref('')
const sucessoForm = ref('')

// Busca os dados do usuário ao carregar
const { data, pending, error } = await useFetch(`/api/usuarios/${id}`)

watchEffect(() => {
  if (data.value?.usuario) {
    usuario.value = { ...data.value.usuario }
  }
})

const salvarAlteracoes = async () => {
  salvando.value = true
  erroForm.value = ''
  sucessoForm.value = ''

  try {
    // Chamada enviada diretamente para /api/usuarios/[id] usando o método PUT
    const res = await $fetch(`/api/usuarios/${id}`, {
      method: 'PUT',
      body: {
        nome: usuario.value.nome,
        email: usuario.value.email,
        senha: novaSenha.value
      }
    })

    if (res.sucesso) {
      sucessoForm.value = 'Usuário atualizado com sucesso!'
      setTimeout(() => {
        router.push('/usuarios')
      }, 1500)
    }
  } catch (err) {
    erroForm.value = err.data?.statusMessage || 'Erro ao atualizar usuário.'
  } finally {
    salvando.value = false
  }
}
</script>