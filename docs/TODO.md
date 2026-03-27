- [x] 在应用列表中无法搜索应用
- [x] 下载出的数据添加以下信息：标题中包含快捷键，备注中包含应用名
- [x] 应用列表应当根据系统进行筛选，Windows不能显示MACOS或者Linux的快捷键
- [x] 支持自定义json的快捷键输入

# 功能
- [ ] 支持对接[JinSooo/CheatSheet: 一个跨平台显示应用快捷键的软件](https://github.com/JinSooo/CheatSheet)的数据
- [ ] 提供斜线命令将内置的快捷键数据，导出用json文件保存

# 问题
- [X] photoshop的快捷键无法获取
- [x] photoshop的快捷键数据太多了，无法存入utools db，限制1M数据尺寸，后续可考虑用sqlite来保存在本地
- [x] 快捷键执行有问题，ctrl + F都无法执行了
- [ ] 快捷键描述标题过长，无法完全显示

# 重构
- [x] 对hotkey_service.js拆分
- [x] 将sqlite保存的快捷键数据，用json文件保存
