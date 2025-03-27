import { Model } from "objectmodel";
import { makeAutoObservable } from "mobx";

const FileEntryModel = Model({
    file_name: String,
    file_type: ["audio", "video", "subtitle", "preview"],
    locale: String,
    audio: [String, null],
    burn_fn: [String, null],
    burn_sub: [String, null],
    crop_values: [Object, null],
    data: Object,
    file_format: [String, null],
    file_size: [Number, null],
    framerate: [String, null],
    hour_start: [String, null],
    id: [String, null],
    is_dubbed: [String, null],
    package_root: String,
    resolution: [String, null],
    territory: [String, null],
    track_of: [String, null]
});

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