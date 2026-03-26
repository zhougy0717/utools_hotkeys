const fs = require('fs');
const file_path = '~/.utools/shortcuts/example/data.json';

class ShortcutList {
    constructor() {
        try {
        fs.readFile(file_path, 'utf8', (err, data) => {
            if (err) {
              console.error('读取文件出错:', err);
              return;
            }
            try {
              const jsonData = JSON.parse(data);
              console.log(jsonData);
            } catch (error) {
              console.error('解析JSON出错:', error);
            }
          });
        } catch (error) {
            console.error('读取文件出错:', err);
        }
    }

    get() {
        return []
    }

    name() {
        return ""
    }
}

module.exports = new ShortcutList()