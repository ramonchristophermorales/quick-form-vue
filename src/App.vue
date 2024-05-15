<script setup lang="ts">
import FormComponent from '@/components/FormComponent.vue'

const config = {
  method:"post"
}

</script>

<template>
  <div>
    <form-component :config="config" />
  </div>
</template>

<style scoped>
</style>
