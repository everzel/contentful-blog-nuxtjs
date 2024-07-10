import type { IMeta } from "@/services/contentful/controllers/meta.ts";
import type { IBlogAuthorCard } from "@/services/contentful/controllers/blogAuthor.ts";
import { gql } from 'graphql-request';
import contentfulClient from "~/services/contentful/client.ts";

export interface IGetBlogPostsParams {
  exceptedSlugs?: string[];
  authorSlug?: string;
  limit?: number;
}

export interface IBlogPostCard extends IBaseBlogPost {
  description: string;
}

export interface IBlogPostPage extends IBaseBlogPost {
  meta: IMeta;
  content: string;
}

interface IBaseBlogPost {
  name: string;
  slug: string;
  author: IBlogAuthorCard;
  published_at: string;
  image_url: string;
}

export const getBlogPosts = async (params: IGetBlogPostsParams = {}): Promise<IBlogPostCard[]> => {
  interface IBlogPostsData {
    blogPostCollection: {
      items: IBlogPostsItemData[];
    };
  }

  interface IBlogPostsItemData {
    name: string;
    slug: string;
    description: string;
    publishedAt: string;
    author: IBlogPostsItemAuthorData;
    image: IImageData;
  }

  interface IBlogPostsItemAuthorData {
    name: string;
    slug: string;
    position: string;
    avatar: IImageData;
  }

  interface IImageData {
    url: string;
  }

  const exceptedSlugs = JSON.stringify(params.exceptedSlugs ?? []);
  const limit = params.limit ?? 99;

  //publishedAt_lte: "${new Date().toISOString()}"
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

  const data: IBlogPostsItemData[] = (await contentfulClient<IBlogPostsData>(query)).blogPostCollection.items;

  return data
    .map((item: IBlogPostsItemData): IBlogPostCard => ({
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

export const getBlogPost = async (slug: string): Promise<IBlogPostPage> => {
  interface IBlogPostData {
    blogPostCollection: {
      items: IBlogPostItemData[];
    };
  }

  interface IBlogPostItemData {
    name: string;
    slug: string;
    content: string;
    publishedAt: string;
    author: IBlogPostsItemAuthorData;
    meta: IBlogPostMetaData;
    image: IImageData;
  }

  interface IBlogPostsItemAuthorData {
    name: string;
    slug: string;
    position: string;
    avatar: IImageData;
  }

  interface IBlogPostMetaData {
    title: string;
    description: string;
    image: IImageData;
    indexable: boolean;
  }

  interface IImageData {
    url: string;
  }

  // publishedAt_lte: "${new Date().toISOString()}",
  const query: string = gql`
    query {
        blogPostCollection(
            where: { 
                slug: "${slug}",
            }
        ) {
            items {
                name
                slug
                content
                publishedAt
                author {
                    name
                    slug
                    position
                    avatar {
                        url
                    }
                }
                meta {
                    title
                    description
                    indexable
                    image {
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

  const data: IBlogPostItemData = (await contentfulClient<IBlogPostData>(query)).blogPostCollection.items[0];

  return {
    name: data.name,
    slug: data.slug,
    published_at: data.publishedAt,
    image_url: data.image.url,
    content: data.content,
    author: {
      name: data.author.name,
      slug: data.author.slug,
      position: data.author.position,
      image_url: data.author.avatar.url
    },
    meta: {
      title: data.meta.title,
      description: data.meta.description,
      image_url: data.meta.image.url,
      indexable: data.meta.indexable,
    },
  };
};