import type { BasePostData, PostContentfulItemAuthorData } from "@/services/contentful/types/controllers/blog/post/common.d.ts";

export interface PostCardData extends BasePostData {
  description: string;
}

export interface GetBlogPostsParams {
  exceptedSlugs?: string[];
  authorSlug?: string;
  limit?: number;
}

export interface PostContentfulData {
  blogPostCollection: {
    items: PostContentfulItemData[];
  };
}

export interface PostContentfulItemData {
  name: string;
  slug: string;
  description: string;
  publishedAt: string;
  author: PostContentfulItemAuthorData;
  image: ImageContentfulData;
}