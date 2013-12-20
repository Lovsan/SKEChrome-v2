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

function DivisionNumber(){
  var tds = document.getElementsByTagName("div")
  if(tds){
    for(var i = 0; i< tds.length; i++){
      if(tds[i].innerHTML.match("It will take <b>12</b>")){return 12}
      if(tds[i].innerHTML.match("It will take <b>24</b>")){return 24}
    }
  }
}

var DivideBy = DivisionNumber();
var MinDefense = 0
var MinOffense = 0
var NTanks = 0
var OTFs = 0
var raxCount = 0
var cntRaxSpace = 0;
var cntBaySpace = 0;

function MaxSoldiers(){
        var tds = document.getElementsByTagName("form")[0]
        if(tds)
        {
                var cellHTML = tds.innerHTML;

                var lead = cellHTML.indexOf("maximum of <b>");
                var lead2 = cellHTML.indexOf("You currently have <b>");
				var posStart = lead + 14;
				var posStart2 = lead2 + 22;
                var without_resource = cellHTML.substring(posStart, cellHTML.length);
				var without_resource2 = cellHTML.substring(posStart2, cellHTML.length);
                var posEnd = without_resource.indexOf("</b>");
				var posEnd2 = without_resource2.indexOf("</b>");
                var maxSoldiers = without_resource.substring(0, posEnd);
                var MaxSoldiers = maxSoldiers.replace(/,/g , "");
				var cntSoldiers = without_resource2.substring(0, posEnd2);
				var CntSoldiers = cntSoldiers.replace(/,/g , "");
				cntRaxSpace = ((cntRaxSpace * 1) + (1 * CntSoldiers));
                var form = document.getElementsByName("amount")[0]; // Find the 'units' box
                var TrainMaxSoldiers = Math.floor(MaxSoldiers / DivideBy) * DivideBy
                var Remainder = (MaxSoldiers-TrainMaxSoldiers)
                if(Remainder==(DivideBy-1))
                {
                        TrainMaxSoldiers += (DivideBy-1);
                }

                lead = cellHTML.indexOf("You currently have <b>");
                posStart = lead + 22;
                without_resource = cellHTML.substring(posStart, cellHTML.length);
                posEnd = without_resource.indexOf("</b>");
                var trSoldiers = without_resource.substring(0, posEnd);
                document.body.innerHTML = document.body.innerHTML.replace("of <b>" + maxSoldiers + "</b> soldiers","of <b>" + '<a href="javascript:void(null)" onclick="var form = document.getElementsByName(' + "'amount'" + ')[0];form.value = ' + TrainMaxSoldiers + '">' + maxSoldiers + ' soldiers</a>' + "</b>");
        }
}

function MaxElite(){
        var mainform = document.getElementsByTagName("form")[1]
        if(mainform)
        {
                var cellHTML = mainform.parentNode.innerHTML
                var lead = cellHTML.indexOf("You have <b>");
                var posStart = lead + 12;
                var without_resource = cellHTML.substring(posStart, cellHTML.length);
                var posEnd = without_resource.indexOf("</b>");
                var Soldiers = without_resource.substring(0, posEnd);
                MinDefense += (Soldiers.replace(/,/g , "") * 1)
                MinOffense += (Soldiers.replace(/,/g , "") * 1)
				cntRaxSpace = ((cntRaxSpace * 1) + (1 * Soldiers.replace(/,/g , "")));
                var trainingTTL = 0;
                var table = mainform.getElementsByTagName("tr")
                for(var i = 1; i< table.length; i++)
                {
                        var cellrow = table[i];
                        var cells = cellrow.cells;
                        var NUnits = cells[1]
                        var Trainunits = cells[3]
                        var Maxunits = cells[4]

                        var unitID = 0;
                        if(cells[1])
                        {
                                NUnits = NUnits.innerHTML.replace(/,/g , "")
                                Trainunits = Trainunits.innerHTML.replace(/,/g , "")
                                Maxunits = Maxunits.innerHTML.replace(/,/g , "")
                                var Train_Maxunits = Math.floor(Maxunits / DivideBy) * DivideBy
                                var Remainder = (Maxunits-Train_Maxunits)
                                if(Remainder==(DivideBy-1))
                                {
                                        Train_Maxunits += (DivideBy-1);
                                }
                        }
                        if(cellrow.innerHTML.match(">Trooper"))
                        {
                                cells[4].innerHTML = '<a href="javascript:void(null)" onclick="Empty(); var form = document.getElementsByName(' + "'1'" + ')[0];form.value = ' + Train_Maxunits + '">' + Maxunits + '</a>';
                                MinOffense += (4 * NUnits)
								cntRaxSpace = (cntRaxSpace + (NUnits * 1));
								cntRaxSpace = (cntRaxSpace + (Trainunits * 1));
                                unitID = 1;
                        }
                        else if(cellrow.innerHTML.match("Laser Trooper"))
                        {
                                cells[4].innerHTML = '<a href="javascript:void(null)" onclick="Empty(); var form = document.getElementsByName(' + "'2'" + ')[0];form.value = ' + Train_Maxunits + '">' + Maxunits + '</a>';
                                MinDefense += (4 * NUnits)
								cntRaxSpace = (cntRaxSpace + (NUnits * 1));
								cntRaxSpace = (cntRaxSpace + (Trainunits * 1));
                                unitID = 2;
                        }
                        else if(cellrow.innerHTML.match(">Dragoons"))
                        {
                                cells[4].innerHTML = '<a href="javascript:void(null)" onclick="Empty(); var form = document.getElementsByName(' + "'3'" + ')[0];form.value = ' + Train_Maxunits + '">' + Maxunits + '</a>';
                                MinOffense += (5 * NUnits)
								cntRaxSpace = (cntRaxSpace + (NUnits * 1));
								cntRaxSpace = (cntRaxSpace + (Trainunits * 1));
                                unitID = 3;
                        }
                        else if(cellrow.innerHTML.match("Laser Dragoons"))
                        {
                                cells[4].innerHTML = '<a href="javascript:void(null)" onclick="Empty(); var form = document.getElementsByName(' + "'4'" + ')[0];form.value = ' + Train_Maxunits + '">' + Maxunits + '</a>';
                                MinDefense += (5 * NUnits)
								cntRaxSpace = (cntRaxSpace + (NUnits * 1));
								cntRaxSpace = (cntRaxSpace + (Trainunits * 1));
                                unitID = 4;
                        }
                        else if(cellrow.innerHTML.match("Tanks"))
                        {
                                cells[4].innerHTML = '<a href="javascript:void(null)" onclick="Empty(); var form = document.getElementsByName(' + "'5'" + ')[0];form.value = ' + Train_Maxunits + '">' + Maxunits + '</a>';
                                NTanks = (NUnits * 9)
								cntRaxSpace = (cntRaxSpace + (NUnits * 2));
								cntRaxSpace = (cntRaxSpace + (Trainunits * 2));
                                unitID = 5;
                        }
                        else if(cellrow.innerHTML.match("Tactical Fighters"))
                        {
                                cells[4].innerHTML = '<a href="javascript:void(null)" onclick="Empty(); var form = document.getElementsByName(' + "'6'" + ')[0];form.value = ' + Train_Maxunits + '">' + Maxunits + '</a>';
                                MinOffense += (12 * NUnits)
								cntBaySpace = (cntBaySpace + (NUnits * 1));
								cntBaySpace = (cntBaySpace + (Trainunits * 1));
                                unitID = 6;

                        }
                        else if(cellrow.innerHTML.match("Fighters"))
                        {
                                cells[4].innerHTML = '<a href="javascript:void(null)" onclick="Empty(); var form = document.getElementsByName(' + "'7'" + ')[0];form.value = ' + Train_Maxunits + '">' + Maxunits + '</a>';
                                MinOffense += (6 * NUnits)
								cntRaxSpace = (cntRaxSpace + (NUnits * 1));
								cntRaxSpace = (cntRaxSpace + (Trainunits * 1));
                                unitID = 7;
                        }
                        else if(cellrow.innerHTML.match("Scientist"))
                        {
                                cells[4].innerHTML = '<a href="javascript:void(null)" onclick="Empty(); var form = document.getElementsByName(' + "'8'" + ')[0];form.value = ' + Train_Maxunits + '">' + Maxunits + '</a>';
								cntRaxSpace = (cntRaxSpace + (NUnits * 1));
								cntRaxSpace = (cntRaxSpace + (Trainunits * 1));
                                unitID = 8;
                        }



                        if(cells[6])
                        {
                                var box = cellrow.getElementsByTagName("input")[0];
                                if(box)
                                {
                                        var Type = box.parentNode.parentNode.cells[0]
                                        if(Type.innerHTML.match("Tactical Fighters"))
                                        {
                                                OTFs = box.parentNode.parentNode.cells[6].innerHTML.replace(/,/g , "") * 1
                                                //          var EliteUnits = cells[5].innerHTML.replace(/,/g , "");
                                                //          var Realunits = cells[5].innerHTML;
                                                //          var EliteUnits = Math.floor(EliteUnits / DivideBy) * DivideBy
                                                //          newElement.innerHTML = '<a href="javascript:void(null)" onclick="var form = document.getElementsByName(' + box.name + ');form[0].value = ' + EliteUnits + '">' + Realunits + '</a>'
                                                //          cells[5].parentNode.replaceChild(newElement, cells[5])
                                        }
                                }
                        }
                }
        }
}

function MilitaryTotals(){
        var militaryTTL = (MinDefense + MinOffense + NTanks);
        var mland = fLand();
        var MinMax = document.getElementsByTagName("form")[0]
        if(MinMax)
        {
                var offenseTPL_Min = Math.floor((MinOffense / 9) / mland * 100) /100;
                var offenseTPL_Max = Math.floor(((MinOffense + NTanks) / 9) / mland * 100) /100;
                var defenseTPL_Min = Math.floor((MinDefense / 9) / mland * 100) /100;
                var defenseTPL_Max = Math.floor(((MinDefense + NTanks) / 9) / mland * 100) /100;
                var minDefPct =  Math.floor((MinDefense/militaryTTL)*10000)/100;
                var maxDefPct = Math.floor(((MinDefense + NTanks)/militaryTTL)*10000)/100;
                var minOffPct = Math.floor((MinOffense/militaryTTL)*10000)/100;
                var maxOffPct = Math.floor(((MinOffense + NTanks)/militaryTTL)*10000)/100;
                var newElement = document.createElement("table");
                newElement.style.borderSpacing = "0";
                newElement.style.width = "60%";
                newElement.innerHTML = '<tr class="th"><td align="center">Military (In Tanks)</td><td align="center">Minimum</td><td align="center">Maximum</td><td align="center" colspan="2" nowrap>Per Land (Min/Max)</td><td align="center" width="130">Min %</td><td align="center" width="130">Max %</td></tr>' +
                '<tr><td><b>Defense: </b></td><td>' + CommaFormatted(Math.floor(MinDefense / 9)) +
                '</td><td>' + CommaFormatted(Math.floor((MinDefense + NTanks)  / 9)) + '</td>' +
                '<td>' + defenseTPL_Min + '</td><td>' + defenseTPL_Max + '</td>' +
                '<td>' + minDefPct + '%</td>' +
                '<td>' + maxDefPct + '%</td>' +
                '</tr><tr><td><b>Offense: </b></td><td>' + CommaFormatted(Math.floor(MinOffense / 9)) +
                '</td><td>' + CommaFormatted(Math.floor((MinOffense + NTanks) / 9)) + '</td>' +
                '<td>' + offenseTPL_Min + '</td><td>' + offenseTPL_Max + '</td>' +
                '<td>' + minOffPct + '%</td>' +
                '<td>' + maxOffPct + '%</td>' +
                '</tr><tr><td><b>Total Military: </b></td><td colspan="2" align="center">' + CommaFormatted(Math.floor(militaryTTL /9)) + '</td><td colspan="2" align="center">' + (Math.floor((((MinOffense + MinDefense + NTanks)/9)/mland)*100)/100) + '</td><td colspan="2" align="center">Defense should always be above 60%</td></tr>'

                MinMax.parentNode.insertBefore(newElement, MinMax.nextSibling);
                var newP = document.createElement("p")
                MinMax.parentNode.insertBefore(newP, MinMax.nextSibling);

        }
}

var server = document.URL.split("/")[4];
MaxSoldiers();
MaxElite();
MilitaryTotals();

localStorage["mil_count"] = cntRaxSpace;
localStorage["tfs_count"] = cntBaySpace;

var script2 = document.createElement("script");
script2.type = "application/javascript";
script2.innerHTML = ";var OTFs = " + OTFs + ";" + ";" + DivisionNumber + ";";
document.body.appendChild(script2);
