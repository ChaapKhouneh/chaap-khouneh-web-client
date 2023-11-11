<template>
    <div class="smart-order-receiver">
        <header class="actions">
            <button class="button-primary" @click="addFile">+ افزودن سند جدید</button>
            <button class="button-secondary">🗑</button>
        </header>
        <main class="orders-list">
            orders
        </main>
        <footer class="calculations">
            calculations
        </footer>
    </div>
</template>

<script lang="ts" setup>
import { useStore } from '../../../state';
import selectFiles from 'select-files';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const store = useStore();
const addFile = () => {
    selectFiles({ accept: 'image/*', capture: 'camera' }).then(files => {
        console.log(files);
        toast.info("آپلود شد", {
            autoClose: 2000,
        });
    });
}
</script>
  
<style lang="scss" scoped>
.smart-order-receiver {
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    .actions {
        display: flex;
        flex-direction: row-reverse;
        column-gap: 10px;
        margin-top: 10px;
        padding: 10px;

        // background-color: red;
        button {
            height: 35px;
            border: none;
            background-color: white;
            cursor: pointer;

            &.button-primary {
                padding: 0 15px;
                border-radius: 17.5px;
                background-color: var(--color-secondary);
                color: white;
            }

            &.button-secondary {
                border-radius: 50%;
                width: 35px;
                border: solid thin var(--color-secondary);
                color: var(--color-secondary);
            }
        }
    }

    .orders-list {
        flex-grow: 1;
        // background-color: blue;
        box-shadow: inset 0px 0px 20px -4px #3189CE;
    }

    .calculations {
        // background-color: red;
    }
}
</style>
  