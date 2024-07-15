<script setup lang="ts">
import type { Router } from "vue-router";

interface ComponentProps {
  color?: 'white';
}

withDefaults(defineProps<ComponentProps>(), {
  color: 'white',
});

const router: Router = useRouter();

const clickHandler = (): void => {
  router.go(-1);
};
</script>

<template>
  <div
    @click="clickHandler"
    class="flex space-x-2 items-center cursor-pointer group w-max"
  >
    <svg
      class="group-hover:-translate-x-2 relative transition ease-in-out"
      :class="{
        'text-white group-hover:text-gray-200': color === 'white',
      }"
      width="20px"
      height="20px"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path
          d="M10.1,23a1,1,0,0,0,0-1.41L5.5,17H29.05a1,1,0,0,0,0-2H5.53l4.57-4.57A1,1,0,0,0,8.68,9L2.32,15.37a.9.9,0,0,0,0,1.27L8.68,23A1,1,0,0,0,10.1,23Z"
          class="fill-current"
        />
      </g>
    </svg>

    <span
      :class="{
        'text-white group-hover:text-gray-200': color === 'white',
      }"
    >
      <slot/>
    </span>
  </div>
</template>