window.onload = function () {

    var oQ = document.getElementById('q');
    var oBtn = document.getElementById('btn');


    oBtn.onclick = function () {

        var oValue = oQ.value;

        if (oValue != '') {

            var oScript = document.createElement('script');
            oScript.src = 'http://api.douban.com/book/subjects?q=' + oValue + '&alt=xd&callback=fn1';
            document.body.appendChild(oScript);

        }
    }
}

function fn1(data) {

    var oList = document.getElementById('list');
    var oResult = document.getElementById('result');
    var html = '';
    var code1 = '<div class="book-detail"> <div class = "book-line1" ><span class = "book-title" > ';
    var code2 = '</span></div><div class="book-line2"><span class="';
    var code3 = '"></span>'

    oResult.innerHTML = data.title.$t + ' : ' + data['opensearch:totalResults'].$t + '条';
    var aEntry = data.entry;


    for (var i = 0; i < aEntry.length; i++) {

        var title = aEntry[i].title.$t;
        var href = aEntry[i].link[2]['@href'];
        var iconClass = '';
        var average = aEntry[i]["gd:rating"]["@average"];
        var numRaters = '';
        var db = '';

        if(aEntry[i]["gd:rating"]["@numRaters"] === 0){
            numRaters = '(目前无人评价)'
        }else{
            numRaters = "(" + aEntry[i]["gd:rating"]["@numRaters"] + "人评价)"
        }

        for (var j = 3; j < aEntry[i]["db:attribute"].length; j++) {

            db += aEntry[i]["db:attribute"][2].$t + " / " + aEntry[i]["db:attribute"][j].$t;

        }
    

        if(Math.round(average*5) >= 48){
            iconClass = 'bigstar50';
        }else if(Math.round(average*5) >= 43 && Math.round(average*5) < 48){
            iconClass = 'bigstar45';
        }else if(Math.round(average*5) >= 38 && Math.round(average*5) < 43){
            iconClass = 'bigstar40';
        }else if(Math.round(average*5) >= 33 && Math.round(average*5) < 38){
            iconClass = 'bigstar35';
        }else if(Math.round(average*5) >= 28 && Math.round(average*5) < 33){
            iconClass = 'bigstar30';
        }else if(Math.round(average*5) >= 23 && Math.round(average*5) < 28){
            iconClass = 'bigstar25';
        }else if(Math.round(average*5) >= 18 && Math.round(average*5) < 23){
            iconClass = 'bigstar20';
        }else if(Math.round(average*5) >= 13 && Math.round(average*5) < 18){
            iconClass = 'bigstar15';
        }else if(Math.round(average*5) >= 8 && Math.round(average*5) < 13){
            iconClass = 'bigstar10';
        }else if(Math.round(average*5) >= 3 && Math.round(average*5) < 8){
            iconClass = 'bigstar5';
        }else{
            iconClass = 'bigstar0';
        }

        html += '<li class="item"><img class="book-cover" src="' +
            href + '" />' + code1 + title + code2 + iconClass + code3 + '<span class="book-source">' + average + '</span><span class="book-total">' + numRaters + '</span></div><div class="book-line3"><span class="book-author">' + db + '</span></div></div></div></li>';

    }
    oList.innerHTML = html;


}