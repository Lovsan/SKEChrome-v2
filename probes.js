var server = document.URL.split("/")[4];

var links = document.getElementsByTagName("A");
for(var i = 0; i< links.length; i++){
  if(links[i].href.match("whois")){
    linkdata = links[i].href.split("/")
	links[i].href = 'http://www.starkingdoms.com/game/' + server + '/whois/' + linkdata[4]
  }
}

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

function addLink(){
newElement = document.createElement("div");
newElement.innerHTML = '<div><a href="#" id="removeprobes" onclick="localStorage[' + 
"'remove'" +
']=' + "'yes';" + '">Remove probes and losses</a>&nbsp;|&nbsp;|&nbsp;<a href="#" id="donotremoveprobes" onclick="localStorage[' + 
"'remove'" +
']=' + "'no';" + '">Do not remove probes and losses</a></div>';
document.getElementsByTagName("table")[0].parentNode.insertBefore(newElement, document.getElementsByTagName("table")[0].nextSibling);
}
		//addLink();

function removeProbes(){
var removed = localStorage["remove"];
if(removed == "yes"){
var table = document.getElementsByTagName("tbody")[0];
var TRs = table.getElementsByTagName("tr");

for (var i = 0; i< TRs.length; i++){
var TDs = TRs[i].getElementsByTagName("td");
try{
TDs[3].innerHTML = "";
TDs[4].innerHTML="";}
catch(e){}
}
}
}

//removeProbes();

function MaxProbes()
{
	var tds = document.getElementsByTagName("form")[0];
	if(tds)
	{
		var cellHTML = tds.innerHTML;
		
		var lead = cellHTML.indexOf("total of <b>");
		var posStart = lead + 12;
		var without_resource = cellHTML.substring(posStart, cellHTML.length);
		var posEnd = without_resource.indexOf("</b>");
		var maxProbes = without_resource.substring(0, posEnd);
		var MaxProbes = maxProbes.replace(/,/g , "");
		var Land = fLand();
		var ratio = Math.floor(MaxProbes / Land);
		var MaxTarget = Math.floor(MaxProbes / 8);
		var MinTarget = Math.floor(MaxProbes / 16);
		var PowerNeeded = Math.max(MaxProbes * 2);
		var newElement;
		var form = document.getElementsByName("amount")[0];
		
		newElement = document.createElement("div");
		newElement.innerHTML = '<div>' + 
		'<a href="javascript:void(null)" onclick="var form = document.getElementsByName(' +
		"'amount'" +
		')[0];form.value = ' +
		MaxProbes + 
		'">Send All</a>' +
		'<br><b>Probe ratio: </b>' +
		ratio +
		' probes/land.' +
		'<br><b>Probes divided by 8:</b> ' +
		MaxTarget +
		' land.' +
		'<br><b>Probes divided by 16:</b> ' +
		MinTarget +
		' land.<br>' +
		'<b>Power Needed to Shield Probes:</b> ' + PowerNeeded + '<br>' +
		'</div>' ;
		form.parentNode.insertBefore(newElement, form.nextSibling);	
}
        
MaxProbes();

