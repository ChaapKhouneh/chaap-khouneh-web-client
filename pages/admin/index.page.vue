<template>
    <ClientOnly>
        <SmartAdminAuthorizer />
        <SmartAdminOrdersList />
    </ClientOnly>
</template>

<script lang="ts" setup>
import ClientOnly from '../../components/base/ClientOnly.vue';
import SmartAdminAuthorizer from '../../components/smart/adminAuthorizer/SmartAdminAuthorizer.vue';
import SmartAdminOrdersList from '../../components/smart/adminOrdersList/SmartAdminOrdersList.vue';
</script>