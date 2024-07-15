<script setup lang="ts">
import type { Ref } from "vue";
import type { PostCardData } from "@/services/contentful/types/controllers/blog/post/list-controller.d.ts";
import BlogCardListGrid from "@/components/blog/list/CardGrid.vue";
import BlogListCard from "@/components/blog/list/Card.vue";
import Heading from "@/components/topography/Heading.vue";
import { getBlogPosts } from "@/services/contentful/controllers/blog/post/list-controller.ts";

interface ComponentProps {
  authorSlug: string;
}

const props = defineProps<ComponentProps>();

const {
  data: posts,
}: {
  data: Ref<PostCardData[]>;
} = await useAsyncData(
  `author-posts-${props.authorSlug}`,
  async (): Promise<PostCardData[]> => await getBlogPosts({
    authorSlug: props.authorSlug,
  }),
);
</script>

<template>
  <div class="w-full max-w-7xl mx-auto px-6 md:px-8 mb-8">
    <Heading
      :level="2"
      tag="span"
      class="mb-6 md:mb-8 text-center md:text-left"
    >
      Author's posts
    </Heading>

    <BlogCardListGrid>
      <BlogListCard
        v-for="post in posts"
        :post="post"
        :key="post.slug"
      />
    </BlogCardListGrid>
  </div>
</template>