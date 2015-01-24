"use strict";

$.ajax({
    url: "http://upface.mybluemix.net/data",
}).done(function(data) {
    console.log(data);
}).fail(function(error) {
    console.log(error);
});