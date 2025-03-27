import { Model } from "objectmodel";
import { makeAutoObservable } from "mobx";
import { localeIsoNames } from "@/utils/media-packager/isoLocales";

const LocalizationModel = Model({
    art_reference: Array,
    copyright: [String, null],
    genres: [Array, null],
    is_default: Boolean,
    locale: String,
    original_title: String,
    summary_190: String,
    summary_400: String,
    summary_4000: String,
    title: String,
    title_sort: String
})
    .assert(
        f => !f.locale || Object.keys(localeIsoNames).includes(f.locale),
        `locale must be one of: ${Object.keys(localeIsoNames).join(", ")}`
    );

export class Localization extends LocalizationModel {
    constructor(data = {}) {
        super(data);
        makeAutoObservable(this);
    }

    isDefault() {
        return this.is_default === true || this.locale === "en-US";
    }

    getSummary() {
        return this.summary_400 || this.summary_190 || "No summary available.";
    }
}