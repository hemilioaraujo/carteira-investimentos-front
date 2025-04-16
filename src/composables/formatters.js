export function useFormatters() {
  return {
    price: (valor) => {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(valor)
    },

    date: (data) => {
      if (!data) return '-'

      return new Date(data + 'T00:00:00').toLocaleDateString('pt-BR') 
    },
  }
}
