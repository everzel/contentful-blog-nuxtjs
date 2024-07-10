import type { IMeta } from "@/services/contentful/controllers/meta.ts";
import { gql } from 'graphql-request';
import contentfulClient from "@/services/contentful/client.ts";

export interface IPage {
  meta: IMeta;
}

export const getPage = async (slug: string): Promise<IPage> => {
  interface IPageItemData {
    meta: {
      title: string;
      description: string;
      image: {
        url: string;
      };
      indexable: boolean;
    };
  }

  interface IPageData {
    pageCollection: {
      items: IPageItemData[];
    }
  }

  const query: string = gql`
      query {
          pageCollection(where: { slug: "${slug}" }) {
              items {
                  meta {
                      title
                      description
                      image {
                          url
                      }
                  }
              }
          }
      }
  `;

  const data: IPageItemData = (await contentfulClient<IPageData>(query)).pageCollection.items[0];

  return {
    meta: {
      title: data.meta.title,
      description: data.meta.description,
      image_url: data.meta.image.url,
      indexable: data.meta.indexable,
    },
  };
}