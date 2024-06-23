<script setup lang="ts">

import type {TConfig, TFormItem}  from '@/components/types/config';
import type { TFormAttributes } from '@/components/types/form';
import  FormAttributeList from '@/components/typeDefaults/form';
import { errorLog, warnLog, isType, isKeyOfType } from '@/helper';
import tagNameListArr from '@/assets/data/tagNameList.json';

// import InputComponent from '@components/InputComponent.vue';

const props = defineProps({
    config: {
        type: Object as () => TConfig,
        default: {} as TConfig,
        required: true
    },
});

// const formAttributes: Partial<TFormAttributes> = {} as Partial<TFormAttributes>;
const formAttributes:any = {};

// used to loop in the form items
const formItems: TFormItem[] = [];   

var defaultClass:string = 'form-control'; // default form class

const processFormItems = <T extends TFormItem[]>(formItems: T):void => {
    

    if (formItems === undefined || Array.isArray(formItems) === false || formItems.length === 0) {
        throw new Error('Form "items" is required if there are no form components declared')
    }

    if (isType<TFormItem[]>(formItems[0], ['tagName']) === false) {
        throw new Error('Form item property "tagName" is required')
    }

    formItems = [...formItems] as T;

    // set formItems global variable

    // formItems.forEach((formItem: unknown) => {
        
    //     if (isType<TFormItem>(formItem, ['tagName']) === false)
    //         throw new Error('Form item property "tagName" is required')

    //     if (tagNameListArr.includes(formItem.tagName) === false) 
    //         throw new Error('Form item property tagName "'+formItem.tagName+'" is not a valid tag name')

    //     if (isType<TFormItem>(formItem, ['name']) === false && ['input', 'select', 'textarea'].includes(formItem.tagName)) 
    //         throw new Error('Form item property "name" is required for input, select and textarea')

    //     switch(formItem.tagName) {
    //         case 'input':

    //             break;

    //         case 'select':

    //             break;

    //         case 'textarea':

    //             break;

    //         case 'label':

    //             break;

    //         case 'div':
    //             // for div, call again the process for items
    //             // wrap the items inside the div
    //             break;

    //         default:
    //             errorLog(`Config item tagName "${formItem.tagName}" is invalid`)
    //             return;
    //     }



    //     // @todo: process the form item
    //     // @todo: validate the form items, create different types according to what type the form item is. e.g. input[type=text], select, textarea, etc
    //     // @todo: process the form items by adding the form item components
    // });
}

const processFormAttributes = <T extends object = Readonly<TConfig>>(config: T):void => {

	let listOfUnknownAttributes: string[] = [];

     // config properties takes priority over form attributes
     for (const [key, val] of Object.entries(config)) {
        if (isKeyOfType<TFormAttributes>(key, FormAttributeList) === false) {
			if (typeof key !== 'string' || typeof val !== 'string') {
				throw new TypeError(`Form attribute "${key}" should be a string and it's value should be a string`)
			}

			listOfUnknownAttributes.push(key);
        } 
		
		// change default class if there is class key in the form attribute list
		if (key === 'class') {
			defaultClass = val;
		}

        // still add the form attribute even if it doesn't belong to the form attribute list
        formAttributes[key] = val;
    }

	if (listOfUnknownAttributes.length > 0) {
		warnLog(`Form attributes: ${listOfUnknownAttributes.join(', ')} are not known to the form component`)
	}

    // @todo: process the direct props of the form component, for now use props.config for the form attribs
}

/**
 * process the config attribute passed
 * config properties takes priority over inline attributes declaration of the component
 */
const processConfig = <T = Readonly<unknown>>(config: T):void => {   
    
    
    if (isType<TConfig>(config, ['name', 'items']) === false) {
        throw new Error('Prop "config.items" and "config.name" is required, and it should be an object')
    }

    processFormAttributes(config);
    
    // config items takes priority and change the formItems from component props
    if (config.items !== undefined && config.items.length > 0) {
        processFormItems<TFormItem[]>(config.items);
    }  
}

// process the config attribute passed first
processConfig(props.config);

</script>

<template>
    <form 
        v-bind="formAttributes"
        :class="defaultClass"
    >
        <template v-for="(formItem, index) in formItems" :key="index">
            <component :is="formItem.tagName" :attribute="formItem"/>
        </template>
    </form>
</template>

<style lang="scss" scoped></style>