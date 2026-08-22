<template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="card shadow border-0 style-card">
      <div class="card-body p-4">
        <h3 class="card-title text-center mb-4">Acesso ao Sistema</h3>

        <div v-if="erro" class="alert alert-danger" role="alert">
          {{ erro }}
        </div>

        <form @submit.prevent="fazerLogin">
          <div class="mb-3">
            <label class="form-label">E-mail</label>
            <input
              v-model="email"
              type="email"
              class="form-control"
              placeholder="seu@email.com"
              required
            />
          </div>

          <div class="mb-3">
            <label class="form-label">Senha</label>
            <input
              v-model="senha"
              type="password"
              class="form-control"
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" class="btn btn-primary w-100" :disabled="carregando">
            {{ carregando ? 'Entrando...' : 'Entrar' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

definePageMeta({
  layout: false
})

const email = ref('')
const senha = ref('')
const erro = ref('')
const carregando = ref(false)

const fazerLogin = async () => {
  carregando.value = true
  erro.value = ''

  try {
    const res = await $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        email: email.value,
        senha: senha.value
      }
    })

    if (res.sucesso) {
      // Redirecionamento completo do navegador para carregar com os cookies de sessão
      window.location.href = '/painel'
    }
  } catch (err) {
    erro.value = err.data?.statusMessage || 'Erro ao realizar login.'
    carregando.value = false
  }
}
</script>

<style scoped>
.style-card {
  width: 100%;
  max-width: 400px;
}
</style>