
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

function Fill(field, amount, divide){
        var forms = document.getElementsByTagName('input');
        var division = 1
        if(divide)
        {
                division = divide
        }
        for(var i = 0; i< forms.length; i++)
        {
                if(forms[i].name == field && !(forms[i].type=="submit"))
                {
                        forms[i].value = Math.floor(amount / division) * division;
                }
        }
};

function Rest(field, amount, divideby){
        var forms = document.getElementsByTagName('input');
        var soFar = 0
        for(var i = 0; i< forms.length; i++)
        {
                if(forms[i].name)
                {
                        soFar += (forms[i].value * 1)
                }
                }
        var leftover = amount - soFar;
        if(leftover < 0){leftover = 0}
        for(var i = 0; i< forms.length; i++)
        {
                if(forms[i].name == field)
                {
                        var toBuild = Math.floor(leftover / divideby) * divideby
                        if((divideby-1) == (leftover - toBuild))
                        {
                                toBuild += (divideby-1)
                        }
                        forms[i].value = (forms[i].value * 1) + (toBuild * 1)
                }
        }
};

function Empty(){
        var forms = document.getElementsByTagName('input');
        for(var i = 0; i< forms.length; i++)
        {
                if(forms[i].name)
                {
                        forms[i].value = 0;
                }
        }
};

function Distribute(divideby, freeland){
        Empty();
        var forms = document.getElementsByTagName('input');
        var divideover = 0
        for(var i = 0; i< forms.length; i++)
        {
                if(forms[i].checked)
                {
                        divideover += 1;
                }
        }
        var pertype = freeland / divideover
        for(var i = 0; i< forms.length; i++)
        {
                var checkname = "check" + forms[i].name;
                var checkbox = document.getElementById(checkname)
                if(checkbox)
                {
                        if(checkbox.checked)
                        {
                                forms[i].value = Math.floor(pertype / divideby) * divideby;
                        }
                }
        }
};

function fLand(){
        var TDs = document.getElementsByTagName("div");
        for(var i = 0; i< TDs.length; i++)
        {
                if(TDs[i].title.match("Planets"))
                {
                        return TDs[i].innerHTML.replace(/,/g , "").replace(/Land: /g , "");
                }
        }
};

function adRemoval(){
  var divs = document.getElementsByTagName("div")
  for(var i = 0; i< divs.length; i++){
    if(divs[i].className == "leader"){
      divs[i].parentNode.removeChild(divs[i]);
    }
  }
}

adRemoval()

var script = document.createElement("script");
script.type = "application/javascript";
script.innerHTML = ";" + CommaFormatted + Fill + Rest + Empty + Distribute + fLand + ";";
document.body.appendChild(script);