// https://www.npmjs.com/package/active-win

const { promisify } = require("util");
const sleep = promisify(setTimeout);
const activeWindow = require("active-win");

(async () => {
    let activeWindowTitle = "";
    let startTime = null;

    while (true) {
        const currentWindow = await activeWindow();

        if (currentWindow.owner.name !== activeWindowTitle) {
            // 窗口发生切换
            if (activeWindowTitle) {
                // 计算并记录停留时间
                const endTime = Date.now();
                const stayTime = (endTime - startTime) / 1000; // 转换为秒
                console.log(`窗口 "${activeWindowTitle}" 的停留时间：${stayTime} 秒`);
            }

            // 更新活动窗口和开始时间
            activeWindowTitle = currentWindow.owner.name;
            startTime = Date.now();
        }

        await sleep(1000); // 间隔 1 秒钟检测一次活动窗口
    }
})();
