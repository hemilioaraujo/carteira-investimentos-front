<template>
  <Menu />
  <div>
    <h2>Lista de Corretoras</h2>
    <form @submit.prevent="salvar" class="form">
      <input v-model="form.nome" placeholder="Nome da corretora" required />
      <input v-model="form.cnpj" placeholder="CNPJ" required />
      <button type="submit">{{ form.id ? 'Atualizar' : 'Criar' }}</button>
      <button type="button" @click="resetForm" v-if="form.id">Cancelar</button>
    </form>

    <table border="1" cellpadding="5" cellspacing="0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>CNPJ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="corretora in corretoras" :key="corretora.id">
          <td>{{ corretora.id }}</td>
          <td>{{ corretora.nome }}</td>
          <td>{{ corretora.cnpj }}</td>
          <td>
            <button @click="editar(corretora)">Editar</button>
            <button @click="excluir(corretora.id)">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import Menu from '@/components/Menu.vue'
import api from '@/services/api'
import { ref, onMounted } from 'vue'

const form = ref({ id: null, nome: '' })
const corretoras = ref([])

const carregar = async () => {
  const response = await api.get('/corretoras')
  corretoras.value = response.data
}

const salvar = async () => {
  if (form.value.id) {
    await api.put(`/corretoras/${form.value.id}`, form.value)
  } else {
    await api.post('/corretoras', form.value)
  }
  resetForm()
  carregar()
}

const editar = (corretora) => {
  form.value = { ...corretora }
}

const excluir = async (id) => {
  if (confirm('Tem certeza que deseja excluir?')) {
    await api.delete(`/corretoras/${id}`)
    carregar()
  }
}

const resetForm = () => {
  form.value = { id: null, nome: '', cnpj: '' }
}

onMounted(() => {
  carregar()
})
</script>

<style scoped>
form {
  margin-bottom: 1rem;
  display: flex;
  gap: 0.5rem;
}
table {
  width: 100%;
}
button {
  margin-right: 0.25rem;
}
</style>
