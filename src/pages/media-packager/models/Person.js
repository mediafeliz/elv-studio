import { Model } from "objectmodel";
import { makeAutoObservable } from "mobx";

// const PersonLocalizationModel = Model({
//     locale: String,
//     name_display: String
// });

const PersonModel = Model({
    character: String,
    job: String,
    localizations: [Array],
    name_family: String,
    name_given: String,
    order: String
});

export class Person extends PersonModel {
    constructor(data = {}) {
        super(data);
        makeAutoObservable(this);
    }

    isActor() {
        return this.job === "Actor";
    }

    getDisplayName() {
        const loc = this.localizations?.[0];
        return loc?.name_display || this.name_given || "Unknown";
    }
}