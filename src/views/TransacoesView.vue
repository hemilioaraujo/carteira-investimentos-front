<template>
  <div>
    <Menu />
    <h2>Lista de Transações</h2>

    <button class="m-3" @click="formVisible = !formVisible" v-if="!formVisible">
      + Nova Transação
    </button>

    <form @submit.prevent="salvar" class="form" v-if="formVisible">
      <select v-model="form.ativo_id" required>
        <option value="" disabled>Selecione um ativo</option>
        <option v-for="ativo in ativos" :key="ativo.id" :value="ativo.id">
          {{ ativo.codigo }} - {{ ativo.descricao }}
        </option>
      </select>

      <select v-model="form.corretora_id" required>
        <option value="" disabled>Selecione um ativo</option>
        <option v-for="corretora in corretoras" :key="corretora.id" :value="corretora.id">
          {{ corretora.nome }}
        </option>
      </select>

      <select v-model="form.tipo_ordem_id" required>
        <option value="" disabled>Selecione um ativo</option>
        <option v-for="tipoOrdem in tiposOrdens" :key="tipoOrdem.id" :value="tipoOrdem.id">
          {{ tipoOrdem.nome }} {{ form.tipo_ordem_id }}
        </option>
      </select>

      <input v-model.number="form.quantidade" type="number" placeholder="Quantidade" required />
      <input
        v-model.number="form.preco_unitario"
        type="number"
        step="0.01"
        placeholder="Preço Unitário"
        required
      />
      <input
        v-model.number="form.valor_total"
        type="number"
        step="0.01"
        placeholder="Valor Total"
        required
      />
      <input v-model="form.data" type="date" required />
      <button type="submit">{{ form.id ? 'Atualizar' : 'Criar' }}</button>
      <button type="button" @click="resetForm">Cancelar</button>
    </form>

    <table border="1" cellpadding="5" cellspacing="0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Ativo</th>
          <th>Corretora</th>
          <th>Tipo de Ordem</th>
          <th>Quantidade</th>
          <th>Preço Unitário</th>
          <th>Total</th>
          <th>Data</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="transacao in transacoes" :key="transacao.id">
          <td>{{ transacao.id }}</td>
          <td :title="transacao.ativo.descricao">{{ transacao.ativo.codigo }}</td>
          <td>{{ transacao.corretora.nome }}</td>
          <td>{{ transacao.tipo_ordem.nome }}</td>
          <td>{{ transacao.quantidade }}</td>
          <td>{{ formatter.price(transacao.preco_unitario) }}</td>
          <td>{{ formatter.price(transacao.valor_total) }}</td>
          <td>{{ formatter.date(transacao.data) }}</td>
          <td>
            <button @click="editar(transacao)">Editar</button>
            <button @click="excluir(transacao.id)">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import Menu from '@/components/Menu.vue'
import { ref, onMounted, watch } from 'vue'
import api from '@/services/api'
import { useFormatters } from '@/composables/formatters'

const formatter = useFormatters()
const transacoes = ref([])
const ativos = ref([])
const corretoras = ref([])
const tiposOrdens = ref([])
const formVisible = ref(false)
const form = ref({
  id: null,
  ativo_id: null,
  corretora_id: null,
  tipo_ordem_id: null,
  quantidade: null,
  preco_unitario: null,
  valor_total: null,
  data: null,
})
const endpoint = '/transacoes'

const carregar = async () => {
  const response = await api.get(endpoint)
  transacoes.value = response.data
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

const editar = (transacao) => {
  form.value = { ...transacao }
  formVisible.value = true
}

const excluir = async (id) => {
  if (confirm('Tem certeza que deseja excluir?')) {
    await api.delete(`${endpoint}/${id}`)
    carregar()
  }
}

const resetForm = () => {
  form.value = {
    id: null,
    ativo_id: null,
    corretora_id: null,
    tipo_ordem_id: null,
    quantidade: null,
    preco_unitario: null,
    valor_total: null,
    data: null,
  }
  formVisible.value = false
}

const fetchDados = async () => {
  const [resCorretoras, resAtivos, resTipos] = await Promise.all([
    api.get('/corretoras'),
    api.get('/ativos'),
    api.get('/tiposOrdens'),
  ])

  corretoras.value = resCorretoras.data
  ativos.value = resAtivos.data
  tiposOrdens.value = resTipos.data
}

watch(
  () => [form.value.preco_unitario, form.value.quantidade],
  ([preco, quantidade]) => {
    form.value.valor_total = +(preco * quantidade).toFixed(2)
  },
)

onMounted(() => {
  carregar()
  fetchDados()
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
.m-3 {
  margin: 1rem;
}
</style>
