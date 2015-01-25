"use strict";

var last_time = 9999999999;
var hot_last_time = 0;
var angle_counter = 0;
var angle = {
    "none": 0,
    "front": 1,
    "down": 2,
    "up": 3
};

google.load("visualization", "1", {
    packages: ["corechart"]
});

$(document).ready(function() {
    getData();
    setInterval(getData, 5000);
});

function getData() {
    $.ajax({
        url: "http://upface.mybluemix.net/data",
    }).done(function(data) {
        console.log(data);
        setCircumstanceInfo(data);
        setFaceDirection(data);
        setTimeLine(data);
        playSound(data);
        last_time = Math.max.apply(null, data.map(function(element) {
            return element.payload.date;
        }));
        console.log(last_time);
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
        legend: {
            position: 'top'
        }
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
        legend: {
            position: 'in'
        },
        chartArea: {
            width: "80%"
        }
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
    console.log(sleep_data);
    var is_sleep = sleep_data.some(function(element, index) {
        return element.sleep > 0;
    });
    if (is_sleep) {
        var audio = new Audio("");
        audio.autoplay = false;
        audio.src = "./sounds/dont_sleep.m4a";
        audio.play();
        $('img.right').attr("src", "./img/dont_sleep.jpg");
        $('img.bear').addClass('animated shake');
    } else {
        $('img.right').attr("src", "");
    }

    // 暑い
    var is_hot = filtered_data.some(function(element, index) {
        return element.payload.temp > 29;
    });
    console.log(hot_last_time);
    if (is_hot && filtered_data[0].payload.date > hot_last_time + 60) {
        var audio = new Audio("");
        audio.autoplay = false;
        audio.src = "./sounds/hot.m4a";
        audio.play();
        $('img.left').attr("src", "./img/hot.jpg");
        $('img').addClass('animated flip');
        hot_last_time = Math.max.apply(null, filtered_data.map(function(element) {
            return element.payload.date;
        }));
    } else {
        $('img.left').attr("src", "");
    }

    // ずっと同じ方向
    $('img.happy').attr("src", "");
    $('img.happy').attr("height", "0");
    $('img.bear').attr("src", "./img/bear.jpg");

    var continus_angle = angle.none;
    if(filtered_data.length === 0){
    	return;
    }
    var last = getFaceAngle(filtered_data[0]);
    var is_continued = filtered_data.every(function(element, index){
    	return getFaceAngle(element) === last;
    });
    if(is_continued){
    	continus_angle = last;
    	angle_counter = angle_counter + 1;
    }

    if(angle_counter < 3){
    	return;
    }

    console.log("continus_angle: " + String(continus_angle));
    switch (continus_angle) {
        case angle.front:
            // 前
            var audio = new Audio("");
            audio.autoplay = false;
            audio.src = "./sounds/happy.m4a";
            audio.play();
            angle_counter=0;
            $('img.happy').attr("height", "200px");
            $('img.happy').attr("src", "./img/happy.jpg");
        	$('img').addClass('animated zoomIn');
            break;
        case angle.down:
            // 下
            var audio = new Audio("");
            audio.autoplay = false;
            audio.src = "./sounds/upface.m4a";
            audio.play();
            angle_counter=0;
            $('img.bear').attr("src", "./img/angry_bear.jpg");
            $('img.happy').attr("height", "100px");
            $('img.happy').attr("src", "./img/angry_comment.jpg");
        	$('img').addClass('animated zoomIn');
            break;
        case angle.up:
            // 上
           
            break;
        default:
            // なし
            break;
    }
}

function getFaceAngle(data) {
    if (data.payload.accelY <= -0.5) {
        return angle.up;
    } else if (data.payload.accelY > -0.5 && data.payload.accelY < 0.5) {
        return angle.front;
    } else {
        return angle.down;
    }
}