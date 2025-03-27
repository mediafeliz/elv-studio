import { Model } from "objectmodel";
import { makeAutoObservable } from "mobx";

const ReleaseDateModel = Model({
    country: String,
    date: String,
    id: String,
    type: String
});

export class ReleaseDate extends ReleaseDateModel {
    constructor(data = {}) {
        super(data);
        makeAutoObservable(this);
    }

    getLabel() {
        return `${this.country} - ${this.type} (${this.date})`;
    }

    isFuture() {
        return new Date(this.date) > new Date();
    }
}