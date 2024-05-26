<script setup lang="ts">

import type {Config, ConfigItem, FormItem}  from '@/components/types/config';
import type { TFormAttributes } from '@/components/types/form';
import  FormAttributeList from '@/components/typeDefaults/form';
import { errorLog, typeCheck, isKeyOfType } from '@/helper';

const props = defineProps({
    config: {
        type: Object as () => Config,
        default: {} as Config,
        required: true
    },
    // items: {
    //     type: Array as () => ConfigItem[],
    //     default: null,
    //     required: false
    // },
    // acceptCharset: {
    //     type: String,
    //     default: '',
    //     required: false
    // },
    // action: {
    //     type: String,
    //     default: '',
    //     required: false
    // },
    // autocomplete: {
    //     type: String,
    //     default: '',
    //     required: false
    // },
    // enctype: {
    //     type: String,
    //     default: 'multipart/form-data',
    //     required: false
    // },
    // method: {
    //     type: String,
    //     default: 'get',
    //     required: false
    // },
    // name: {
    //     type: String,
    //     default: '',
    //     required: true
    // },
    // novalidate: {
    //     type: Boolean,
    //     default: false,
    //     required: false
    // },
    // target: {
    //     type: String,
    //     default: '',
    //     required: false
    // },
    // rel: {
    //     type: String,
    //     default: '',
    //     required: false
    // },
    // accesskey: {
    //     type: String,
    //     default: '',
    //     required: false
    // },
    // class: {
    //     type: String,
    //     default: '',
    //     required: false
    // },
    // contenteditable: {
    //     type: Boolean,
    //     default: null,
    //     required: false
    // },
    // contextmenu: {
    //     type: String,
    //     default: null,
    //     required: false
    // },
    // dir: {
    //     type: String,
    //     default: null,
    //     required: false
    // },
    // draggable: {
    //     type: Boolean,
    //     default: false,
    //     required: false
    // },
    // hidden: {
    //     type: Boolean,
    //     default: false,
    //     required: false
    // },
    // id: {
    //     type: String,
    //     default: null,
    //     required: false
    // },
    // lang: {
    //     type: String,
    //     default: null,
    //     required: false
    // },
    // spellcheck: {
    //     type: Boolean,
    //     default: false,
    //     required: false
    // },
    // style: {
    //     type: String,
    //     default: null,
    //     required: false
    // },
    // tabindex: {
    //     type: Number,
    //     default: null,
    //     required: false
    // },
    // title: {
    //     type: String,
    //     default: null,
    //     required: false
    // },
    // translate: {
    //     type: String,
    //     default: null,
    //     required: false
    // },
    // onSubmit: {
    //     type: Function,
    //     default: null,
    //     required: false
    // },
    // onReset: {
    //     type: Function,
    //     default: null,
    //     required: false
    // },
    // onBlur: {
    //     type: Function,
    //     default: null,
    //     required: false
    // },
    // onChange: {
    //     type: Function,
    //     default: null,
    //     required: false
    // },
    // onClick: {
    //     type: Function,
    //     default: null,
    //     required: false
    // },
    // onDblClick: {
    //     type: Function,
    //     default: null,
    //     required: false
    // },
    // onFocus: {
    //     type: Function,
    //     default: null,
    //     required: false
    // },
    // onInput: {
    //     type: Function,
    //     default: null,
    //     required: false
    // },
    // onInvalid: {
    //     type: Function,
    //     default: null,
    //     required: false
    // },
    // onKeyDown:{
    //     type: Function,
    //     default: null,
    //     required: false
    // },
    // onKeyPress:{
    //     type: Function,
    //     default: null,
    //     required: false
    // },
    // onKeyUp:{
    //     type: Function,
    //     default: null,
    //     required: false
    // },
    // onMouseDown: {
    //     type: Function,
    //     default: null,
    //     required: false
    // },
    // onMouseMove: {
    //     type: Function,
    //     default: null,
    //     required: false
    // },
    // onMouseOut: {
    //     type: Function,
    //     default: null,
    //     required: false
    // },
    // onMouseOver: {
    //     type: Function,
    //     default: null,
    //     required: false
    // },
    // onMouseUp: {
    //     type: Function,
    //     default: null,
    //     required: false
    // },
    // onWheel: {
    //     type: Function,
    //     default: null,
    //     required: false
    // },
    // 'v-model': {
    //     type: null,
    //     default: null,
    //     required: false
    // },
    // 'v-if': {
    //     type: Boolean,
    //     default: null,
    //     required: false
    // },
    // 'v-else': {
    //     type: Boolean,
    //     default: null,
    //     required: false
    // },
    // 'v-else-if': {
    //     type: Boolean,
    //     default: null,
    //     required: false
    // },
    // 'v-for': {
    //     type: String,
    //     default: null,
    //     required: false
    // },
    // 'v-show': {
    //     type: Boolean,
    //     default: null,
    //     required: false
    // },
    // 'v-bind': {
    //     type: Object,
    //     default: null,
    //     required: false
    // },
    // 'v-on': {
    //     type: Object,
    //     default: null,
    //     required: false
    // },
    // 'v-pre': {
    //     type: Boolean,
    //     default: null,
    //     required: false
    // },
    // 'v-cloak': {
    //     type: Boolean,
    //     default: null,
    //     required: false
    // },
    // 'v-once': {
    //     type: Boolean,
    //     default: null,
    //     required: false
    // },
});

const formAttributes: TFormAttributes = {} as TFormAttributes;

var formItems: ConfigItem[] = [] as ConfigItem[];

const defaultClass:string = 'form-control'; // default form class


const processFormItems =(formItems: unknown):void => {
    if (formItems === undefined || Array.isArray(formItems) === false || formItems.length === 0) {
        errorLog('Form "items" is required if there are no form components declared')
        return;
    }

    // formItems.forEach((formItem: ConfigItem) => {
        
    // })
}

const processFormAttributes = (config: Config):void => {

     // config properties takes priority over form attributes
     for (const [key, val] of Object.entries(config)) {
        if (isKeyOfType<TFormAttributes>(key, FormAttributeList) === true) {
            formAttributes[key] = val;
        }
    }
}

/**
 * process the config attribute passed
 * config properties takes priority over inline attributes declaration of the component
 */
const processConfig = (config: unknown):void => {   

    if (typeof config !== 'object' || config === null) {
        errorLog('Prop "config" is required, and it should be an object')
        return;
    }

    if (typeCheck<Config>(config, ['items']) === false) {
        errorLog('Prop "config" is required, and it should be an object')
        return;
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