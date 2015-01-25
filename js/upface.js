"use strict";

google.load("visualization", "1", {
    packages: ["corechart"]
});

$(document).ready(function() {
    getData();
    setInterval(getData, 10000);
});

function getData() {
    $.ajax({
        url: "http://upface.mybluemix.net/data",
    }).done(function(data) {
        console.log(data.pop());
        setCircumstanceInfo(data);
        google.setOnLoadCallback(setFaceDirection(data));
    }).fail(function(error) {
        console.log(error);
    });
}

function setCircumstanceInfo(data) {
    $("#temp").text(data.pop().payload.temp);
    $("#humidity").text(data.pop().payload.humidity);
    $("#pressure").text(data.pop().payload.pressure);
}

function setFaceDirection(sensor_data) {
	var data = new google.visualization.DataTable();

    // 行数と列の設定
    data.addRows(3);
    data.addColumn("string", "向き");
    data.addColumn("number", "数");

    var face_direction = {"up": 0, "straight": 0, "down":0};
    sensor_data.forEach(function(element, index){
    	if(element.payload.accelZ > 0){
    		face_direction.up = face_direction.up + 1;
    	} else if(element.payload.accelZ < 0){
    		face_direction.down = face_direction.down + 1;
    	} else{
    		face_direction.straight = face_direction.straight + 1;
    	}
    });

    data.setValue(0, 0, "上向き");
    data.setValue(0, 1, face_direction.up);
    data.setValue(1, 0, "前向き");
    data.setValue(1, 1, face_direction.up);
    data.setValue(2, 0, "下向き");
    data.setValue(2, 1, face_direction.up);

    var options = {
        title: 'みんなどっち向き'
    };

    var chart = new google.visualization.PieChart(document.getElementById('face-direction'));

    chart.draw(data, options);
}