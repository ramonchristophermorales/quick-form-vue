<style lang="scss" scoped></style>

<script setup lang="ts">

import { defineProps } from 'vue'
import FormProps from '@/components/types/formProps';
import type Config  from '@/components/types/config';

const props = defineProps({
    config: {
        type: Object,
        default: () => {
            return {
                method: ''
            }
        }
    }
});

const processConfig = (config: Config):void => {   
    console.log(config)
};

processConfig(props.config);

</script>

<template>
    <div>
        <form 
            accept-charset="accept-charset"
            action="action" 
            autocomplete="autocomplete"
            class="class"
            enctype="enctype"
            method="method" 
            target="target"
        >
            <slot></slot>
        </form>
    </div>
</template>