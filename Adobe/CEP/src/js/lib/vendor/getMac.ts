
import { os } from "../node";


export default function getMAC(iface?: string): string {
    const zeroRegex = /(?:[0]{1,2}[:-]){5}[0]{1,2}/
    const list = os.networkInterfaces()
    for (const [key, parts] of Object.entries(list)) {
        if (!parts) continue
        for (const part of parts) {
            if (zeroRegex.test(part.mac) === false) {
                return part.mac.replace(/[:]/g, "-");
            }
        }
    }
    throw new Error("Failed to get MAC address");
}