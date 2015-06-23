$(document).ready(function(){
    getTxt();
    timeSinceUpdate();
    setInterval(timeSinceUpdate, 1000);
    setInterval(getTxt, 10000);
});
function getTxt()
{
    
    $.get("http://miatribe.github.io/pipvpspy/Loki.txt?" + (Math.floor((Math.random() * 1000) + 1)), function(data){
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
