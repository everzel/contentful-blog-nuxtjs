class WeservImages {
  private readonly imageUrl: string;
  private readonly baseUrl: string;

  private options: Record<string, any>;

  constructor(
    imageUrl: string,
    baseUrl: string,
  ) {
    this.imageUrl = imageUrl;
    this.baseUrl = baseUrl;
    this.options = {};
  }

  static make(
    imageUrl: string,
    baseUrl: string
  ): WeservImages {
    return new WeservImages(imageUrl, baseUrl);
  }

  toUrl(): string {
    this.options = Object.assign(this.options, {
      url: encodeURIComponent(this.imageUrl),
    });

    const queryString: string = Object
      .keys(this.options)
      .map((key: string) => {
        return `${key}=${this.options[key]}`;
      })
      .join('&');

    return `${this.baseUrl}?${queryString}`;
  }

  set(option: string, value: any): this {
    this.options[option] = value;

    return this;
  }

  w(width: number): this {
    return this.set('w', width);
  }

  h(height: number): this {
    return this.set('h', height);
  }

  output(output: 'jpg' | 'png' | 'gif' | 'tiff' | 'webp' | 'json'): this {
    return this.set('output', output);
  }

  q(q: number): this {
    return this.set('q', q);
  }

  hq(): this {
    return this.q(100);
  }
}

export const weserv = (imageUrl: string): WeservImages => {
  const config: {
    appUrl: string;
    weservBaseUrl: string;
  } = useRuntimeConfig().public;

  const addDomainIfMissing = (imageUrl: string): string => {
    const regex = /^(http:\/\/|https:\/\/)/;

    if (!regex.test(imageUrl)) {
      return `${config.appUrl}${imageUrl}`;
    }

    return imageUrl;
  }

  imageUrl = addDomainIfMissing(imageUrl);

  return WeservImages.make(imageUrl, config.weservBaseUrl);
};

export interface IWeservImageParams {
  imageUrl: string;
  width: number;
  height?: number;
  quality?: number;
}

export const weservImage = (params: IWeservImageParams): string => {
  let imageInstance: WeservImages = weserv(params.imageUrl)
    .w(params.width)
    .output('webp');

  if (params.height) {
    imageInstance = imageInstance.h(params.height);
  }

  if (params.quality) {
    imageInstance = imageInstance.q(params.quality);
  } else {
    imageInstance = imageInstance.hq();
  }

  return imageInstance.toUrl();
};
