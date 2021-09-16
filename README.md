# Score-Plus 運動記分板

## 安裝
使用 [node](http://nodejs.org) 及 [npm](https://npmjs.com) ，請先確認是否安裝完成。

### 套件
[express](https://expressjs.com/) 及 [ejs](https://ejs.co/)
```sh
$ npm install
#node package: express ejs
```

## 首頁
<img src="https://user-images.githubusercontent.com/44441792/133604601-7b05df9e-d0be-4f77-a60f-31e0b6b0433b.jpg" width="350">

### 功能
* 互動式導覽列
  * 點擊標題回到首頁
  * 搜尋比賽紀錄(建構中)
  * 使用者登入(建構中)
* 選擇記分板
  * 桌球
  * 排球(建構中)
  * 籃球(建構中)

## 記分板
隊伍分色顯示，支援Deuce計算</p>
#### 預設外觀
<img src="https://github.com/chung-chin/Score-Plus/blob/main/plots/fullsec.jpg" width="350"></p>

## 說明
<img src="https://github.com/chung-chin/Score-Plus/blob/main/plots/sec1.jpg" width="350"></p>
* 互動式導覽列
  * 局數設定
    * 三局以上顯示局數列表
    * 比賽進度標示
  * 比分設定
  * 其他功能
    * 分享
    * 清除所有比分

<img src="https://github.com/chung-chin/Score-Plus/blob/main/plots/sec2.jpg" width="350"></p>
* 隊伍名稱
  * 點擊開啟功能列
    * 輸入欄(不超過18個字)
    * 更改隊伍名稱，輸入欄為空時回復預設隊名
    * 將輸入欄名稱新增為隊員
    * 移除最後一名隊員
* 預設隊員名單

<img src="https://github.com/chung-chin/Score-Plus/blob/main/plots/sec3.jpg" width="350"></p>
* 分數顯示
  * 同分顯示 Deuce
  * 完成顯示 WIN
* 計分按鈕
  * 減分
  * 加分
* 重賽
  * 清除當前比分
* 下一局/儲存比賽
  * 下一局
  * 終局自動變更為儲存紐
    * 儲存比賽結果(建構中)
