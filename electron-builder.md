## electron-builder build electron

### electron-builder的配置 参数说明
```json
{
  "productName": "AI助手", // 项目名 这也是生成的exe文件的前缀名
  "appId": "com.assistant.electron-desktop", // 包名 
  "copyright":"xxxx", // 版权 信息
  "asar": true, // 是否用asar压缩
  "directories": {
    // 输出文件夹
    "output": "release/${version}"
  },
  "nsis": {
    "oneClick": false, // 是否一键安装
    "perMachine": false, // 是否以管理员权限安装到 Program Files 目录
    "allowElevation": true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
    "allowToChangeInstallationDirectory": true, // 允许修改安装目录
    "deleteAppDataOnUninstall": false,
    "installerIcon": "./build/icons/aaa.ico",// 安装图标
    "uninstallerIcon": "./build/icons/bbb.ico",// 卸载图标
    "installerHeaderIcon": "./build/icons/aaa.ico", // 安装时头部图标
    "createDesktopShortcut": true, // 创建桌面图标
    "createStartMenuShortcut": true,// 创建开始菜单图标
    "shortcutName": "xxxx", // 图标名称
    "include": "build/script/installer.nsh", // 包含的自定义nsis脚本
  },
  "publish": [
    {
      "provider": "generic", // 服务器提供商 也可以是GitHub等等
      "url": "http://xxxxx/" // 服务器地址
    }
  ],
  // 需要打包的文件
  "files": ["dist-electron", "dist"],
  "mac": {
    "artifactName": "${productName}_${version}.${ext}",
    "target": [
      "dmg",
      "zip"
    ]
  },
  "win": {
    "target": [
      {
        "target": "nsis",
        "arch": [
          "x64"
        ]
      }
    ],
    "artifactName": "${productName}_${version}.${ext}"
  },
}
```
### Electron-builder打包详解
参考 [Electron-builder打包详解](https://github.com/QDMarkMan/CodeBlog/blob/master/Electron/electron-builder%E6%89%93%E5%8C%85%E8%AF%A6%E8%A7%A3.md)
