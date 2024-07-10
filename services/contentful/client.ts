export default async function contentfulClient<T>(query: string): Promise<T> {
  const config: {
    contentful: {
      spaceId: string;
      accessToken: string;
      environmentId: string;
    };
  } = useRuntimeConfig().public;

  const endpoint: string = `https://graphql.contentful.com/content/v1/spaces/${config.contentful.spaceId}/environments/${config.contentful.environmentId}`;

  const res: Response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.contentful.accessToken}`,
    },
    body: JSON.stringify({ query }),
  });

  const json: {
    data: T;
    errors?: object,
  } = await res.json();

  if (json.errors) {
    throw Error(`Request error: ${JSON.stringify(json.errors)}`);
  }

  return json.data;
}