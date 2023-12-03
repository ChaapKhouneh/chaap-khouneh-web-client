<template>
    test
</template>

<script lang="ts" setup>
const urlParams = new URLSearchParams(window.location.search);
const key = urlParams.get('key');

if (key != '8vyr4yvheowifvweWFEVFWfvweyhfhvew') {
    location.href = '/';
}
</script>