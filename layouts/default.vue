<script setup lang="ts">
import Header from "@/components/layouts/default/Header.vue";
import Footer from "@/components/layouts/default/Footer.vue";
</script>

<template>
  <Head>
    <Meta
      name="viewport"
      content="width=device-width, initial-scale=1, maximum-scale=1"
    />
  </Head>

  <Header/>

  <slot></slot>

  <Footer/>
</template>