<template>
    <div class="smart-order-receiver-price">
        <div class="properties">
            <p class="row">
                <small>هزینهٔ خدمات</small> {{ englishToPersianNumbers(pricesComputed.print.cost +
                    pricesComputed.bounding.cost) }}
            </p>
            <p class="row">
                <small>هزینهٔ ارسال</small> {{ englishToPersianNumbers(35000) }} <small></small>
            </p>
        </div>
        <div class="total">
            <p class="row">
                <small>قابل پرداخت</small> {{ englishToPersianNumbers(pricesComputed.print.cost +
                    pricesComputed.bounding.cost + 35000) }}
            </p>
            <button class="continue" @click="nextStep">
                {{ continueTitle }} و پرداخت
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { calculatePrices } from '../../../../assets/js/monary';
import { useStore } from '../../../../state';
import { englishToPersianNumbers } from '../../../../assets/js/translate';
import loadingOverlay from 'vue-loading-overlay'
const { useLoading } = loadingOverlay;
import 'vue-loading-overlay/dist/css/index.css';

const { continueTitle } = defineProps(['continueTitle']);

const store = useStore();
const pricesComputed = computed(() => {
    const prices = calculatePrices(store.files);
    return prices;
})

const $loading = useLoading({
    // options
    isFullPage: true
});

const nextStep = () => {
    // store.orderStep++;

    const loader = $loading.show({
        // Optional parameters
    });
    // simulate AJAX
    const order = {
        files: store.files,
        addressInfo: store.addressInfo,
    }
    console.log(order);

    setTimeout(() => {
        loader.hide()
    }, 2000)
}
</script>

<style lang="scss" scoped>
.smart-order-receiver-price {
    display: flex;
    justify-content: space-between;
    padding: 10px 5px 30px 5px;
    color: var(--color-primary);
    font-weight: bold;

    small {
        font-weight: initial;
        font-size: xx-small;
    }

    .total,
    .properties {
        display: flex;
        flex-direction: column;
        row-gap: 5px;
    }

    .total {
        align-items: flex-end;

        p.row {
            color: var(--color-secondary);
        }

        .continue {
            height: 35px;
            border: none;
            cursor: pointer;
            padding: 0 15px;
            border-radius: 17.5px;
            background-color: var(--color-secondary);
            color: white;
            font-weight: bold;
        }
    }
}
</style>