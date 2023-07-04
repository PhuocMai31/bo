import {updateFiles} from "@util";
import {file} from "googleapis/build/src/apis/file";

/**
 * @param p
 * @param c {Controller}
 */
export const fTest = async ({file},c)=>{
    console.log(file)
    const res = await updateFiles(file)
    c.data = res
}