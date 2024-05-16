<script setup lang="ts">

import type {Config, ConfigItem, FormItem}  from '@/components/types/config';
import type {FormAttributes} from '@/components/types/form';
import { errorLog } from '@/helper';

const props = defineProps({
    config: {
        type: Object as () => Config,
        required: true,
        default: {} as Config
    },
    items: {
        type: Array as () => ConfigItem[],
        required: false,
        default: () => []
    }
});

const formAttributes: Partial<FormAttributes> = {};

var formItems: ConfigItem[] = props.items ?? [] as ConfigItem[];

var defaultClass = 'form-control'; // default form class

function isKeyInFormAttributes(key: string, obj: FormAttributes): key is keyof FormAttributes {
    return key in obj;
}

const processFormItems =(formItems: FormItem[]):void => {
    if (formItems === undefined || formItems.length === 0) {
        errorLog('Form "items" is required if there are no form components declared')
        return;
    }
}

/**
 * process the config attribute passed
 * config properties takes priority over inline attributes declaration of the component
 */
const processConfig = (config: Config):void => {   
    if (config === undefined) {
        errorLog('Config "prop" is required')
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
    <form 
        v-bind="formAttributes"
        :class="defaultClass"
    >
        <slot></slot>
    </form>
</template>

<style lang="scss" scoped></style>