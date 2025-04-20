<template>
  <div v-if="visivel" :class="['alert-wrapper', classes]">
    <p>{{ message }}</p>
    <span @click="visivel = false" class="close">X</span>
  </div>
</template>

<script setup>
import { computed, watch, ref } from 'vue'

const visivel = ref(false)

const props = defineProps({
  message: {
    type: String,
  },
  type: {
    type: String,
    default: 'error',
    validator(value) {
      return ['error', 'success', 'warning'].includes(value)
    },
  },
})

const classes = computed(() => {
  switch (props.type) {
    case 'error':
      return 'error'
    case 'success':
      return 'success'
    case 'warning':
      return 'warning'
    default:
      return 'error'
  }
})

watch(
  () => props.message,
  () => {
    if (props.message) {
      visivel.value = true
    }
  },
)
</script>

<style scoped>
.alert-wrapper {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
}

.error {
  color: red;
  font-weight: bold;
  background-color: lightcoral;
}

.success {
  color: green;
  font-weight: bold;
  background-color: lightgreen;
}

.warning {
  color: orange;
  font-weight: bold;
  background-color: lightyellow;
}

.close {
  cursor: pointer;
}
</style>
