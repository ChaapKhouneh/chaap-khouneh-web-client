<template>
    <div class="page-order">
        <ClientOnly>
            <OrderClient/>
        </ClientOnly>
    </div>
</template>

<script lang="ts" setup>
import ClientOnly from '../../components/base/ClientOnly.vue';
import OrderClient from './order.client.vue';
</script>
  
<style>
</style>
  