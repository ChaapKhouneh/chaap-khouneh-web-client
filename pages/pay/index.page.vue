<template>
    <div class="page-pay">
        <ClientOnly>
            <PayClient />
        </ClientOnly>
    </div>
</template>

<script lang="ts" setup>
import ClientOnly from '../../components/base/ClientOnly.vue';
import PayClient from './pay.client.vue';
</script>
  
<style lang="scss" scoped>
.page-pay {
    min-height: 100%;
    display: flex;
    flex-direction: column;
}
</style>