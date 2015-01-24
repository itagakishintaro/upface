# アイディア

* 服装リコメンド
* お年寄りの見守り
* ゲレンデで衝突回避
* 植物水やり
* サーファー向け波情報
* モーション通知
* キネクト的な
* 何回頷いたか、首振り、寝てる時間、姿勢
=> 上向き会議（上、まっすぐ、下向きの率）
=> 加速度でおちたとき
=> 温度、湿度、気圧で環境
=> うなずき回数
=> 会議の評価を入力して見比べる

# IoT

## 実機

USBに接続して、コンソールから以下のコマンド

````
ls /dev/tty.usb*
ip addr show
````

表示されたMAC?で紙のとおりに接続

## シミュレーター

https://quickstart.internetofthings.ibmcloud.com/iotsensor/

上記サイトから右上のMACアドレス部分をクリックすると、以下のページが表示される。
デバイスID（/device/の右の部分）は都度変わるらしい。

https://quickstart.internetofthings.ibmcloud.com/#/device/158f52e7129a/sensor/temp

# bluemix

https://console.ng.bluemix.net/
email: iot.hack.ikura@gmail.com
pass: ikurahack

## Node-RED

http://upface.mybluemix.net/red/#

※今はDBにたまらないように入力の接続を切っています。

# MongoDB

https://mongolab.com/home

今、使っているドキュメント（データを削除するときには、ここから削除すると簡単）

https://mongolab.com/databases/IbmCloud_ckfsqntu_aatrb337/collections/data

接続情報

https://mongolab.com/databases/IbmCloud_ckfsqntu_aatrb337#users

※今はikura/ikuraというユーザーを作っている。

