<script setup lang="ts">
import type { IBlogPostCard } from "@/services/contentful/controllers/blogPost.ts";
import type { Ref } from "vue";
import BlogListCard from "@/components/blog/list/Card.vue";
import BlogCardListGrid from "@/components/blog/list/CardGrid.vue";
import TopographyHeading from "@/components/topography/Heading.vue";
import { getBlogPosts } from "@/services/contentful/controllers/blogPost.ts";

interface IProps {
  exceptedSlugs?: string[];
}

const props = defineProps<IProps>();

const {
  data: posts,
}: {
  data: Ref<IBlogPostCard[]>;
} = await useAsyncData(
  `other-posts-${props.exceptedSlugs?.join(',')}`,
  async (): Promise<IBlogPostCard[]> => await getBlogPosts({
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