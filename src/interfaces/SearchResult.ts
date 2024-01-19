export interface SearchResult {
  title: string;
  nasa_id: string;
  description: string;
  media_type: string;
}

export interface NASASearchResult {
  data: [
    {
      media_type: string;
      date_created: string | number | Date;
      keywords: any;
      nasa_id?: string;
      title: string;
      description: string;
      location?: string;
      photographer?: string;
    }
  ];
  links: [
    {
      href: string;
    }
  ];
  additionalData?: any;
}
