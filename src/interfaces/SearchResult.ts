export interface SearchResult {
    title: string;
    nasa_id: string;
    description: string;
    media_type: string;
}

export interface NASASearchResult {
    data: [{
        title: string;
        description: string;
        location?: string;
        photographer?: string;
        // ... other fields
    }];
    links: [{
        href: string;
        // ... other fields
    }];
    // ... other fields
}
