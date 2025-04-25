<template>
  <nav>
    <RouterLink to="/" class="nav__item">Home</RouterLink>
    <RouterLink to="/ativos" class="nav__item">Ativos</RouterLink>
    <RouterLink to="/corretoras" class="nav__item">Corretoras</RouterLink>
    <RouterLink to="/tiposOrdens" class="nav__item">Tipos de Ordens</RouterLink>
    <RouterLink to="/transacoes" class="nav__item">Transações</RouterLink>
    <RouterLink to="/relatorios" class="nav__item">Relatórios</RouterLink>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
nav {
  padding: 1rem;
  background-color: black;
  margin-bottom: 1rem;
}
.nav__item {
  margin-right: 1rem;
  text-decoration: none;
  color: white;
}
.router-link-active {
  color: red;
}
</style>
