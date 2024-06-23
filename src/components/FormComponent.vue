<script setup lang="ts">

import type {TConfig, TFormItem}  from '@/components/types/config';
import type { TFormAttributes } from '@/components/types/form';
import type { TComponentItem } from '@/components/types/component';
import  FormAttributeList from '@/components/typeDefaults/form';
import { warnLog, isType, isKeyOfType } from '@/helper';
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
const componentList: TComponentItem[] = [];   

var defaultClass:string = 'form-control'; // default form class

const processFormItems = <T extends TFormItem[]>(formItems: T):void => {
    

    if (formItems === undefined || Array.isArray(formItems) === false || formItems.length === 0) {
        throw new Error('Form "items" is required if there are no form components declared')
    }

    if (isType<TFormItem[]>(formItems[0], ['tagName']) === false) {
        throw new Error('Form item property "tagName" is required')
    }

    // set formItems global variable

    formItems.forEach((formItem: unknown) => {
        
        if (isType<TFormItem>(formItem, ['tagName']) === false)
            throw new Error('Form item property "tagName" is required')

        const tagName: string = formItem.tagName;

        if (tagNameListArr.includes(tagName) === false) 
            throw new Error(`Form item property tagName "${tagName}" is not a valid tag name`)

        if (isType<TFormItem>(formItem, ['name']) === false && ['input', 'select', 'textarea'].includes(tagName)) 
            throw new Error('Form item property "name" is required for input, select and textarea')

        let componentName:string = '';

        switch(formItem.tagName) {
            case 'input':
                componentName = 'InputComponent';
                break;

            case 'select':
                componentName = 'SelectComponent';
                break;

            case 'textarea':
                componentName = 'TextAreaComponent';
                break;

            // add one more for other components that will process other html tags

            default:
                throw new Error(`Config item tagName "${tagName}" is invalid`)
        }

        componentList.push({
            componentName: componentName,
            attributes: formItem
        });

        // @todo: process the form item
        // @todo: validate the form items, create different types according to what type the form item is. e.g. input[type=text], select, textarea, etc
        // @todo: process the form items by adding the form item components
    });
}

const processFormAttributes = <T extends object = Readonly<TConfig>>(config: T):void => {

	let listOfUnknownAttributes: string[] = [];

     // config properties takes priority over form attributes
     for (const [key, val] of Object.entries(config)) {
        if (isKeyOfType<TFormAttributes>(key, FormAttributeList) === false) {

            // items is an array of form items, should not check for key value string
            if (key === 'items' && Array.isArray(val)) 
                continue;

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
        <!-- @todo: process nested form items -->
        <template v-for="(componentItem, index) in componentList" :key="index">
            <component :is="componentItem.componentName" :attributes="componentItem.attributes"/>
        </template>
    </form>
</template>

<style lang="scss" scoped></style>