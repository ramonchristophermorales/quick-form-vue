<script setup lang="ts">

import type { TFormAttributes } from '@/components/types/form';
import { isType } from '@/helper';
import type { TInputAttributes } from './types/input';
import inputTypes from '@/assets/data/inputTypeList.json';

const props = defineProps({
    componentAttributes: {
        type: Object as () => TFormAttributes,
        default: {} as TFormAttributes
    }
})

const attributes: Readonly<TInputAttributes> = props.componentAttributes;

/**
 * check if the property type is defined and valid
 */
const validateType = (): void => {

    if (isType<TInputAttributes>(attributes, ['type']) === false || typeof attributes.type !== 'string') {
        throw new TypeError('Form input attribute "type" is required and it should be a string')
    }

    if (inputTypes.includes(attributes.type) === false) {
        throw new Error("Form input attribute 'type' should be one of the following: " + inputTypes.join(', '));
    }
}

/**
 * check if name property is defined
 */
const validateName = (): void => {
    if (isType<TInputAttributes>(attributes, ['name']) === false || typeof attributes.name !== 'string') {
        throw new TypeError('Form input attribute "name" is required and it should be a string')
    }
}

// check if name property is defined
validateName();

// check if the property type is defined and valid
validateType();

</script>

<template>
    <input v-bind="props.componentAttributes"/>
</template>