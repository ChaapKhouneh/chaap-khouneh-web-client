<template>
    <div class="component-order-client">
        <!-- <Stepper/> -->
    </div>
</template>

<script lang="ts" setup>
import { ORDER_STEP } from '../../assets/js/enums';
import { useStore } from '../../state';

const store = useStore();
console.log(store);

if (store.orderStep === ORDER_STEP.GREETINGS) {
    location.href = '/';
}
</script>
  
<style>
.component-order-client {}
</style>
  