import { makeAutoObservable } from "mobx";
import { FileEntry } from "./FileEntry";
import { Localization } from "./Localization";
import { ReleaseDate } from "./ReleaseDate";
import { Person } from "./Person";
import { Title } from "./Title";
import { Rating } from "./Rating";

export class MediaPackage {
    constructor({
        files_only_data = [],
        title_metadata = {},
        localizations = [],
        release_dates = [],
        ratings = [],
        people = []
    }) {
        this.files_only_data = files_only_data.map(f => new FileEntry(f));
        this.title_metadata = new Title(title_metadata);
        this.localizations = localizations.map(l => new Localization(l));
        this.release_dates = release_dates.map(d => new ReleaseDate(d));
        this.ratings = ratings.map(r => new Rating(r));
        this.people = people.map(p => new Person(p));

        makeAutoObservable(this);
    }

    getAudioTracks() {
        return this.files_only_data.filter(f => f.isAudio());
    }

    getSubtitleFiles() {
        return this.files_only_data.filter(f => f.isSubtitle());
    }

    getLocalizedTitles() {
        return this.localizations.map(loc => loc.title);
    }

    getDefaultLocalization() {
        return this.localizations.find(loc => loc.isDefault());
    }

    getReleaseDatesByCountry(countryCode) {
        return this.release_dates.filter(r => r.country === countryCode);
    }

    getCast() {
        return this.people.filter(p => p.isActor());
    }

    getPersonByRole(role) {
        return this.people.filter(p => p.job === role);
    }

    getRatingsByCountry(countryCode) {
        return this.ratings.filter(r => r.country === countryCode);
    }
}