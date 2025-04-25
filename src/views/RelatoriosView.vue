<template>
  <div>
    <Menu />
    <h1>Relatórios</h1>

    <table border="1" cellpadding="5" cellspacing="0">
      <thead>
        <tr>
          <th>Ativo</th>
          <th>Quantidade</th>
          <th>Preço Médio</th>
          <th>Descrição</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="relatorio in relatorios" :key="relatorio.ativo_id">
          <td>{{ relatorio.ativo.codigo }}</td>
          <td>{{ relatorio.quantidade }}</td>
          <td>{{ formatter.price(relatorio.preco_medio) }}</td>
          <td>
            {{ relatorio.quantidade }} quantidades de {{ relatorio.ativo.codigo }} custodiadas na
            corretora {{ relatorio.corretora.nome }}, CNPJ
            {{ formatter.cnpj(relatorio.corretora.cnpj) }}. Preço médio:
            {{ formatter.price(relatorio.preco_medio) }}, Custo total aquisição:
            {{ formatter.price(relatorio.custo_total_aquisicao) }}
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
import { useFormatters } from '@/composables/formatters'

const formatter = useFormatters()
const endpoint = '/relatorios'
const relatorios = ref([])
const carregar = async () => {
  const response = await api.get(endpoint)
  relatorios.value = response.data.relatorios

  console.log(response)
}

onMounted(() => {
  carregar()
})
</script>

<style scoped>
table {
  width: 100%;
}
thead {
  background-color: #f2f2f2;
  font-weight: bold;
}
</style>
