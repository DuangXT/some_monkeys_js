/** gloria任务脚本使用的工具类：导入外部脚本 */
class ImportUtils {
    awaitImport = async url => {
        try {
            return await importScripts(url);
        } catch (e) {
            return false;
        }
    }

    awaitImportArrays = async (...urls) => {
        try {
            if(Array.isArray(urls)){
                let array = [];
                for (const url of urls) {
                    const res = this.awaitImport(url);
                    res && (array = array.concat(res));
                }
                return array;
            }
            return await this.awaitImport(urls);
        } catch (e) {
        }
        return false;
    }
}