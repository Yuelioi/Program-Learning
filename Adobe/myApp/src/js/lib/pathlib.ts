
import { path } from "./node";
import CSInterface from "@jslib/csinterface";
import { SystemPath } from "@jslib/csinterface";


const csi = new CSInterface()
const ext_path = csi.getSystemPath(SystemPath.EXTENSION)
const data_path = path.join(ext_path, "data")
const sub_path = path.join(ext_path, "sub")
const pwd_json_path = path.join(data_path, "data.json");


export { ext_path, data_path, sub_path, pwd_json_path }