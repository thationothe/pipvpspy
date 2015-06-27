$(document).ready(function(){
    getTxt();
    timeSinceUpdate();
    setInterval(timeSinceUpdate, 1000);
    setInterval(getTxt, 60000);
});
function getTxt()
{
    $.get("http://miatribe.github.io/pipvpspy/Loki.txt?" + (new Date().getTime()), function(data){
        parseServerTxt(data, "Loki");
    });
    $.get("http://miatribe.github.io/pipvpspy/Chaos.txt?" + (new Date().getTime()), function(data){
        parseServerTxt(data, "Chaos");
    });
    $.get("http://miatribe.github.io/pipvpspy/Thor.txt?" + (new Date().getTime()), function(data){
        parseServerTxt(data, "Thor");
    });
}
function parseServerTxt (serverString, name)
{
    var firstSplit = serverString.split(',');
    var secondSplit = firstSplit[0].split(':');
    var total = 0;
    $("#perMap" + name).empty();
    $(secondSplit).each(function(index){
        total += parseInt(secondSplit[index].match(/\d+(?= \/)/g));
        $("#perMap" + name).append("<li>" + secondSplit[index] + "</li>");
    });
    $("#secsago" + name).data("update", Math.floor(firstSplit[1]));
    $("#total"+ name + " span").empty().append(total);
}
function timeSinceUpdate()
{
    $("#secsagoLoki").html((Math.floor((new Date().getTime()) / 1000)) - parseInt($("#secsagoLoki").data("update")));
    $("#secsagoChaos").html((Math.floor((new Date().getTime()) / 1000)) - parseInt($("#secsagoChaos").data("update")));
    $("#secsagoThor").html((Math.floor((new Date().getTime()) / 1000)) - parseInt($("#secsagoThor").data("update")));
}
