import { action, observable, runInAction } from "mobx";
import { ItemDetails, NASASearchResult } from "../interfaces/SearchResult";
import { RootStore } from "./RootStore";

export class NASAStore {
  rootStore: RootStore;
  @observable searchResults: NASASearchResult[] = [];
  details: ItemDetails | null = null;
  @observable isLoading: boolean = false;
  @observable detailedItem: NASASearchResult | null = null;
  @observable isDetailReady: boolean = false;
  @observable lastSearchResults: NASASearchResult[] = [];

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

      console.log(
        "BEFORE !!yearStart",
        !!yearStart,
        "!!yearEnd",
        !!yearEnd,
        "query",
        query
      );
      if (!!yearStart) url += `&year_start=${yearStart}`;
      if (!!yearEnd) url += `&year_end=${yearEnd}`;
      console.log(
        "after !!yearStart",
        !!yearStart,
        "!!yearEnd",
        !!yearEnd,
        "query",
        query,
        "url",
        url
      );

      this.setIsLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      console.log("1", data.collection.items.lenght, this.isLoading, query);
      this.searchResults = data.collection.items;

      runInAction(() => {
        // this.setSearchResults(data.collection.items);
        this.searchResults = data.collection.items;
        this.setIsLoading(false);
        console.log("Search Results Set:", this.searchResults);
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

  @action setLastSearchResults = (results: NASASearchResult[]) => {
    this.lastSearchResults = results;
  };

  @action fetchDetails = async (nasaId: string) => {
    this.isLoading = true;
    this.isDetailReady = false;
    console.log("Fetching Details for:", nasaId);
    const cachedDetail = localStorage.getItem(`details-${nasaId}`);
    if (cachedDetail) {
      this.detailedItem = JSON.parse(cachedDetail);
      this.isDetailReady = true;
      return;
    }

    try {
      const response = await fetch(
        `https://images-api.nasa.gov/search?nasa_id=${nasaId}`
      );
      const data = await response.json();
      console.log("Fetch Details Response:", data);
      runInAction(() => {
        this.detailedItem = data.collection.items[0];
        this.isLoading = false;
        this.isDetailReady = true; // Set this to true after data is set
        console.log("Detailed Item Set:", this.detailedItem);
      });
    } catch (error) {
      runInAction(() => {
        console.error("Fetch Details Error:", error);
        this.isLoading = false;
        this.isDetailReady = false;
      });
    }
    localStorage.setItem(
      `details-${nasaId}`,
      JSON.stringify(this.detailedItem)
    );
  };
}
