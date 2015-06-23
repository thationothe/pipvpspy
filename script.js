//https://www.dropbox.com/s/hm88l8x2tdy8ygv/Loki.txt?dl=0
$(document).ready(function(){
    getTxt();
    timeSinceUpdate();
    setInterval(timeSinceUpdate, 1000);
    setInterval(getTxt, 5000);
});
function getTxt()
{
    $.get("Loki.txt", function(data){
        parseServerTxt(data);
    });
}
function parseServerTxt (serverString)
{
    var firstSplit = serverString.split(',');
    var secondSplit = firstSplit[0].split(':');
    var total = 0;
    $("#perMap").empty();
    $(secondSplit).each(function(index){
        total += parseInt(secondSplit[index].match(/\d+(?= \/)/g));
        $("#perMap").append("<li>" + secondSplit[index] + "</li>");
    });
    $("#secsago").data("update", Math.floor(firstSplit[1]));
    $("#total span").empty().append(total);
}
function timeSinceUpdate()
{
    $("#secsago").html((Math.floor((new Date().getTime()) / 1000)) - parseInt($("#secsago").data("update")));
}