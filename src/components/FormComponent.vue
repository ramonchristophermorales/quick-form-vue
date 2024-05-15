<script setup lang="ts">

import type {Config, ConfigItem, FormItem, FormAttributes}  from '@/components/types/config';
import { errorLog } from '@/helper';

type PropsType = FormAttributes & {
    config: Partial<Config>
    items: ConfigItem[]
}

const props = defineProps<Readonly<PropsType>>();

const formAttributes: Partial<FormAttributes> = {};

var formItems: ConfigItem[] = props.items ?? [];

function isKeyInFormAttributes(key: string, obj: FormAttributes): key is keyof FormAttributes {
    return key in obj;
}

const processFormItems =(formItems: FormItem[]):void => {
    if (formItems === undefined || formItems.length === 0) {
        errorLog('Form items is required')
        return;
    }
}

/**
 * process the config attribute passed
 * config properties takes priority over inline attributes declaration of the component
 */
const processConfig = (config: Config):void => {   
    if (config === undefined) {
        errorLog('Config prop is required')
        return;
    }

    // config items takes priority and change the formItems from component props
    if (config.items !== undefined && config.items.length > 0) {
        formItems = config.items;
    }

    // config properties takes priority over form attributes
    for (const [key, val] of Object.entries(config)) {
        if (isKeyInFormAttributes(key, formAttributes)) {
            formAttributes[key] = val;
        }
    }
}

// process the config attribute passed first
processConfig(props.config);

// process the form items
processFormItems(formItems);
</script>

<template>
    <div>
        <form 
            v-bind="formAttributes"
        >
            <slot></slot>
        </form>
    </div>
</template>

<style lang="scss" scoped></style>