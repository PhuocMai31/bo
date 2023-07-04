import multer from "multer";
import {pushLogEnd} from "@lib";

const upload = multer();

export class Upload {
    /**
     *
     * @param file_name       {string|[]}
     * @param uploadFileType {"single","array","fields"}}
     */
    constructor(file_name, uploadFileType = "single") {
        this.file_name = file_name
        this.uploadFileType = uploadFileType
    }

    uploadFile() {
        if (this.uploadFileType === "single")
            return upload.single(this.file_name)
        if (this.uploadFileType === "array")
            return upload.array(this.file_name)
        if (this.uploadFileType === "fields")
            return upload.fields(this.file_name)

    }

}

export const uploadFile = (file_name) => {
    return
};




export const uploadFiles = (file_name) => {
    return (req, res, next) => {
        return upload.array(file_name)(req, res, () => {
            req.data = Object.assign(req.data, req.body, {files: req.files});
            next();
        });
    };
};

export const uploadFileEspecially = (arr) => {
    return (req, res, next) => {
        return upload.fields(arr)(req, res, () => {
            req.data = Object.assign(req.data, req.body, {files: req.files});
            next();
        });
    };
};
