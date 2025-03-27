import { makeAutoObservable } from "mobx";
import { MediaPackage } from "@/pages/media-packager/models/MediaPackage";

class PackagerStore {
    mediaPackage = null;

    constructor(rootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }

    InitializeFromJSON(json) {
        try {
            this.mediaPackage = new MediaPackage(json);
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error("Failed to initialize MediaPackage:", error);
        }
    }

    UpdateTitleMetadata(titleData) {
        if (this.mediaPackage && this.mediaPackage.title) {
            this.mediaPackage.title.set(titleData);
        }
    }

    AddFile(fileData) {
        this.mediaPackage?.addFile(fileData);
    }

    AddLocalization(localizationData) {
        this.mediaPackage?.addLocalization(localizationData);
    }

    AddPerson(personData) {
        this.mediaPackage?.addPerson(personData);
    }

    AddRating(ratingData) {
        this.mediaPackage?.addRating(ratingData);
    }

    AddReleaseDate(releaseDateData) {
        this.mediaPackage?.addReleaseDate(releaseDateData);
    }

    Reset() {
        this.mediaPackage = null;
    }
}

export default PackagerStore;