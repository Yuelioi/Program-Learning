import { fs, path } from "./node";

interface User {
    username: string;
    password: string;
}
export const createFolder = async (folderName: string) => {
    return new Promise<void>((resolve, reject) => {
        fs.mkdir(folderName, { recursive: true }, (err) => {
            if (err) {
                if (err.code === 'EEXIST') {
                    console.log(`Folder "${folderName}" already exists.`);
                } else {
                    console.error(`Failed to create folder "${folderName}". Error:`, err);
                    reject(err);
                }
            } else {
                console.log(`Folder "${folderName}" created successfully.`);
                resolve();
            }
        });
    });
};



export const writeJson2Data = async (filePath: string, data: User) => {
    return new Promise<void>((resolve, reject) => {
        fs.writeFile(filePath, JSON.stringify(data), (err) => {
            if (err) {
                console.error(`Failed to write file "${filePath}". Error:`, err);
                reject(err);
            } else {
                console.log(`Data written to file "${filePath}" successfully.`);
                resolve();
            }
        });
    });
};

export const readJsonFromData = async (filePath: string) => {
    try {
        await fs.promises.access(filePath, fs.constants.F_OK);
        const data = await fs.promises.readFile(filePath);
        const jsonData = JSON.parse(data as any);
        return jsonData;
    } catch (err) {
        console.error('读取文件失败或文件不存在');
        return null;
    }
};

