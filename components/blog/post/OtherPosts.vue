<script setup lang="ts">
import type { Ref } from "vue";
import type { PostCardData } from "@/services/contentful/types/controllers/blog/post/list-controller.d.ts";
import BlogListCard from "@/components/blog/list/Card.vue";
import BlogCardListGrid from "@/components/blog/list/CardGrid.vue";
import TopographyHeading from "@/components/topography/Heading.vue";
import { getBlogPosts } from "~/services/contentful/controllers/blog/post/list-controller.ts";

interface ComponentProps {
  exceptedSlugs?: string[];
}

const props = defineProps<ComponentProps>();

const {
  data: posts,
}: {
  data: Ref<PostCardData[]>;
} = await useAsyncData(
  `other-posts-${props.exceptedSlugs?.join(',')}`,
  async (): Promise<PostCardData[]> => await getBlogPosts({
    exceptedSlugs: props.exceptedSlugs,
    limit: 3,
  }),
);
</script>

<template>
  <section class="mb-12 md:mb-20">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <TopographyHeading
        :level="2"
        tag="span"
        class="mb-12 text-center"
      >
        You also might be interested in
      </TopographyHeading>

      <BlogCardListGrid>
        <BlogListCard
          v-for="post in posts"
          :post="post"
          :key="post.slug"
        />
      </BlogCardListGrid>
    </div>
  </section>
</template>