<script setup lang="ts">
import FormComponent from '@/components/FormComponent.vue'
import type { TConfig } from './components/types/config';

const config: TConfig = {
  method: "post"
}

</script>

<template>
  <div>
    <form-component :config="config" />
  </div>
</template>

<style scoped>
</style>
