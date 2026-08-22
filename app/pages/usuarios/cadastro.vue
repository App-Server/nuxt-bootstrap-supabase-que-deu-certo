<script setup>
const email = ref('')
const senha = ref('')
const nome = ref('')
const erro = ref('')
const carregando = ref(false)

const cadastrarUsuario = async () => {
  erro.value = ''
  carregando.value = true

  try {
    // Chama o endpoint de cadastro criando o usuário diretamente no Auth
    const response = await $fetch('/api/usuarios/cadastrar', {
      method: 'POST',
      body: { 
        email: email.value, 
        senha: senha.value, 
        nome: nome.value 
      }
    })

    await navigateTo('/usuarios')
  } catch (e) {
    erro.value = e.data?.statusMessage || 'Erro ao cadastrar usuário'
  } finally {
    carregando.value = false
  }
}
</script>

<template>
  <NavbarAdmin />
  <div class="container mt-4" style="max-width: 500px;">
    <h2>Novo Usuário</h2>
    <div v-if="erro" class="alert alert-danger py-2">{{ erro }}</div>
    
    <form @submit.prevent="cadastrarUsuario">
      <div class="mb-3">
        <label class="form-label">Nome Completo</label>
        <input v-model="nome" type="text" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">E-mail</label>
        <input v-model="email" type="email" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Senha</label>
        <input v-model="senha" type="password" class="form-control" required />
      </div>
      <button type="submit" class="btn btn-primary w-100" :disabled="carregando">
        {{ carregando ? 'Cadastrando...' : 'Salvar Usuário' }}
      </button>
    </form>
  </div>
</template>