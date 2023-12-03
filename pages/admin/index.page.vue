<template>
    <ClientOnly>
        <SmartAdminAuthorizer />
    </ClientOnly>
</template>

<script lang="ts" setup>
// import ApolloClient from 'apollo-boost';
// import gql from 'graphql-tag';
import ClientOnly from '../../components/base/ClientOnly.vue';
import SmartAdminAuthorizer from '../../components/smart/adminAuthorizer/SmartAdminAuthorizer.vue';

// const client = new ApolloClient({
//   uri: '/api/graphql'
// });

// const test = await client
//   .query({
//     query: gql`
//     query Query {
//       users {
//         name
//       }  
//     }
//   `,
//   });

// console.log({ test });
</script>