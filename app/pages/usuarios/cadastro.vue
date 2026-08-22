<script setup>
const form = ref({
  nome: '',
  email: '',
  senha: ''
})

const enviando = ref(false)
const mensagem = ref('')

async function cadastrarUsuario() {
  enviando.value = true
  mensagem.value = ''

  try {
    await $fetch('/api/usuarios/cadastro', {
      method: 'POST',
      body: form.value
    })
    
    mensagem.value = 'Usuário cadastrado com sucesso!'
    form.value = { nome: '', email: '', senha: '' }
  } catch (err) {
    mensagem.value = 'Erro ao cadastrar: ' + (err.statusMessage || err.message)
  } finally {
    enviando.value = false
  }
}
</script>

<template>
  <div>
    <NavbarAdmin />
    <div class="container-fluid mt-4">
      <h3>Cadastrar novo Usuário</h3>

      <div class="card mt-3">
        <div class="card-body">
          <div v-if="mensagem" class="alert alert-info">{{ mensagem }}</div>

          <form @submit.prevent="cadastrarUsuario">
            <div class="mb-3">
              <label for="nome" class="form-label">Nome Completo</label>
              <input 
                v-model="form.nome" 
                type="text" 
                class="form-control" 
                id="nome" 
                required 
              />
            </div>

            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input 
                v-model="form.email" 
                type="email" 
                class="form-control" 
                id="email" 
                required 
              />
            </div>

            <div class="mb-3">
              <label for="senha" class="form-label">Password</label>
              <input 
                v-model="form.senha" 
                type="password" 
                class="form-control" 
                id="senha" 
                required 
              />
            </div>

            <button 
              type="submit" 
              class="btn btn-primary my-3" 
              :disabled="enviando"
            >
              {{ enviando ? 'Salvando...' : 'Salvar' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- Se houver uma tag style no final do arquivo, certifique-se de que ela está assim: -->
<style scoped>
/* Apenas regras CSS aqui dentro. Se estiver vazio ou não usar estilos customizados, remova o bloco <style> inteiro. */
</style>