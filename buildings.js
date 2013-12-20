var cntBay;

function getBarracks(){
	var rax = document.getElementsByTagName("form")[0];
	if(rax)
		{
		var table = rax.getElementsByTagName("tr")
		var cntNumRax = 0;
		var cntNumBay = 0;
		for(var i = 1; i< table.length; i++)
			{
			var cellrow = table[i];
			var cells = cellrow.cells;
			var NUnits = cells[1]
			if(cells[1])
				{
					NUnits = NUnits.innerHTML.replace(/,/g , "")
				}
			if(cellrow.innerHTML.match(">Barracks"))
				{
					cntNumRax = (cntNumRax + (NUnits * 1));
				}
			else if(cellrow.innerHTML.match(">Air Support Bay"))
				{
					cntNumBay = (cntNumBay + (NUnits * 1));
				}
			}
		}
	cntBay = cntNumBay;
	return cntNumRax;
}

var cntRax = getBarracks();

function Freeland(){
        var tds = document.getElementsByTagName("div")
        if(tds)
        {
                for(var i = 0; i< tds.length; i++)
                { 
                        if(tds[i].innerHTML.match("planets</span> to develop"))
                        { 
                                var cellHTML = tds[i].innerHTML; 
                                var lead = cellHTML.indexOf("enough resources to develop <span class=\"planet\"><b>");   
                                var posStart = lead + 52;
                                var without_resource = cellHTML.substring(posStart, cellHTML.length);
                                var posEnd = without_resource.indexOf("</b>");     
                                var maxBuild = without_resource.substring(0, posEnd);
                                var MaxBuild = maxBuild.replace(/,/g , "") * 1;
                                var returnValue = Math.floor(MaxBuild / 16) * 16;
                                if((MaxBuild - returnValue) == 15)
                                {
                                        returnValue += 15;
                                }    
								var returnArray = new Array(returnValue,maxBuild)
                                return returnArray;
                        }
                }
        }
}
function LandLeft(){
        var form = document.getElementsByTagName("form")[0];
        var LeftDiv = document.createElement("p")
        LeftDiv.innerHTML = "You want to build <b id=leftover>0</b> of your <b id=original>" + FreeLand[1] + "</b> Land, leaving <b id=leave>" + FreeLand[1] + "</b> land."; 
        form.parentNode.insertBefore(LeftDiv, form)
}
function Usedup(){
        var forms = document.getElementsByTagName('input');
        var Used = 0
        for(var i = 0; i< forms.length; i++) 
        {
                if(forms[i].name)
                {
                        Used += (forms[i].value * 1)
                }
        }
        var placement = document.getElementById("leftover")
        if(placement)
        {
                placement.innerHTML = Used;
                var total = document.getElementById("original")
                var left = document.getElementById("leave")
                left.innerHTML = CommaFormatted((total.innerHTML * 1) - Used)
        }
};

function BuildLinks(){
  var tables = document.getElementsByTagName("table")           
  for(var i = 0; i< tables.length; i++){                                                                                                        
    if(tables[i].innerHTML.match("<td>Building name</td>")){                                                                                          
    tables[i].innerHTML = tables[i].innerHTML.replace('colspan="4"','colspan="5"');    
    tables[i].innerHTML = tables[i].innerHTML.replace('colspan="4"','colspan="5"');                
    var newElement = document.createElement("TD");
    newElement.innerHTML = "Percentage Of Land"
    tables[i].rows[0].insertBefore(newElement, tables[i].rows[0].cells[1]);   
    }                                                        
  }
  var forms = document.getElementsByTagName('input');   
  for(var i = 0; i< forms.length; i++) {
    if(forms[i].name && !(forms[i].type == "checkbox")){
      var amount = FreeLand[0];
      var buildingType = forms[i].parentNode.parentNode.cells[0];
      var quantity = forms[i].parentNode.parentNode.cells[1].innerHTML.replace(/,/g , "") * 1
      var land = fLand()  					
      var percentage = (Math.round((quantity / land) * 10000))/100;
      var temp = buildingType.innerHTML;
      var newElement = document.createElement("TD");
      newElement.innerHTML = percentage + "%"
      forms[i].parentNode.parentNode.insertBefore(newElement, forms[i].parentNode.parentNode.cells[1]);
      forms[i].parentNode.innerHTML += ' - <a href="javascript:Empty();Fill(' + forms[i].name + ',' + amount + ')">Max</a> - <a href="javascript:Rest(' + forms[i].name + ',' + amount + ',16)">Rest</a> - <INPUT TYPE=CHECKBOX id=check' + forms[i].name + ' onchange="Distribute(16,' + amount + ')"> Distribute';
      }
    }
  var table = document.getElementsByTagName('table');   
}

if(!window.location.href.match("raze") && !window.location.href.match("convert") && !window.location.href.match("upgrade")){
  var FreeLand = Freeland()
  LandLeft()     
  //MaxBuilding()
  
  var script2 = document.createElement("script");
  script2.type = "application/javascript";
  script2.innerHTML = ";" + Usedup + BuildLinks + Freeland + ";setInterval('Usedup()',200);var FreeLand = Freeland();BuildLinks(); ";
  document.body.appendChild(script2);
}

localStorage["rax_count"] = cntRax;
localStorage["bay_count"] = cntBay;