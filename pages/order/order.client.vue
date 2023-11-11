<template>
    <div class="component-order-client">
        <SmartStepper/>
        <SmartOrderReciever/>
    </div>
</template>

<script lang="ts" setup>
import { ORDER_STEP } from '../../assets/js/enums';
import { useStore } from '../../state';
import SmartStepper from '../../components/smart/stepper/SmartStepper.vue';
import SmartOrderReciever from '../../components/smart/orderReceiver/SmartOrderReciever.vue';

const store = useStore();
console.log(store.orderStep);

if (store.orderStep === ORDER_STEP.GREETINGS) {
    location.href = '/';
}
</script>
  
<style>
.component-order-client {
    min-height: 100%;
    display: flex;
    flex-direction: column;
}
</style>
  