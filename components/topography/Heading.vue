<script setup lang="ts">
interface IProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  tag?: string;
}

defineProps<IProps>();

const classesMap: {
  [key: number]: string;
} = {
  1: 'text-4xl md:text-5xl font-bold',
  2: 'text-3xl md:text-4xl font-bold',
  3: 'text-2xl md:text-3xl font-bold',
  4: 'text-xl md:text-2xl font-bold',
  5: 'text-lg md:text-xl font-bold',
  6: 'text-base md:text-lg font-bold',
};
</script>

<template>
  <component
    :class="{
      [classesMap[level]]: true,
      'block': tag === 'span',
    }"
    :is="tag || `h${level}`"
  >
    <slot/>
  </component>
</template>