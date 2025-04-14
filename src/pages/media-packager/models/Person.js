import { Model } from "objectmodel";
import { makeAutoObservable } from "mobx";

export const PersonLocalizationModel = Model({
    locale: [String, null],
    name_display: [String, null],
    character: [String, null]
});

const PersonModel = Model({
    job: String,
    localizations: [Array.of(PersonLocalizationModel)],
    name_family: [String, null],
    name_given: [String, null],
    order: [Number, null]
});

export class Person extends PersonModel {
    constructor(data = {}) {
        super(data);
        makeAutoObservable(this);
    }
}