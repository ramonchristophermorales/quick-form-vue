<script setup lang="ts">

import type {Config, ConfigItem, FormItem}  from '@/components/types/config';
import type {FormAttributes} from '@/components/types/form';
import { errorLog } from '@/helper';


const props = defineProps({
    conifg: {
        type: Object as () => Config,
        default: null,
        required: true
    },
    items: {
        type: Array as () => ConfigItem[],
        default: null,
        required: false
    },
    acceptCharset: {
        type: String,
        default: '',
        required: false
    },
    action: {
        type: String,
        default: '',
        required: true
    },
    autocomplete: {
        type: String,
        default: '',
        required: false
    },
    enctype: {
        type: String,
        default: 'multipart/form-data',
        required: false
    },
    method: {
        type: String,
        default: 'get',
        required: true
    },
    name: {
        type: String,
        default: '',
        required: true
    },
    novalidate: {
        type: Boolean,
        default: false,
        required: false
    },
    target: {
        type: String,
        default: '',
        required: false
    },
    rel: {
        type: String,
        default: '',
        required: false
    },
    accesskey: {
        type: String,
        default: '',
        required: false
    },
    class: {
        type: String,
        default: '',
        required: false
    },
    contenteditable: {
        type: Boolean,
        default: null,
        required: false
    },
    contextmenu: {
        type: String,
        default: null,
        required: false
    },
    dir: {
        type: String,
        default: null,
        required: false
    },
    draggable: {
        type: Boolean,
        default: false,
        required: false
    },
    hidden: {
        type: Boolean,
        default: false,
        required: false
    },
    id: {
        type: String,
        default: null,
        required: false
    },
    lang: {
        type: String,
        default: null,
        required: false
    },
    spellcheck: {
        type: Boolean,
        default: false,
        required: false
    },
    style: {
        type: String,
        default: null,
        required: false
    },
    tabindex: {
        type: Number,
        default: null,
        required: false
    },
    title: {
        type: String,
        default: null,
        required: false
    },
    translate: {
        type: String,
        default: null,
        required: false
    },
    onSubmit: {
        type: Function,
        default: null,
        required: false
    },
    onReset: {
        type: Function,
        default: null,
        required: false
    },
    onBlur: {
        type: Function,
        default: null,
        required: false
    },
    onChange: {
        type: Function,
        default: null,
        required: false
    },
    onClick: {
        type: Function,
        default: null,
        required: false
    },
    onDblClick: {
        type: Function,
        default: null,
        required: false
    },
    onFocus: {
        type: Function,
        default: null,
        required: false
    },
    onInput: {
        type: Function,
        default: null,
        required: false
    },
    onInvalid: {
        type: Function,
        default: null,
        required: false
    },
    onKeyDown:{
        type: Function,
        default: null,
        required: false
    },
    onKeyPress:{
        type: Function,
        default: null,
        required: false
    },
    onKeyUp:{
        type: Function,
        default: null,
        required: false
    },
    onMouseDown: {
        type: Function,
        default: null,
        required: false
    },
    onMouseMove: {
        type: Function,
        default: null,
        required: false
    },
    onMouseOut: {
        type: Function,
        default: null,
        required: false
    },
    onMouseOver: {
        type: Function,
        default: null,
        required: false
    },
    onMouseUp: {
        type: Function,
        default: null,
        required: false
    },
    onWheel: {
        type: Function,
        default: null,
        required: false
    },
    'v-model': {
        type: null,
        default: null,
        required: false
    },
    'v-if': {
        type: Boolean,
        default: null,
        required: false
    },
    'v-else': {
        type: Boolean,
        default: null,
        required: false
    },
    'v-else-if': {
        type: Boolean,
        default: null,
        required: false
    },
    'v-for': {
        type: String,
        default: null,
        required: false
    },
    'v-show': {
        type: Boolean,
        default: null,
        required: false
    },
    'v-bind': {
        type: Object,
        default: null,
        required: false
    },
    'v-on': {
        type: Object,
        default: null,
        required: false
    },
    'v-pre': {
        type: Boolean,
        default: null,
        required: false
    },
    'v-cloak': {
        type: Boolean,
        default: null,
        required: false
    },
    'v-once': {
        type: Boolean,
        default: null,
        required: false
    },
});

var formAttributes: Partial<FormAttributes> = {};

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