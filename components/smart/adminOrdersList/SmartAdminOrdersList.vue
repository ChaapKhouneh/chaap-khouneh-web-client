<template>
    test
</template>

<script lang="ts" setup>
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

const client = new ApolloClient({
  uri: '/api/graphql'
});

const test = await client
  .query({
    query: gql`
    query Query {
      users {
        name
      }  
    }
  `,
  });

console.log({ test });
</script>