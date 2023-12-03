import { defineStore } from 'pinia'
import { ORDER_STEP } from '../assets/js/enums';
// import localForage from "localforage";

let _definedStore = undefined;

export const useStore = () => {
    if (!_definedStore) {
        // localForage.config({
        //     driver: localForage.INDEXEDDB, // This force IndexedDB as the driver
        // });
        _definedStore = defineStore('store', {
            state: () => {
                return {
                    isLoading: false,
                    orderStep: ORDER_STEP.GREETINGS,
                    files: [],
                    addressInfo: {},
                    orderInfo: {
                        paymentAuthority: undefined,
                    },
                }
            },
            // persist: {
            //     storage: localForage,
            // },
        })
    }
    return _definedStore();
}