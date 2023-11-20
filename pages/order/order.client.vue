<template>
    <div class="component-order-client">
        <SmartStepper />
        <!-- <Transition> -->
        <SmartOrderReciever v-if="store.orderStep === 1" />
        <SmartOrderReview v-else-if="store.orderStep === 2" />
        <SmartOrderAddress v-else-if="store.orderStep === 3" />
        <!-- </Transition> -->
    </div>
</template>

<script lang="ts" setup>
import { ORDER_STEP } from '../../assets/js/enums';
import { useStore } from '../../state';
import SmartStepper from '../../components/smart/stepper/SmartStepper.vue';
import SmartOrderReciever from '../../components/smart/orderReceiver/SmartOrderReciever.vue';
import SmartOrderReview from '../../components/smart/orderReview/SmartOrderReview.vue';
import SmartOrderAddress from '../../components/smart/orderAddress/SmartOrderAddress.vue';

const store = useStore();

setTimeout(() => {
    if (store.orderStep === ORDER_STEP.GREETINGS) {
        location.href = '/';
    }
}, 1000);
</script>
  
<style lang="scss">
.component-order-client {
    min-height: 100%;
    display: flex;
    flex-direction: column;

    // .v-enter-active,
    // .v-leave-active {
    //     transition: opacity 0.5s ease;
    // }

    // .v-enter-from,
    // .v-leave-to {
    //     opacity: 0;
    // }
}
</style>
  