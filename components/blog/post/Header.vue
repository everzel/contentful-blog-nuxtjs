<script setup lang="ts">
import type { PostPageData } from "@/services/contentful/types/controllers/blog/post/get-controller.d.ts";
import BlogAuthorCard from "@/components/blog/common/AuthorCard.vue";
import BackButton from "@/components/common/BackButton.vue";
import TopographyHeading from "@/components/topography/Heading.vue";
import { useFormatDate } from "@/composables/useDate.ts";
import { weservImage } from "@/services/weserv.ts";

interface ComponentProps {
  post: PostPageData;
}

defineProps<ComponentProps>();
</script>

<template>
  <section
    :style="{
        background: `url(${weservImage({ imageUrl: post.image_url, width: 1400 })}) no-repeat center center / cover`
      }"
    class="relative"
  >
    <div class="w-full h-full bg-black opacity-60 z-10 absolute inset-0"></div>

    <div class="w-full max-w-lg md:max-w-2xl lg:max-w-4xl px-8 lg:px-11 mx-auto max-md:px-4 pt-6 z-20 relative">
      <BackButton>
        Back
      </BackButton>
    </div>

    <div class="pt-28 pb-20">
      <div class="w-full max-w-lg md:max-w-2xl lg:max-w-4xl px-5 lg:px-11 mx-auto max-md:px-4 z-20 relative">
        <TopographyHeading
          :level="1"
          class="text-white leading-tight mb-8"
        >
          {{ post.name }}
        </TopographyHeading>

        <div class="flex items-center justify-between">
          <BlogAuthorCard
            :author="post.author"
            size="large"
            color="white"
            type="link"
          />

          <div class="flex items-center gap-5 text-white">
            <span>{{ useFormatDate(post.published_at) }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>