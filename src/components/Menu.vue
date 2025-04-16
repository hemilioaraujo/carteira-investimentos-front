<template>
  <nav style="padding: 1rem; background-color: #f0f0f0; margin-bottom: 1rem">
    <RouterLink to="/" style="margin-right: 1rem">Home</RouterLink>
    <RouterLink to="/ativos" style="margin-right: 1rem">Ativos</RouterLink>
    <RouterLink to="/corretoras" style="margin-right: 1rem">Corretoras</RouterLink>
    <RouterLink to="/tiposOrdens" style="margin-right: 1rem">Tipos de Ordens</RouterLink>
    <RouterLink to="/transacoes" style="margin-right: 1rem">Transações</RouterLink>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
