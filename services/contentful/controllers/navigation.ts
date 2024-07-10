import type { ILink } from "@/services/contentful/controllers/link.ts";
import type { ISocialLink } from "@/services/contentful/controllers/socialLink.ts";
import contentfulClient from "~/services/contentful/client.ts";
import { gql } from 'graphql-request';


export interface INavigation {
  links: ILink[];
  socialLinks: ISocialLink[];
}

export const getNavigation = async (slug: string): Promise<INavigation> => {
  interface INavigationData {
    navigationCollection: {
      items: INavigationItemData[];
    };
  }

  interface INavigationItemData {
    linksCollection: {
      items: INavigationLinkItemData[];
    };

    socialLinksCollection: {
      items: INavigationSocialLinkItemData[];
    };
  }

  interface INavigationLinkItemData {
    name: string;
    url: string;
  }

  interface INavigationSocialLinkItemData {
    type: 'Instagram' | 'Twitter (X)';
    url: string;
  }

  const query: string = gql`
      query {
          navigationCollection(where: { slug: "${slug}" }) {
              items {
                  linksCollection(limit: 50) {
                      items {
                          name
                          url
                      }
                  }

                  socialLinksCollection(limit: 50) {
                      items {
                          type
                          url
                      }
                  }
              }
          }
      }
  `;

  const data: INavigationItemData = (await contentfulClient<INavigationData>(query)).navigationCollection.items[0];

  return {
    links: data
      .linksCollection
      ?.items
      ?.map((link: INavigationLinkItemData): ILink => ({
        name: link.name,
        url: link.url,
      })) || [],

    socialLinks: data
      .socialLinksCollection
      ?.items
      ?.map((link: INavigationSocialLinkItemData): ISocialLink => ({
        type: link.type,
        url: link.url,
      })) || [],
  };
}