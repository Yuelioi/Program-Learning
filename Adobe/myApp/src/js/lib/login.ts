import getMAC from "./vendor/getMac"
import { writeJson2Data } from "./os"
import { pwd_json_path } from "./pathlib"

export async function auth(username: any, password: any) {
    const macAddress = getMAC()
    let reqUrl2 = `https://api.yuelili.com/get_order_status?username=${username} &password=${password}&post_id=18367&mac=${macAddress}`;

    const res = await fetch(reqUrl2);
    if (res.ok) {
        const json = await res.json();
        console.log(json);
        if (json.order_status === 1) {
            writeJson2Data(pwd_json_path, { username: username, password: password })
            return true;
        }
    }
}