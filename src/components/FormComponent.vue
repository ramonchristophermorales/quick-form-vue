<style lang="scss" scoped></style>

<script setup lang="ts">

// import { defineProps } from 'vue'
import type {Config , FormAttributes}  from '@/components/types/config';
import { errorLog } from '@/helper.ts';

type PropsType = FormAttributes & {
    config: Config
}

const props = defineProps<PropsType>();

const processConfig = (config: Config):void => {   
    if (config === undefined) {
        errorLog('Config prop is required')
        return;
    }
    
}

processConfig(props.config as Config);

</script>

<template>
    <div>
        <form 
            v-bind="props"
        >fuubar
            <slot></slot>
        </form>
    </div>
</template>