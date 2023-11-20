<template>
    <div class="smart-stepper">
        <hr />
        <div class="steps-container">
            <div class="step-item" :class="{ passed: index < currentStep, active: index === currentStep }"
                v-for="step, index in steps" :key="index">
                {{ englishToPersianNumbers(index + 1) }}
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { ORDER_STEP } from '../../../assets/js/enums';
import { englishToPersianNumbers } from '../../../assets/js/translate';
import { useStore } from '../../../state';

const store = useStore();

const steps = Object.keys(ORDER_STEP).filter(isNaN);
const stepsCount = Object.keys(ORDER_STEP).filter(isNaN).length;
const currentStep = computed(() => store.orderStep);
</script>
  
<style lang="scss" scoped>
.smart-stepper {
    position: relative;

    hr {
        position: absolute;
        width: 100%;
        right: 0;
        top: 19px;
        display: block;
        height: 1px;
        border: 0;
        border-top: 1px solid var(--color-primary);
        padding: 0;
    }

    .steps-container {
        position: relative;
        z-index: 10;
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 0 20px;

        .step-item {
            border: solid thin var(--color-primary);
            border-radius: 50%;
            color: var(--color-primary);
            background-color: white;
            width: 40px;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;

            &.active {
                background-color: var(--color-primary);
                color: white;
                border: dashed thin white;
            }

            &.passed {
                &::before {
                    content: '✔️';
                    position: absolute;
                    filter: brightness(0) saturate(100%) invert(50%) sepia(55%) saturate(2863%) hue-rotate(183deg) brightness(89%) contrast(78%);
                }
            }
        }
    }

}
</style>
  