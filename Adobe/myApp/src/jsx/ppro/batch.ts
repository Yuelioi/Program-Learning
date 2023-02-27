import { path } from "../../js/lib/node"
import CSInterface from "../../js/lib/csinterface";
import { SystemPath } from "../../js/lib/csinterface";
export const csi = new CSInterface();


const data_path = path.join(csi.getSystemPath(SystemPath.EXTENSION), "data")

declare global {
    interface Array<T> {
        filter(callbackfn: (value: T, index: number, array: T[]) => unknown, thisArg?: any): T[]; indexOf(searchElement: T, fromIndex?: number): number;
    }
}

if (!Array.prototype.filter) {
    Array.prototype.filter = function <T>(callback: (value: T, index: number, array: T[]) => boolean, thisArg?: any): T[] {
        const filteredArray: T[] = [];
        for (let i = 0; i < this.length; i++) {
            if (callback.call(thisArg, this[i], i, this)) {
                filteredArray.push(this[i]);
            }
        }
        return filteredArray;
    };
}
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function <T>(searchElement: T, fromIndex?: number): number {
        const startIndex = fromIndex || 0;
        let currentIndex = startIndex < 0 ? this.length + startIndex : startIndex;

        while (currentIndex < this.length) {
            if (this[currentIndex] === searchElement) {
                return currentIndex;
            }
            currentIndex++;
        }

        return -1;
    };
}
export const clipsRender = (p1: number, p2: number, p3: number, p4: string) => {
    alert(p1.toString(), p2.toString())
    // let time_list: number[][], name_list: string[];
    // 
    // const sequence = app.project.activeSequence || false;
    // if (!sequence) {
    //     alert("请激活一个序列");
    //     return;
    // }
    // if (p1 === 0) {
    //     alert("输入要参考的轨道");
    //     return;
    // }

    // const folderObj: Folder = new Folder("");
    // const trg_folder: Folder = (folderObj as any).saveDlg("请选择一个文件夹，点右下角保存");

    // if (!trg_folder) {
    //     alert("未成功选择文件夹，已停止");
    //     return;
    // }

    // app.encoder.launchEncoder();

    // [time_list, name_list] = get_time_list(p1, p2, p3);



    // if (time_list[0].length < 2) {
    //     alert("请选择一个有剪辑的视频/音频轨道");
    //     return;
    // }
    // if (p4.length < 1) {
    //     p4 = "";
    // }
    // add_to_ame(time_list, trg_folder, name_list, p4);
    // alert(`已成功添加${time_list[0].length}`);
};



function get_time_list(p1: number, is_sel: number, is_connect: number): [number[][], string[]] {


    let time_list: [number[], number[]] = [[], []];
    let name_list: string[] = [];
    const sequence = app.project.activeSequence;
    const clips = p1 < 0 ? sequence.audioTracks[Math.abs(p1) - 1].clips : sequence.videoTracks[p1 - 1].clips;
    if (!clips) {
        return [[[0], [1]], [""]];
    }
    let stop = true;
    if (is_connect && !is_sel) {
        for (let i = 0; i < clips.numItems; i++) {
            const clip: any = clips[i];
            if (stop) {
                time_list[0].push((clip as any).start.seconds);
            }
            const jug = clip.name.lastIndexOf(".");
            const nname = jug + 1 ? clip.name.substring(0, jug) : clip.name;
            if (is_connect && i < clips.numItems - 1 && clip.end.seconds == clips[i + 1].start.seconds) {
                stop = false;
            } else {
                stop = true;
            }
            if (stop) {
                name_list.push(nname);
                time_list[1].push(clip.end.seconds);
            }
        }
    } else {
        for (let i = 0; i < clips.numItems; i++) {
            const clip = clips[i];
            if (is_sel && !clip.isSelected()) {
                continue;
            }
            time_list[0].push(clip.start.seconds);
            const jug = clip.name.lastIndexOf(".") + 1;
            const nname = jug ? clip.name.substring(0, jug) : clip.name;
            name_list.push(nname);
            time_list[1].push(clip.end.seconds);
        }

        if (is_connect) {
            const differenceA = time_list[0].filter((v) => time_list[1].indexOf(v) === -1);
            const differenceB = time_list[1].filter((v) => time_list[0].indexOf(v) === -1);
            name_list = name_list.filter((v, i) => differenceA.indexOf(time_list[0][i]) + 1);
            time_list = [differenceA, differenceB];
        }
    }

    return [time_list, name_list];
}


function add_to_ame(time_list: number[][], trg_folder: Folder, name_list: string[], output_name?: string): void {
    const sequence = app.project.activeSequence;

    for (let i = 0; i < time_list[0].length; i++) {
        const start = time_list[0][i];
        const end = time_list[1][i];
        sequence.setInPoint(start);
        sequence.setOutPoint(end);

        let out_name: string;
        if (output_name) {
            out_name = output_name + "_" + PrefixZero(i + 1, 4);
        } else {
            out_name = name_list[i];
        }

        try {
            app.encoder.encodeSequence(sequence, `${trg_folder.parent.fsName}\\${out_name}`, path.join(data_path, "\\MY Preset.epr", 1, 0));
        } catch (e: any) {
            alert(e);
        }
    }
}

function PrefixZero(num: string | number, n: number): string {
    return (Array(n).join("0") + num).slice(-n);
}


