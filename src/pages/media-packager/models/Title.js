import { Model } from "objectmodel";
import { makeAutoObservable } from "mobx";

const TitleModel = Model({
    scheme: String,
    title: String,
    identifier: String,
    partner_alias: String,
    distributor: String,
    release_date: String,
    country_of_origin: String,
    original_spoken_locale: String
});

export class Title extends TitleModel {
    constructor(data = {}) {
        super(data);
        makeAutoObservable(this);
    }

    isReleased() {
        return !!this.release_date;
    }

    getLabel() {
        return `${this.title} (${this.original_spoken_locale.toUpperCase()})`;
    }
}
