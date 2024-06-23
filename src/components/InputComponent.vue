<script setup lang="ts">

import type { TFormAttributes } from '@/components/types/form';

const props = defineProps({})

const attributes: Partial<TFormAttributes> = {} as Partial<TFormAttributes>;

// check if the property type is defined and valid
// check if name property is defined
// check the other properties if they are valid as attributes

</script>

<template>
    <input v-bind="attributes" />
</template>