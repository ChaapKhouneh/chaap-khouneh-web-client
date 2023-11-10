import { defineStore } from 'pinia'
import { ORDER_STEP } from '../assets/js/enums';

let _definedStore = undefined;

export const useStore = () => {
    if (!_definedStore) {
        _definedStore = defineStore('store', {
            state: () => {
                return {
                    orderStep: ORDER_STEP.GREETINGS,
                }
            },
            persist: true,
        })
    }
    return _definedStore();
}