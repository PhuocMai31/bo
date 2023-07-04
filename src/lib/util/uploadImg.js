import axios from "axios";
import FormData from "form-data";
import {error_no, getNowTimeStamp, makeid, sumArr, throwErrorNo} from "@util";
import {TYPE_FILE} from "@constant";
import {addWardMd} from "@model/ward";
import * as fs from "fs";
import {file} from "googleapis/build/src/apis/file";
import path from "path";
import dotenv from "dotenv";

export const uploadImg = (
    file,
    apiKey = "EnvhsWCWNivCOqx8ASuIXQ9OAseKxQABuyL",
    folder = "boImg"
) => {
    let newBuffer = file.buffer;
    const formData = new FormData();

    formData.append("file", newBuffer, getNowTimeStamp(14) + file.originalname);
    const headers = {
        Authorization: "Bearer ...",
        ...formData.getHeaders(),
        apiKey,
    };
    if (folder) headers.folder = folder;
    return axios.post("https://cdn.dxmb.vn/do-upload", formData, {
        headers,
        maxContentLength: 50000000,
        maxBodyLength: 50000000,
    });
};

/**
 *
 * @param files
 * @param saveFiles {{}}
 * @return {Promise<{images: *[], files: *[]}| {}>}
 */
export const uploadFiles = async (
    files,
    saveFiles = {files: [], images: []}
) => {
    if (files) {
        let mb = sumArr(files, "size");
        if (mb >= 50000000) return throwErrorNo(error_no.fileUpload);
        for (let index = 0; index < files.length; index++) {
            if (
                files[index].mimetype.startsWith(TYPE_FILE.IMG) ||
                files[index].mimetype.startsWith(TYPE_FILE.PDF) ||
                files[index].mimetype.startsWith(TYPE_FILE.VIDEO)
            ) {
                const res = await uploadImg(files[index]);
                if (files[index].mimetype.startsWith(TYPE_FILE.VIDEO))
                    saveFiles = {
                        ...saveFiles,
                        files: [...saveFiles.files, res.data.origin],
                    };
                if (files[index].mimetype.startsWith(TYPE_FILE.IMG))
                    saveFiles = {
                        ...saveFiles,
                        images: [...saveFiles.images, res.data.location],
                    };
                if (files[index].mimetype.startsWith(TYPE_FILE.PDF)) {
                    const {buffer, ...data} = files[index];
                    saveFiles = {
                        ...saveFiles,
                        files: [...saveFiles.files, res.data.origin],
                    };
                }
            }
        }
        return saveFiles;
    } else return saveFiles;
};

export const uploadFilesV2 = async (files, saveFiles = []) => {
    if (files) {
        if (mb >= 50000000) return throwErrorNo(error_no.fileUpload);
        for (let index = 0; index < files.length; index++) {
            if (
                files[index].mimetype.startsWith(TYPE_FILE.IMG) ||
                files[index].mimetype.startsWith(TYPE_FILE.PDF) ||
                files[index].mimetype.startsWith(TYPE_FILE.VIDEO)
            ) {
                const res = await uploadImg(files[index]);
                saveFiles.push(files[res.data.origin]);
            }
        }
        return saveFiles;
    } else return saveFiles;
};

export async function uploadFile(file) {
    // Lấy timestamp hiện tại
    const timestamp = Date.now();
    // Lấy đuôi file từ tên gốc của file
    const path = require('path');
    const ext = path.extname(file.originalname);
    // Tạo tên file mới bằng cách kết hợp timestamp và đuôi file
    const newFilename = file.originalname + makeid(10) + "_" + timestamp + ext;
    const childDirectory = '/src/public/image/';
    const filePath = path.join(__dirname, childDirectory, newFilename);

    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, file.buffer, (err) => {
            if (err) {
                console.error(err);
                return reject(err);
            }
            return resolve(filePath);
        });
    })

}


export const updateFiles = async (files) => {
    let linkImage;
    let time = Date.now();
    time = time.toString();
    const destinationFolder = 'src/public/image';
    files.originalname = time + "." + files.originalname.split('.').pop();
    let destinationPath = `${destinationFolder}/${files.originalname}`;
    let writePromise = new Promise((resolve, reject) => {
        fs.writeFile(destinationPath, files.buffer, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(linkImage = `${process.env.DOMAIN}image/${files.originalname}`);
            }
        });
    });
    return writePromise.then(data => {
        return data
    }).catch((err) => {
        console.log(err)
    })
};