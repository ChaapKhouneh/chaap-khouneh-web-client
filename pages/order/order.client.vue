<template>
    <div class="component-order-client">
        <SmartStepper />
        <SmartOrderReciever v-if="store.orderStep === 1" />
        <SmartOrderReview v-if="store.orderStep === 2" />
    </div>
</template>

<script lang="ts" setup>
import { ORDER_STEP } from '../../assets/js/enums';
import { useStore } from '../../state';
import SmartStepper from '../../components/smart/stepper/SmartStepper.vue';
import SmartOrderReciever from '../../components/smart/orderReceiver/SmartOrderReciever.vue';
import SmartOrderReview from '../../components/smart/orderReview/SmartOrderReview.vue';

const store = useStore();

setTimeout(() => {
    if (store.orderStep === ORDER_STEP.GREETINGS) {
        location.href = '/';
    }
}, 1000);
</script>
  
<style>
.component-order-client {
    min-height: 100%;
    display: flex;
    flex-direction: column;
}
</style>
  