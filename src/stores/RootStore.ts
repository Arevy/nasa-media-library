import { NASAStore } from "./NASAStore";


export class RootStore {
    nasaStore: NASAStore;

    constructor() {
        this.nasaStore = new NASAStore(this);
    }
}
