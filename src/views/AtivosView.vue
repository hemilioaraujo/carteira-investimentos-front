<template>
  <Menu />
  <div>
    <h2>Gerenciar Ativos</h2>

    <!-- Formulário -->
    <form @submit.prevent="salvar" class="form">
      <input v-model="form.descricao" placeholder="Nome do ativo" required />
      <input v-model="form.codigo" placeholder="Código (ex: PETR4)" required />
      <input v-model="form.cnpj" placeholder="CNPJ" required />
      <button type="submit">{{ form.id ? 'Atualizar' : 'Criar' }}</button>
      <button type="button" @click="resetForm" v-if="form.id">Cancelar</button>
    </form>

    <!-- Lista de ativos -->
    <table border="1" cellpadding="5" cellspacing="0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Ticker</th>
          <th>Descrição</th>
          <th>CNPJ</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ativo in ativos" :key="ativo.id">
          <td>{{ ativo.id }}</td>
          <td>{{ ativo.codigo }}</td>
          <td>{{ ativo.descricao }}</td>
          <td>{{ ativo.cnpj }}</td>
          <td>
            <button @click="editar(ativo)">Editar</button>
            <button @click="excluir(ativo.id)">Excluir</button>
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

const form = ref({ id: null, descricao: '', codigo: '', cnpj: '' })
const ativos = ref([])

const carregar = async () => {
  const response = await api.get('/ativos')
  ativos.value = response.data
}

const salvar = async () => {
  if (form.value.id) {
    await api.put(`/ativos/${form.value.id}`, form.value)
  } else {
    await api.post('/ativos', form.value)
  }
  resetForm()
  carregar()
}

const editar = (ativo) => {
  form.value = { ...ativo }
}

const excluir = async (id) => {
  if (confirm('Tem certeza que deseja excluir?')) {
    await api.delete(`/ativos/${id}`)
    carregar()
  }
}

const resetForm = () => {
  form.value = { id: null, nome: '', codigo: '', cnpj: '' }
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
