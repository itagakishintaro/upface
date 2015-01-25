"use strict";

var last_time = 0;

google.load("visualization", "1", {
    packages: ["corechart"]
});

$(document).ready(function() {
    getData();
    setInterval(getData, 3000);
});

function getData() {
    $.ajax({
        url: "http://upface.mybluemix.net/data",
    }).done(function(data) {
        setCircumstanceInfo(data);
        setFaceDirection(data);
        setTimeLine(data);
        playSound(data);
    }).fail(function(error) {
        console.log(error);
    });
}

function setCircumstanceInfo(data) {
    var last = data.pop();
    if (last === undefined) {
        return;
    }
    $("#temp").text(last.payload.temp);
    $("#humidity").text(last.payload.humidity);
    $("#pressure").text(last.payload.pressure);
}

function setFaceDirection(sensor_data) {
    var data = new google.visualization.DataTable();

    // 行数と列の設定
    data.addRows(3);
    data.addColumn("string", "向き");
    data.addColumn("number", "数");

    var face_direction = {
        "up": 0,
        "straight": 0,
        "down": 0
    };
    sensor_data.forEach(function(element, index) {
        if (element.payload.accelY < -0.5) {
            face_direction.up = face_direction.up + 1;
        } else if (element.payload.accelY > 0.5) {
            face_direction.down = face_direction.down + 1;
        } else {
            face_direction.straight = face_direction.straight + 1;
        }
    });

    data.setValue(0, 0, "上向き");
    data.setValue(0, 1, face_direction.up);
    data.setValue(1, 0, "前向き");
    data.setValue(1, 1, face_direction.straight);
    data.setValue(2, 0, "下向き");
    data.setValue(2, 1, face_direction.down);

    var chart = new google.visualization.PieChart(document.getElementById('face-direction'));
    var options = {
          legend: { position: 'top' }
        };
    chart.draw(data, options);
}

function setTimeLine(sensor_data) {
    var data = new google.visualization.DataTable();

    // 列の設定
    data.addColumn("string", "時刻");
    data.addColumn("number", "寝落ち");

    // 行データ
    var sleep_data = getSleep(sensor_data);
    data.addRows(sleep_data.length + 1);
    sleep_data.forEach(function(element, index) {
        data.setValue(index, 0, String(element.date));
        data.setValue(index, 1, element.sleep);
    });

    var chart = new google.visualization.LineChart(document.getElementById('time-line'));
    var options = {
          legend: { position: 'in' },
          chartArea: {width: "80%"}
        };
    chart.draw(data, options);
}

function getSleep(data) {
    // 整形済みデータ
    var preformatted_data = [];
    // 添字配列に連想配列が入ってるので時間をインデックス
    var time_index = {};
    // 直前のセンサの状態. enumで定義しておくべきだけど今回は直前が寝落tingがどうかだけわかればいいのでunixtimeを入れる
    var tmp_state = 0;
    data.forEach(function(element, index) {
        //console.log(element);
        // 分刻み
        var time = element.payload.date - element.payload.date % 60;
        if (!(String(time) in time_index)) {
            time_index[String(time)] = preformatted_data.length;
            preformatted_data.push({
                "date": new Date(time * 1000),
                "sleep": 0
            });
        }
        if (element.payload.gyroZ <= -100 && !(element.payload.date - tmp_state < 2)) {
            preformatted_data[time_index[String(time)]].sleep += 1;
        }
    });
    return preformatted_data;
}

function playSound(sensor_data) {
    var filtered_data = sensor_data.filter(function(element, index) {
        return element.payload.date > last_time;
    });
    
    // 寝落ち
    var sleep_data = getSleep(filtered_data);
    var is_sleep = sleep_data.some(function(element, index){
    	return element.sleep > 0;
    });
    if (is_sleep) {
        var audio = new Audio("");
        audio.autoplay = false;
        audio.src = "./sounds/dont_sleep.m4a";
        audio.play();
        $('img').addClass('animated shake');
    }

    // 暑い
    var is_hot = filtered_data.some(function(element, index){
    	return element.payload.temp > 28;
    });
    if (is_hot) {
        var audio = new Audio("");
        audio.autoplay = false;
        audio.src = "./sounds/hot.m4a";
        audio.play();
        $('img').addClass('animated flip');
    }

    last_time = parseInt(new Date() / 1000);
}