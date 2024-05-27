<script setup lang="ts">

import type {Config, ConfigItem, FormItem}  from '@/components/types/config';
import type { TFormAttributes } from '@/components/types/form';
import  FormAttributeList from '@/components/typeDefaults/form';
import { errorLog, isType, isKeyOfType } from '@/helper';

const props = defineProps({
    config: {
        type: Object as () => Config,
        default: {} as Config,
        required: true
    },
});

const formAttributes: TFormAttributes = {} as TFormAttributes;

var formItems: ConfigItem[] = [] as ConfigItem[];

const defaultClass:string = 'form-control'; // default form class


const processFormItems =(formItems: unknown):void => {
    if (formItems === undefined || Array.isArray(formItems) === false || formItems.length === 0) {
        errorLog('Form "items" is required if there are no form components declared')
        return;
    }

    formItems.forEach((formItem: unknown) => {
        
        if (isType<FormItem>(formItem, ['name']) === false) {
            errorLog('Form item "name" is required')
            return;
        }

        // @todo: process the form item
        // @todo: validate the form items, create different types according to what type the form item is. e.g. input[type=text], select, textarea, etc
        // @todo: process the form items by adding the form item components
    });


}

const processFormAttributes = (config: Config):void => {
     // config properties takes priority over form attributes
     for (const [key, val] of Object.entries(config)) {
        if (isKeyOfType<TFormAttributes>(key, FormAttributeList) === true) {
            formAttributes[key] = val;
        }
    }

    // @todo: process the direct props of the form component, for now use props.config for the form attribs
}

/**
 * process the config attribute passed
 * config properties takes priority over inline attributes declaration of the component
 */
const processConfig = (config: unknown):void => {   

    if (isType<Config>(config, ['name', 'items']) === false) {
        throw new TypeError('Prop "config.items" and "config.name" is required, and it should be an object')
    }

    // config items takes priority and change the formItems from component props
    if (config.items !== undefined && config.items.length > 0) {
        formItems = config.items;

        processFormItems(formItems);
    }

    processFormAttributes(config);
}

// process the config attribute passed first
processConfig(props.config);

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