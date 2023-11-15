<template>
    <div class="smart-order-receiver-price">
        <div class="properties">
            <p class="row">
                <small>هزینهٔ چاپ</small> {{ englishToPersianNumbers(pricesComputed.print.cost) }} <small>({{
                    englishToPersianNumbers(pricesComputed.print.count) }}
                    صفحه)</small>
            </p>
            <p class="row">
                <small>هزینهٔ صحافی</small> {{ englishToPersianNumbers(pricesComputed.bounding.cost) }} <small>({{
                    englishToPersianNumbers(pricesComputed.bounding.count) }}
                    عدد)</small>
            </p>
        </div>
        <div class="total">
            <small>هزینهٔ کل خدمات</small> {{ englishToPersianNumbers(pricesComputed.print.cost) }}
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { calculatePrices } from '../../../../assets/js/monary';
import { useStore } from '../../../../state';
import { englishToPersianNumbers } from '../../../../assets/js/translate';

const store = useStore();
const pricesComputed = computed(() => {
    const prices = calculatePrices(store.files);
    return prices;
})
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

    .total {
        color: var(--color-secondary);
    }
}</style>