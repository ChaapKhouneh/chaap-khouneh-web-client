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
            <p class="row">
                <small>هزینهٔ کل خدمات</small> {{ englishToPersianNumbers(pricesComputed.print.cost +
                    pricesComputed.bounding.cost) }}
            </p>
            <button class="continue" @click="nextStep">
                ثبت و ادامه
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { calculatePrices } from '../../../../assets/js/monary';
import { useStore } from '../../../../state';
import { englishToPersianNumbers } from '../../../../assets/js/translate';
import { ORDER_STEP } from '../../../../assets/js/enums';

const store = useStore();
const pricesComputed = computed(() => {
    const prices = calculatePrices(store.files);
    return prices;
})

const nextStep = () => {
    store.orderStep = ORDER_STEP.REVIEW_ORDER;
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

    .total, .properties{
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