import CSInterface from "./csinterface";
import { SystemPath } from "./csinterface";
import { fs, path } from "./node";
export const csi = new CSInterface();
import getMAC from "./vendor/getMac"


interface User {
    username: string;
    password: string;
}
export const createFolder = (folderName: string) => {
    fs.mkdir(folderName, { recursive: true }, (err) => {
        if (err) {
            if (err.code === 'EEXIST') {
                console.log(`Folder "${folderName}" already exists.`);
            } else {
                console.error(`Failed to create folder "${folderName}". Error:`, err);
            }
        } else {
            console.log(`Folder "${folderName}" created successfully.`);
        }
    });
}


export class Yl_Tools {
    constructor() {

    }
    name = "Yl_Pr_Tools"
    version = "2.0.0"
    ext_path = csi.getSystemPath(SystemPath.EXTENSION)
    data_path = path.join(this.ext_path, "data")
    sub_path = path.join(this.ext_path, "sub")
    pwd_path = path.join(this.data_path, "data.json");

    open_sub_folder = () => {
        const { exec } = require('child_process');
        const path = require('path');
        exec(`explorer.exe "${path.resolve(this.sub_path)}"`, (err: any) => {
            if (err) {
                console.error(`Failed to open folder "${this.sub_path}". Error:`, err);
            } else {
                console.log(`Folder "${this.sub_path}" opened successfully.`);
            }
        });
    };
}
const yl_tools = new Yl_Tools();



const writeJson2Data = (filePath: string, data: User) => {
    fs.writeFile(filePath, JSON.stringify(data), (err) => {
        if (err) {
            console.error(`Failed to write file "${filePath}". Error:`, err);
        } else {
            console.log(`Data written to file "${filePath}" successfully.`);
        }
    });
}

export const initLogin = () => {
    return readJsonFromData(yl_tools.pwd_path);
}


const readJsonFromData = async (filePath: string) => {
    try {
        await fs.promises.access(filePath, fs.constants.F_OK);
        const data = await fs.promises.readFile(filePath);
        const jsonData = JSON.parse(data as any);
        return jsonData;
    } catch (err) {
        console.error('读取文件失败或文件不存在');
        return null;
    }
}


export async function auth(username: any, password: any) {
    const macAddress = getMAC()
    let reqUrl2 = `https://api.yuelili.com/get_order_status?username=${username} &password=${password}&post_id=18367&mac=${macAddress}`;

    const res = await fetch(reqUrl2);
    if (res.ok) {
        const json = await res.json();
        console.log(json);
        if (json.order_status === 1) {
            writeJson2Data(yl_tools.pwd_path, { username: username, password: password })
            return true;
        }
    }
}
