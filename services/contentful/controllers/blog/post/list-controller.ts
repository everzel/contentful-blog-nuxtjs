import type {
  GetBlogPostsParams,
  PostCardData,
  PostContentfulData,
  PostContentfulItemData,
} from "@/services/contentful/types/controllers/blog/post/list-controller.d.ts";

import contentfulClient from "@/services/contentful/client.ts";
import { gql } from "graphql-request";

export const getBlogPosts = async (params: GetBlogPostsParams = {}): Promise<PostCardData[]> => {
  const exceptedSlugs: string = JSON.stringify(params.exceptedSlugs ?? []);
  const limit: number = params.limit || 99;

  const query: string = gql`
      query {
          blogPostCollection(
              where: {
                  slug_not_in: ${exceptedSlugs},
                  ${ params.authorSlug ? `author: { slug: "${params.authorSlug}" }` : '' }
              },
              limit: ${limit},
              order: publishedAt_DESC
          ) {
              items {
                  name
                  slug
                  description
                  publishedAt
                  author {
                      name
                      slug
                      position
                      avatar {
                          url
                      }
                  }
                  image {
                      url
                  }
              }
          }
      }
  `;

  const data: PostContentfulItemData[] = (await contentfulClient<PostContentfulData>(query))
    .blogPostCollection
    .items;

  return data
    .map((item: PostContentfulItemData): PostCardData => ({
      name: item.name,
      slug: item.slug,
      description: item.description,
      published_at: item.publishedAt,
      author: {
        name: item.author.name,
        slug: item.author.slug,
        position: item.author.position,
        image_url: item.author.avatar.url
      },
      image_url: item.image.url,
    }));
};