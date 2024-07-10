import type { IMeta } from "@/services/contentful/controllers/meta.ts";
import { gql } from 'graphql-request';
import contentfulClient from "@/services/contentful/client.ts";

export interface IBlogAuthorCard {
  name: string;
  slug: string;
  image_url: string;
  position?: string;
}

export interface IBlogAuthorPage extends IBlogAuthorCard {
  meta: IMeta;
  about?: string;
  background_url?: string;
}

export const getBlogAuthor = async (slug: string): Promise<IBlogAuthorPage> => {
  interface IBlogAuthorData {
    blogAuthorCollection: {
      items: IBlogAuthorItemData[];
    };
  }

  interface IBlogAuthorItemData {
    name: string;
    slug: string;
    avatar: IImage;
    meta: IMeta;
    position?: string;
    about?: IAbout;
    background?: IImage;
  }

  interface IMeta {
    title: string;
    description: string;
    indexable: boolean;
    image: IImage;
  }

  interface IAbout {
    json: {
      data: object;
      content: IAboutContentElementData[];
      nodeType: 'document';
    }
  }

  interface IAboutContentElementData {
    data: object;
    content: IAboutContentElementContentData[];
    nodeType: 'paragraph';
  }

  interface IAboutContentElementContentData {
    data: object;
    marks: [];
    value: string;
    nodeType: 'text';
  }

  interface IImage {
    url: string;
  }

  const query = gql`
    query {
        blogAuthorCollection(
            where: {
                slug: "${slug}"
            }
        ) {
            items {
                name
                slug
                position
                about {
                    json
                }
                avatar {
                    url
                }
                meta {
                    title
                    description
                    indexable
                    image {
                        url
                    }
                }
                background {
                    url
                }
            }
        }
    }
  `;

  const data: IBlogAuthorItemData = (await contentfulClient<IBlogAuthorData>(query)).blogAuthorCollection.items[0];

  let about: string | null = null;

  if (data.about?.json) {
    about = data
      .about
      .json
      .content
      .map((element: IAboutContentElementData): string => {
        return element
          .content
          .map((contentElement: IAboutContentElementContentData): string => contentElement.value)
          .join('<br>');
      })
      .join('<br><br>');
  }

  return {
    name: data.name,
    slug: data.slug,
    image_url: data.avatar.url,
    position: data.position,
    about: about as string | undefined,
    background_url: data.background?.url,
    meta: {
      title: data.meta.title,
      description: data.meta.description,
      indexable: data.meta.indexable,
      image_url: data.meta.image.url,
    }
  };
};