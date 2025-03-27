import { Model } from "objectmodel";
import { makeAutoObservable } from "mobx";
import { localeIsoNames } from "@/utils/media-packager/isoLocales";

const FileEntryModel = Model({
    file_name: String,
    file_type: ["audio", "video", "subtitle", "preview"],
    locale: [String, null],
    audio: [String, null],
    burn_fn: [String, null],
    burn_sub: [String, null],
    crop_values: [Object, null],
    data: [Object, null],
    file_format: [String, null],
    file_size: [Number, null],
    framerate: [String, null], // needs util list
    hour_start: [String, null],
    is_dubbed: [Boolean, null],
    resolution: [String, null],
    territory: [String, null], // needs util list
    track_of: [String, null]
})
.assert(
    f => !f.locale || Object.keys(localeIsoNames).includes(f.locale),
    `locale must be one of: ${Object.keys(localeIsoNames).join(", ")}`
);

export class FileEntry extends FileEntryModel {
    constructor(data = {}) {
        super(data);
        makeAutoObservable(this);
    }

    isAudio() {
        return this.file_type === "audio";
    }

    isSubtitle() {
        return this.file_type === "subtitle";
    }

    hasBurnedSubtitles() {
        return !!this.burn_sub;
    }

    getResolution() {
        return this.resolution || "Unknown";
    }
}