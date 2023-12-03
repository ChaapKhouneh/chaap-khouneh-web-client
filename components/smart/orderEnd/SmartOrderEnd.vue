<template>
    <div class="smart-order-end">
        <img src="/img/delivery.png" alt="">
        <p>از خرید شما سپاسگزاریم.</p>
        <p>منتظر تماس (پیام) همکاران ما باشید.</p>
        <p>در سریع‌ترین زمان ممکن، سفارش شما را به دست‌تان می‌رسانیم.</p>
        <div class="payment-authority">
            <small>شناسهٔ سفارش</small> {{ paymentAuthority }}
        </div>
        <button class="reset" @click="resetOrder">شروع سفارش جدید</button>
        <button class="exit" @click="exitOrder">خروج</button>
    </div>
</template>

<script lang="ts" setup>
import { useStore } from '../../../state';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { englishToPersianNumbers } from '../../../assets/js/translate';
import { ORDER_STEP } from '../../../assets/js/enums';
import { inject } from 'vue';

const isLoading = inject('isLoading');

const store = useStore();
const { paymentAuthority } = store.orderInfo;

const resetOrder = () => {
    store.files = [];
    store.orderStep = ORDER_STEP.SELECT_FILES;
}

const exitOrder = () => {
    isLoading.value = true;

    store.orderStep = ORDER_STEP.GREETINGS;
    store.files = [];

    setTimeout(() => {
        isLoading.value = false;
        location.href = '/';
    }, 1000);
}
</script>

<style lang="scss" scoped>
.smart-order-end {
    flex: 0px 1 1;
    padding: 20px 20px 40px 20px;
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    row-gap: 10px;

    img {
        filter: brightness(0) saturate(100%) invert(44%) sepia(94%) saturate(2221%) hue-rotate(233deg) brightness(91%) contrast(88%);
    }

    .payment-authority {
        border: solid thin var(--color-primary);
        color: var(--color-primary);
        padding: 5px 10px;
        border-radius: 10px;
        margin-bottom: 30px;
    }

    .reset {
        height: 35px;
        border: none;
        cursor: pointer;
        padding: 0 15px;
        border-radius: 17.5px;
        background-color: var(--color-secondary);
        color: #fff;
        font-weight: 700;
    }

    .exit {
        height: 35px;
        border: none;
        cursor: pointer;
        padding: 0 15px;
        border-radius: 17.5px;
        background-color: white;
        border: solid thin var(--color-secondary);
        color: var(--color-secondary);
        font-weight: 700;
    }
}
</style>