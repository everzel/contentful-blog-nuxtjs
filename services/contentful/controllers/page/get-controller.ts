import type {
  PageContentfulData,
  PageContentfulItemData,
  PageItemData,
} from "@/services/contentful/types/controllers/page/get-controller.d.ts";

import { gql } from 'graphql-request';
import contentfulClient from "@/services/contentful/client.ts";

export const getPage = async (slug: string): Promise<PageItemData> => {
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

  const data: PageContentfulItemData = (await contentfulClient<PageContentfulData>(query))
    .pageCollection
    .items[0];

  return {
    meta: {
      title: data.meta.title,
      description: data.meta.description,
      image_url: data.meta.image.url,
      indexable: data.meta.indexable,
    },
  };
}