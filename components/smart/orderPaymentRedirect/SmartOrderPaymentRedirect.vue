<template>
    test
</template>

<script lang="ts" setup>
import { useStore } from '../../../state';
const store = useStore();
const paymentAuthority = store.paymentAuthority;
if (!paymentAuthority) {
    store.orderStep--;
}
else {
    location.href = `/pay?authority=${paymentAuthority}`;
}
</script>