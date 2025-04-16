<template>
  <Menu />
  <div>
    <h2>Gerenciar Tipos de Ordens</h2>

    <!-- Formulário -->
    <form @submit.prevent="salvar" class="form">
      <input v-model="form.nome" placeholder="Nome" required />
      <button type="submit">{{ form.id ? 'Atualizar' : 'Criar' }}</button>
      <button type="button" @click="resetForm" v-if="form.id">Cancelar</button>
    </form>

    <!-- Lista de tiposOrdens -->
    <table border="1" cellpadding="5" cellspacing="0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="tipo in tiposOrdens" :key="tipo.id">
          <td>{{ tipo.id }}</td>
          <td>{{ tipo.nome }}</td>
          <td>
            <button @click="editar(tipo)">Editar</button>
            <button @click="excluir(tipo.id)">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import Menu from '@/components/Menu.vue'
import { ref, onMounted } from 'vue'
import api from '@/services/api'

const form = ref({ id: null,  nome: ''})
const tiposOrdens = ref([])
const endpoint = '/tiposOrdens'

const carregar = async () => {
  const response = await api.get(endpoint)
  tiposOrdens.value = response.data
}

const salvar = async () => {
  if (form.value.id) {
    await api.put(`${endpoint}/${form.value.id}`, form.value)
  } else {
    await api.post(endpoint, form.value)
  }
  resetForm()
  carregar()
}

const editar = (tipo) => {
  form.value = { ...tipo }
}

const excluir = async (id) => {
  if (confirm('Tem certeza que deseja excluir?')) {
    await api.delete(`${endpoint}/${id}`)
    carregar()
  }
}

const resetForm = () => {
  form.value = { id: null, nome: '' }
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
