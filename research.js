function MaxScis()
{
        var tds = document.getElementsByTagName("form")[0] 
        if(tds)
        {
                var maintable = tds
                var cellHTML = tds.parentNode.innerHTML; 
                var lead = cellHTML.indexOf("scientists.<br>You have <b>");
                var posStart = lead + 27;
                var without_resource = cellHTML.substring(posStart, cellHTML.length);
                var posEnd = without_resource.indexOf("</b>");
                var maxScis = without_resource.substring(0, posEnd).replace(/,/g , "");

                var forms = document.getElementsByTagName('input');
                for(var i = 0; i< forms.length; i++) 
                {   
                        if(forms[i].name)
                        {
                                forms[i].parentNode.innerHTML += ' - <a href="javascript:Empty();Fill(' + forms[i].name + ',' + maxScis + ')">Max</a>';
                        }
                }
        }
}

MaxScis();

function SciStatusLink()
{
        var newElement = '<div id="scidiv" style="display:inline;">( <a href="javascript:ResearchStatus()" id="scilink" onclick="">Scientists Status</a> )</div>'

        var trs = document.getElementsByTagName("div")     
        for(var i = 0; i< trs.length; i++)
        {        
                if(trs[i].innerHTML.match("2000-2012 - BSG Online Games") && !trs[i].innerHTML.match("can get your scientists"))
                {     
                        trs[i].innerHTML = newElement + " " + trs[i].innerHTML;      
                }
        }
}

function ResearchStatus()
{
        var rLand = fLand()   
        var pph = 1
        pph = (Math.floor(pph * 100) / 100)
        var tds = document.getElementsByTagName("div") 
        
        
        for(var j = 0; j< tds.length; j++) 
        {                                    
                if(tds[j].innerHTML.match("you can get your scientists to research new technologies to better improve your kingdom")&&!tds[j].innerHTML.match("<div class=\"gameDiv\""))  
                { 
                        var maintable = tds[j]
                        var srows = maintable.getElementsByTagName("tr");       
                        if(srows)
                        {                                   
                                for(var i = 0; i< srows.length; i++) 
                                {                                                                                  
                                        var cellrow = srows[i];
                                        var cells = cellrow.cells;                       
                                        if(cellrow.innerHTML.match("<td colspan=\"6\">"))
                                        {               
                                                cellrow.innerHTML = '<td colspan="7"><input value="Research" class="button" type="submit"></td>';
                                        }
                                        if(cells[1])
                                        {                                                  
                                                var prequired = 0
                                                var leeway = 0
                                                var newElement = document.createElement("TD");       
                                                var currentPoints = cells[2].innerHTML.replace(/,/g , "");        
                                                if(cellrow.innerHTML.match("Population Bonus"))
                                                {                                                                
                                                        if(cellrow.innerHTML.match("21%")||cellrow.innerHTML.match("22%")||cellrow.innerHTML.match("23%")||cellrow.innerHTML.match("24%")||cellrow.innerHTML.match("25%")||cellrow.innerHTML.match("26%")||cellrow.innerHTML.match("27%")||cellrow.innerHTML.match("28%")||cellrow.innerHTML.match("29%")||cellrow.innerHTML.match("30%")||cellrow.innerHTML.match("31%")||cellrow.innerHTML.match("32%")||cellrow.innerHTML.match("33%")||cellrow.innerHTML.match("34%")||cellrow.innerHTML.match("35%")){
														leeway = Math.floor(Math.sqrt((currentPoints) / (0.0146457)) - rLand);
                                                        prequired = Math.floor(rLand * rLand * 0.0146457)
                                                        if(cells[2].innerHTML.replace(/,/g , "")<prequired)
                                                        {
                                                                cells[3].style.color = "#FF0000";
                                                        }
														}
														else{
														leeway = Math.floor(Math.sqrt((currentPoints) / (0.00932)) - rLand);       
                                                        prequired = Math.floor(rLand * rLand * 0.00932)   
                                                        if(cells[2].innerHTML.replace(/,/g , "")<prequired)
                                                        {
                                                                cells[3].style.color = "#FF0000";
                                                        }
														}
                                                }
                                                else if(cellrow.innerHTML.match("Power Bonus"))
                                                {
                                                        if(cellrow.innerHTML.match("51%")||cellrow.innerHTML.match("52%")||cellrow.innerHTML.match("53%")||cellrow.innerHTML.match("54%")||cellrow.innerHTML.match("55%")||cellrow.innerHTML.match("56%")||cellrow.innerHTML.match("57%")||cellrow.innerHTML.match("58%")||cellrow.innerHTML.match("59%")||cellrow.innerHTML.match("60%")||cellrow.innerHTML.match("61%")||cellrow.innerHTML.match("62%")||cellrow.innerHTML.match("63%")||cellrow.innerHTML.match("64%")||cellrow.innerHTML.match("65%")){
														leeway = Math.floor(Math.sqrt((currentPoints) / (0.010969)) - rLand);
                                                        prequired = Math.floor(rLand * rLand * 0.010969)
                                                        if(cells[2].innerHTML.replace(/,/g , "")<prequired)
                                                        {
                                                                cells[3].style.color = "#FF0000";
                                                        }
														}
														else{
														leeway = Math.floor(Math.sqrt((currentPoints) / (0.0062)) - rLand);
                                                        prequired = Math.floor(rLand * rLand * 0.0062)
                                                        if(cells[2].innerHTML.replace(/,/g , "")<prequired)
                                                        {
                                                                cells[3].style.color = "#FF0000";
                                                        }
														}
                                                }
                                                else if(cellrow.innerHTML.match("Military Bonus"))
                                                {
                                                        if(cellrow.innerHTML.match("31%")||cellrow.innerHTML.match("32%")||cellrow.innerHTML.match("33%")||cellrow.innerHTML.match("34%")||cellrow.innerHTML.match("35%")||cellrow.innerHTML.match("36%")||cellrow.innerHTML.match("37%")||cellrow.innerHTML.match("38%")||cellrow.innerHTML.match("39%")||cellrow.innerHTML.match("40%")||cellrow.innerHTML.match("41%")||cellrow.innerHTML.match("42%")||cellrow.innerHTML.match("43%")||cellrow.innerHTML.match("44%")||cellrow.innerHTML.match("45%")){
														leeway = Math.floor(Math.sqrt((currentPoints) / (0.01)) - rLand);
                                                        prequired = Math.floor(rLand * rLand * 0.01)
                                                        if(cells[2].innerHTML.replace(/,/g , "")<prequired)
                                                        {
                                                                cells[3].style.color = "#FF0000";
                                                        }
														}
														else{
														leeway = Math.floor(Math.sqrt((currentPoints) / (0.006)) - rLand);
                                                        prequired = Math.floor(rLand * rLand * 0.006)
                                                        if(cells[2].innerHTML.replace(/,/g , "")<prequired)
                                                        {
                                                                cells[3].style.color = "#FF0000";
                                                        }
														}
                                                }
                                                else if(cellrow.innerHTML.match("Money Bonus"))
                                                {
                                                        if(cellrow.innerHTML.match("26%")||cellrow.innerHTML.match("27%")||cellrow.innerHTML.match("28%")||cellrow.innerHTML.match("29%")||cellrow.innerHTML.match("30%")||cellrow.innerHTML.match("31%")||cellrow.innerHTML.match("32%")||cellrow.innerHTML.match("33%")||cellrow.innerHTML.match("34%")||cellrow.innerHTML.match("35%")||cellrow.innerHTML.match("36%")||cellrow.innerHTML.match("37%")||cellrow.innerHTML.match("38%")||cellrow.innerHTML.match("39%")||cellrow.innerHTML.match("40%")){
														leeway = Math.floor(Math.sqrt((currentPoints) / (0.0177125)) - rLand);
                                                        prequired = Math.floor(rLand * rLand * 0.0177125)
                                                        if(cells[2].innerHTML.replace(/,/g , "")<prequired)
                                                        {
                                                                cells[3].style.color = "#FF0000";
                                                        }
														}
														else{
														leeway = Math.floor(Math.sqrt((currentPoints) / (0.0109)) - rLand);
                                                        prequired = Math.floor(rLand * rLand * 0.0109)
                                                        if(cells[2].innerHTML.replace(/,/g , "")<prequired)
                                                        {
                                                                cells[3].style.color = "#FF0000";
                                                        }
														}
                                                }
                                                else if(cellrow.innerHTML.match("Frequency Decryption Center"))
                                                {
                                                        if(cellrow.innerHTML.match("26%")||cellrow.innerHTML.match("27%")||cellrow.innerHTML.match("28%")||cellrow.innerHTML.match("29%")||cellrow.innerHTML.match(0109*"30%")||cellrow.innerHTML.match("31%")||cellrow.innerHTML.match("32%")||cellrow.innerHTML.match("33%")||cellrow.innerHTML.match("34%")||cellrow.innerHTML.match("35%")||cellrow.innerHTML.match("36%")||cellrow.innerHTML.match("37%")||cellrow.innerHTML.match("38%")||cellrow.innerHTML.match("39%")||cellrow.innerHTML.match("40%")){
														leeway = Math.floor(Math.sqrt((currentPoints) / (0.027625)) - rLand);
                                                        prequired = Math.floor(rLand * rLand * 0.027625)
                                                        if(cells[2].innerHTML.replace(/,/g , "")<prequired)
                                                        {
                                                                cells[3].style.color = "#FF0000";
                                                        }
														}
														else{
														leeway = Math.floor(Math.sqrt((currentPoints) / (0.017)) - rLand);
                                                        prequired = Math.floor(rLand * rLand * 0.017)
                                                        if(cells[2].innerHTML.replace(/,/g , "")<prequired)
                                                        {
                                                                cells[3].style.color = "#FF0000";
                                                        }
														}
                                                }
                                                else if(cellrow.innerHTML.match("Reactor Warp Core Efficiency"))
                                                {
												if(cellrow.innerHTML.match("21%")||cellrow.innerHTML.match("22%")||cellrow.innerHTML.match("23%")||cellrow.innerHTML.match("24%")||cellrow.innerHTML.match("25%")||cellrow.innerHTML.match("26%")||cellrow.innerHTML.match("27%")||cellrow.innerHTML.match("28%")||cellrow.innerHTML.match("29%")||cellrow.innerHTML.match("30%")||cellrow.innerHTML.match("31%")||cellrow.innerHTML.match("32%")||cellrow.innerHTML.match("33%")||cellrow.innerHTML.match("34%")||cellrow.innerHTML.match("35%")){
														leeway = Math.floor(Math.sqrt((currentPoints) / (0.0160285714285714)) - rLand);
                                                        prequired = Math.floor(rLand * rLand * 0.0160285714285714)
                                                        if(cells[2].innerHTML.replace(/,/g , "")<prequired)
                                                        {
                                                                cells[3].style.color = "#FF0000";
                                                        }
														}
														else{
                                                        leeway = Math.floor(Math.sqrt((currentPoints) / (0.0102)) - rLand);
                                                        prequired = Math.floor(rLand * rLand * 0.0102)
                                                        if(cells[2].innerHTML.replace(/,/g , "")<prequired)
                                                        {
                                                                cells[3].style.color = "#FF0000";
                                                        }
														}
                                                } 
                                                else if(cellrow.innerHTML.match("Dragoons") && ! cellrow.innerHTML.match("Laser"))
                                                {
                                                        prequired = 60000
                                                }
                                                else if(cellrow.innerHTML.match("Laser Dragoons"))
                                                {
                                                        prequired = 72000
                                                }
                                                else if(cellrow.innerHTML.match(">Fighters"))
                                                {
                                                        prequired = 150000
                                                } 
                                                else if(cellrow.innerHTML.match("S.C.O.U.T.E.R."))
                                                {
                                                        prequired = 15000
                                                }
                                                else if(cellrow.innerHTML.match("Vesudian Core"))
                                                {
                                                        prequired = 500000
                                                }
                                                else if(cellrow.innerHTML.match("Fusion Technology"))
                                                {
                                                        prequired = 30000
                                                } 
                                                else if(cellrow.innerHTML.match("Energy Core"))
                                                {
                                                        prequired = 50000
                                                } 
                                                else if(cellrow.innerHTML.match("Probe"))
                                                {
                                                        prequired = 92000
                                                } 
                                                else if(cellrow.innerHTML.match("Longevity"))
                                                {
                                                        prequired = 100000
                                                }                      
                                                if(prequired>0)
                                                {                                                                                                

                                                        var scis = cells[1].innerHTML.replace(/,/g , "")        
                                                        var points = cells[2].innerHTML.replace(/,/g , "")
                                                        cells[2].innerHTML = currentPoints + ' / ' + CommaFormatted(prequired)   
                                                                                       
                                                        var hleft = CommaFormatted(Math.ceil((prequired - points) / (scis * pph)))      
                                                        if(!hleft)
                                                        {
                                                                hleft = "Infinite"  
                                                        }
                                                        if(points >= prequired)
                                                        {
                                                                hleft = "Completed"
                                                        }
                                                        if(leeway > 0)
                                                        {
                                                                hleft = leeway + " Land"
                                                        } 
                                                        else
                                                        {
                                                                if(hleft!="Infinite" && hleft!="Completed")
                                                                {
                                                                        hleft += " Hours";
                                                                }
                                                        }
                                                        newElement.innerHTML = hleft
                                                        cells[2].parentNode.insertBefore(newElement, cells[3].nextSibling);
                                                }


                                                if(cellrow.innerHTML.match("Number of scientists"))
                                                {    
                                                        cells[1].innerHTML = "Number of Scis"
                                                        cells[2].innerHTML = "Points / Required"                                          
                                                        newElement.innerHTML = 'Hours Left/Leeway'
                                                        cells[2].parentNode.insertBefore(newElement, cells[3].nextSibling);                                                                          
                                                }
                                        }
                                }
                        }
                }
        }    
document.getElementById("scilink").href = "http://www.starkingdoms.com/game/terranova/research/"
}

  var script2 = document.createElement("script");
  script2.type = "application/javascript";
  script2.innerHTML = ";" + SciStatusLink + ResearchStatus + ";ResearchStatus(); ";
  document.body.appendChild(script2);