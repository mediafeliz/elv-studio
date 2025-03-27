import { Model } from "objectmodel";
import { makeAutoObservable } from "mobx";

const RatingModel = Model({
    country: String,
    rating: String,
    rating_reason: String,
    rating_system: String
});

export class Rating extends RatingModel {
    constructor(data = {}) {
        super(data);
        makeAutoObservable(this);
    }

    isRated() {
        return !!this.rating;
    }

    getLabel() {
        return `${this.country} - ${this.rating || "Unrated"}`;
    }
}
