<script setup lang="ts">
import type { PostCardData } from "@/services/contentful/types/controllers/blog/post/list-controller.d.ts";
import BlogAuthorCard from "@/components/blog/common/AuthorCard.vue";
import { useFormatDate } from "@/composables/useDate.ts";
import { useWsrvImage } from "@/composables/useWsrv.ts";

interface ComponentProps {
  post: PostCardData;
}

defineProps<ComponentProps>();
</script>

<template>
  <div
    class="block group w-full border border-gray-300 rounded-2xl relative hover:bg-gray-100"
  >
    <NuxtLink
      :to="{ name: 'blog-slug', params: { slug: post.slug } }"
      class="w-full h-full absolute inset-0"
    />

    <div class="flex items-center">
      <img
        :src="useWsrvImage({ imageUrl: post.image_url, width: 380 })"
        :srcset="`${useWsrvImage({ imageUrl: post.image_url, width: 760 })} 2x`"
        :alt="post.name"
        class="rounded-t-2xl w-full min-h-[200px] md:min-h-[220px]"
      >
    </div>

    <div class="p-4 lg:p-6 transition-all duration-300 rounded-b-2xl">
      <div class="w-full flex justify-between items-center mb-5">
        <BlogAuthorCard
          :author="post.author"
        />

        <span class="text-gray-900 font-medium block">
          {{ useFormatDate(post.published_at) }}
        </span>
      </div>

      <h4 class="text-xl text-gray-900 font-medium leading-8 mb-3">
        {{ post.name }}
      </h4>

      <p class="text-gray-500 leading-6 mb-10">
        {{ post.description }}
      </p>
    </div>
  </div>
</template>