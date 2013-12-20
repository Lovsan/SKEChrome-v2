function CommaFormatted(amount){
        var delimiter = ","; // replace comma if desired
        var a = amount
        var d = 0;
        var i = parseInt(a);
        if(isNaN(i)) { return ''; }
        var minus = '';
        if(i < 0) { minus = '-'; }
        i = Math.abs(i);
        var n = new String(i);
        var a = [];
        while(n.length > 3)
        {
                var nn = n.substr(n.length-3);
                a.unshift(nn);
                n = n.substr(0,n.length-3);
        }
        if(n.length > 0) { a.unshift(n); }
        n = a.join(delimiter);
        if(d.length < 1)
        {
                amount = n;
        }
        else
        {
                amount = n;
        }
        amount = minus + amount;
        return amount;
};

var numMil = localStorage["mil_count"];
var numTfs = localStorage["tfs_count"];
var numRax = localStorage["rax_count"];
var numBay = localStorage["bay_count"];
var raxSpace = (numRax * 75);
var perCent = Math.floor((numMil / raxSpace)*100);
var baySpace = (numBay * 40);
var bayPercent = Math.floor((numTfs / baySpace)*100);
var raxFree = CommaFormatted(raxSpace - numMil);
var bayFree = CommaFormatted(baySpace - numTfs);
var comMil = CommaFormatted(numMil);
var comTfs = CommaFormatted(numTfs);
var comRax = CommaFormatted(raxSpace);
var comBay = CommaFormatted(baySpace);
var raxNumFree = CommaFormatted(Math.floor((raxSpace - numMil)/75));
var bayNumFree = CommaFormatted(Math.floor((baySpace - numTfs)/75));

document.body.innerHTML = document.body.innerHTML.replace("%</b>","%</b><br>True Barracks Capacity: <b>" + perCent + "%</b> " + "(" + comMil + " / " + comRax + ") " + raxFree + " units or " + raxNumFree + " barracks.<br>Air Support Bay Capacity: <b>" + bayPercent + "%</b> (" + comTfs + " / " + comBay + ") " + bayFree + " units or " + bayNumFree + " bays.");