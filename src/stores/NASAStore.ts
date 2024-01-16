import { action, observable, runInAction } from "mobx";
import { NASASearchResult } from "../interfaces/SearchResult";
import { RootStore } from "./RootStore";

export class NASAStore {
    rootStore: RootStore;
    @observable searchResults: NASASearchResult[] = [];
    @observable isLoading = false;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        // Rest of the store implementation
    }

    @action.bound setIsLoading(value: boolean) {
        this.isLoading = value;
    }

    @action.bound setSearchResults(value: NASASearchResult[]) {
        this.searchResults = value;
    }

    async search(query: string, yearStart?: string, yearEnd?: string) {
        try {
            // Construct the URL with additional parameters
            let url = `https://images-api.nasa.gov/search?q=${query}`;
            if (yearStart) url += `&year_start=${yearStart}`;
            if (yearEnd) url += `&year_end=${yearEnd}`;

            this.setIsLoading(true);
            const response = await fetch(url);
            const data = await response.json();
            console.log("1", data.collection.items.lenght, this.isLoading, query);

            runInAction(() => {
                // this.setSearchResults(data.collection.items);
                this.searchResults = data.collection.items;
                this.setIsLoading(false);

                console.log(
                    "2",
                    data.collection.items.lenght,
                    this.searchResults.length,
                    this.isLoading,
                    query
                );
            });
            console.log(
                "3",
                data.collection.items.lenght,
                this.searchResults.length,
                this.isLoading,
                query
            );
            return this.searchResults;
        } catch (error) {
            console.error("Failed to fetch data:", error);
            runInAction(() => {
                this.setIsLoading(false);
                // this.setSearchResults([]);
            });
        }
    }
}
