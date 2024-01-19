export interface SearchResult {
  title: string;
  nasa_id: string;
  description: string;
  media_type: string;
}

export interface NASASearchResult {
  data: [
    {
      date_created: string | number | Date;
      keywords: any;
      nasa_id?: string;
      title: string;
      description: string;
      location?: string;
      photographer?: string;
      // ... other fields
    }
  ];
  links: [
    {
      href: string;
      // ... other fields
    }
  ];
  additionalData?: any; // Add this line to include additional data
  // ... other fields
}

export type AssetMetadata = {
  title: string;
  description: string;
  nasa_id: string;
  date_created: string;
  media_type: string;
  imageUrl: string;
  // Include other metadata properties as needed
};

export type AssetFile = {
  href: string;
};

export type ItemDetails = {
  metadata: AssetMetadata;
  files: AssetFile[];
};
