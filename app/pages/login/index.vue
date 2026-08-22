<script setup>
const supabase = useSupabaseClient()

const email = ref('')
const senha = ref('')
const erro = ref('')
const carregando = ref(false)

const realizarLogin = async () => {
  erro.value = ''
  carregando.value = true

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: senha.value
    })

    if (error) {
      erro.value = 'E-mail ou senha inválidos'
      return
    }

    await navigateTo('/painel')
  } catch (e) {
    erro.value = 'Ocorreu um erro ao tentar fazer login'
  } finally {
    carregando.value = false
  }
}
</script>

<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="card p-4 shadow-sm" style="max-width: 400px; width: 100%;">
      <h3 class="text-center mb-4">Acesso ao Sistema</h3>

      <div v-if="erro" class="alert alert-danger py-2 small" role="alert">
        {{ erro }}
      </div>

      <form @submit.prevent="realizarLogin">
        <div class="mb-3">
          <label class="form-label">E-mail</label>
          <input 
            v-model="email" 
            type="email" 
            class="form-control" 
            placeholder="seu@email.com"
            required
          >
        </div>

        <div class="mb-3">
          <label class="form-label">Senha</label>
          <input 
            v-model="senha" 
            type="password" 
            class="form-control" 
            placeholder="••••••••"
            required
          >
        </div>

        <button 
          type="submit" 
          class="btn btn-primary w-100" 
          :disabled="carregando"
        >
          <span v-if="carregando">Entrando...</span>
          <span v-else>Entrar</span>
        </button>
      </form>
    </div>
  </div>
</template>