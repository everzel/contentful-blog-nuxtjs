<script setup lang="ts">
import showdown from "showdown";

interface IProps {
  content: string;
}

const props = defineProps<IProps>();

const htmlContent: string = new showdown
  .Converter()
  .makeHtml(props.content);
</script>

<template>
  <section
    class="w-full max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto my-12 md:my-20 prose"
    v-html="htmlContent"
  >
  </section>
</template>