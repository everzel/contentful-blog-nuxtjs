<script setup lang="ts">
import type { PostAuthorData } from "@/services/contentful/types/controllers/blog/post/common.d.ts";
import { useWsrvImage } from "@/composables/useWsrv.ts";

interface ComponentProps {
  author: PostAuthorData;
  size?: 'small' | 'large';
  color?: 'white' | 'black';
  type?: 'link' | 'block';
}

const props = withDefaults(defineProps<ComponentProps>(), {
  size: 'small',
  color: 'black',
  type: 'block',
});

const avatarUrl: string = props.size === 'small'
  ? useWsrvImage({ imageUrl: props.author.image_url, width: 40 })
  : useWsrvImage({ imageUrl: props.author.image_url, width: 50 });

const avatar2xUrl: string = props.size === 'small'
  ? useWsrvImage({ imageUrl: props.author.image_url, width: 80 })
  : useWsrvImage({ imageUrl: props.author.image_url, width: 100 });
</script>

<template>
  <NuxtLink
    v-if="type === 'link'"
    :to="{ name: 'blog-author-slug', params: { slug: author.slug } }"
    class="flex items-center group"
    :class="{
      'space-x-2': size === 'small',
      'space-x-4': size === 'large',
    }"
  >
    <img
      :src="avatarUrl"
      :srcset="`${avatar2xUrl} 2x`"
      :alt="author.name"
      class="rounded-full group-hover:opacity-70 transition-all"
      :class="{
        'w-10 h-10': size === 'small',
        'w-12 h-12': size === 'large',
      }"
    >

    <div
      class="flex flex-col"
      :class="{
        'text-white': color === 'white',
        'text-black': color === 'black',
      }"
    >
      <span
        class="font-medium group-hover:text-gray-300 transition-all"
        :class="{
          'text-base': size === 'small',
          'text-lg': size === 'large',
        }"
      >
        {{ author.name }}
      </span>

      <span
        v-if="author.position?.length"
        class="group-hover:text-gray-300 transition-all"
        :class="{
          'text-xs': size === 'small',
          'text-sm': size === 'large',
          'text-gray-100': color === 'white',
          'text-gray-900': color === 'black',
        }"
      >
        {{ author.position }}
      </span>
    </div>
  </NuxtLink>

  <div
    v-if="type === 'block'"
    class="flex items-center"
    :class="{
      'space-x-2': size === 'small',
      'space-x-4': size === 'large',
    }"
  >
    <img
      :src="avatarUrl"
      :srcset="`${avatar2xUrl} 2x`"
      :alt="author.name"
      class="rounded-full"
      :class="{
        'w-10 h-10': size === 'small',
        'w-12 h-12': size === 'large',
      }"
    >

    <div
      class="flex flex-col"
      :class="{
        'text-white': color === 'white',
        'text-black': color === 'black',
      }"
    >
      <span
        class="font-medium transition-all"
        :class="{
          'text-base': size === 'small',
          'text-lg': size === 'large',
        }"
      >
        {{ author.name }}
      </span>

      <span
        v-if="author.position?.length"
        class="transition-all"
        :class="{
          'text-xs': size === 'small',
          'text-sm': size === 'large',
          'text-gray-100': color === 'white',
          'text-gray-900': color === 'black',
        }"
      >
        {{ author.position }}
      </span>
    </div>
  </div>
</template>