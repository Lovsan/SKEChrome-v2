function fLand(){
        var TDs = document.getElementsByTagName("div");
        for(var i = 0; i< TDs.length; i++)
        {
                if(TDs[i].title.match("Planets"))
                {
                        return TDs[i].innerHTML.replace(/,/g , "").replace(/Land: /g , "");
						console.log(TDs[i]);
                }
        }
};
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
function MaxProbes()
{
        var tds = document.getElementsByTagName("td")
        if(tds)
        {
                for(var i = 0; i< tds.length; i++)
                {
                        if(tds[i].innerHTML.match("You can send out your probes") && !tds[i].innerHTML.match("you can send out your probes to explore or infiltrate the enemy."))
                        {
                                var PLink, newElement;
                                PLink = document.getElementsByName("amount")[0];
                                if (PLink)
                                {
                                        var cellHTML = tds[i].innerHTML;

                                        var lead = cellHTML.indexOf("You have a total of <b>");
                                        var posStart = lead + 23;
                                        var without_resource = cellHTML.substring(posStart, cellHTML.length);
                                        var posEnd = without_resource.indexOf("</b>");
                                        var maxProbes = without_resource.substring(0, posEnd);
                                        var MaxProbes = maxProbes.replace(/,/g , "");
                                        var Land = fLand();
                                        var ratio = Math.floor(MaxProbes / Land)
										var MinTarget = Math.floor(MaxProbes / 16);
                                        var MaxTarget = Math.floor(MaxProbes / 8);
                                        newElement = document.createElement("div");
                                        newElement.innerHTML = 
										'<br><div>' + '<a href="javascript:void(null)" onclick="var box = document.getElementsByName(' + "'amount'" + ')[0];box.value = ' + MaxProbes + '">Send all probes</a>' + 
										'<br><b>Probe ratio: </b>' + ratio + '<br>' +
										'<b>Probes divided by 8:</b> ' + MaxTarget +	' land.' + '<br><b>Probes divided by 16:</b> ' + MinTarget + ' land.</div>';
                                        PLink.parentNode.insertBefore(newElement, PLink.nextSibling);
                                        var amountValue = document.getElementsByName('amount')[0].value;
                                        if(amountValue=='')
                                        {
                                                document.getElementsByName('amount')[0].value = MaxProbes;
                                        }
                                }

                        }
                }
        }
}
function GetForums()
{
        var invocation = new XMLHttpRequest();
        var server = window.location.href.split("/")[4];
        var url = 'http://www.starkingdoms.com/game/' + server + '/allianceforums/';
        if(invocation)
        {
                invocation.open('GET', url, true);
                invocation.onreadystatechange = function()
                {
                        if(invocation.readyState == 4)
                        {
                                if(invocation.status == 200)
                                {
                                        var response = invocation.responseText;
                                        if(response.match("Your Sector is not in an Alliance.<br><br></span>"))
                                        {
                                                return false;
                                        }
                                        var Divs = document.getElementsByName('SubmitToForums');
                                        for(x=0;x<Divs.length;x++)
                                        {
                                                Divs[x].innerHTML = '<p><form onSubmit="return SubmitToForums(this);"><textarea name="extrainfo" style="height: 16px; width: 400px; padding: 3px; color: #232323;" onFocus="if(this.value==\'Additional Information...\') { this.value=\'\'; this.style.color=\'#FFFFFF\'; }" onBlur="if(this.value==\'\') { this.style.color=\'#232323\'; this.value=\'Additional Information...\'; }">Additional Information...</textarea><p><select name="forum_id"><option value=""></option></select> <input type="Submit" name="Submit" value="Post In Forums"></form>';
                                        }
                                        var Select = document.getElementsByName('forum_id');
                                        var lines = response.split("\n");
                                        var i=0;
                                        for(x=0;x<lines.length;x++)
                                        {
                                                var matches = lines[x].match(/<tr align=center><td align=left>&nbsp;&nbsp;(.*?)<a href=\"http:\/\/www.starkingdoms.com\/game\/([A-Za-z0-9]+)\/allianceforums\/\?view-thread=([0-9]*?)&cache=([0-9]*?)\">(.*?)<\/a>/i);
                                                if(matches&&!lines[x].match("&nbsp;&nbsp;Locked: "))
                                                {
                                                        for(j=0;j<Select.length;j++)
                                                        {
                                                                var tname = matches[5].replace(/(&(.*?);)/gi,"");
                                                                Select[j].options[i] = new Option(tname, matches[3], false, false);
                                                        }
                                                        i++;
                                                }
                                        }
                                }
                        }
                }
                invocation.send();
        }
}
function GetStatLine(name,link)
{
        var invocation = new XMLHttpRequest();
        var server = window.location.href.split("/")[4];
        var url = 'http://www.starkingdoms.com/game/' + server + '/viewsector/?' + link;
        if(invocation)
        {
                invocation.open('GET', url, true);
                invocation.onreadystatechange = function()
                {
                        if(invocation.readyState == 4)
                        {
                                if(invocation.status == 200)
                                {
                                        var statline = "<b><u>Kingdom Information:</u></b><br>";
                                        var response = invocation.responseText;
                                        response = response.replace(/<img src="(.+?)">/gi,"\t")
                                        response = response.replace(/<a href=\"http:\/\/www.starkingdoms.com\/game\/([A-Za-z0-9]+)\/sendmessages\/\?(.+?)\"(.+?)>/gi,"<position>$2</position>");
                                        response = response.replace(/<a href="(.+?)">/gi,"\t")
                                        response = response.replace(/<\/a>/gi,"\t")
                                        var lines = response.split("\n");
                                        var i=0;
                                        var divID = "";
                                        for(x=0;x<lines.length;x++)
                                        {
                                                //
                                                                            //<tr align="left" class="newbie"><td><position>l=1:8&p=3</position>                </td></tr>
                                                var matches = lines[x].match(/<tr align=\"left\" class=\"(.*?)\"><td>\t(([A-Za-z0-9 ]{2,40}) \(X:[0-9]{1,2},Y:[0-9]{1,2}\)) @?\t<\/td><td>\t([A-Za-z ]{1,30})\t<\/td><td>\t([0-9,]+)\t<\/td><td>\t([0-9,]+)\t<\/td><td>([0-9,]+)<\/td><td align=center>\t\t\t\t\t\t\t\t\t<position>(.*?)<\/position>\t\t<\/td><\/tr>/i);
                                                if(matches)
                                                {

                                                        if(link==matches[8])
                                                        {
                                                                statline += matches[2] + " " + matches[4] + " " + matches[5] + " " + matches[6] + " " + matches[7];
                                                                divID = matches[3].replace(/ /gi,"_");
                                                                if(matches[1]=="sl")
                                                                {
                                                                        statline += "<br><b>Sector Leader</b>";
                                                                }
                                                        }
                                                }
                                        }
                                        if(response.match("<br><br>Sector state: \tDefensive\t<br><br>"))
                                        {
                                                statline += "<br><b>Sector State:</b> Defensive";
                                        }
                                        if(response.match("\Sector Defense\t<br>"))
                                        {
                                                statline += "<br><b>Sector Enhancement:</b> Sector Defense";
                                        }
                                        document.getElementById(divID).innerHTML = statline;
                                }
                        }
                }
                invocation.send();
        }
}


function fillHistory()
{
        var Tables = document.getElementsByTagName("table");
        var kingdoms = new Array();
        if(Tables)
        {
                for(var i = 0; i< Tables.length; i++)
                {
                        if(Tables[i].innerHTML.match("<td>Date</td>") && !Tables[i].innerHTML.match("you can send out your probes to explore or infiltrate the enemy."))
                        {
                                var TRs = Tables[i].getElementsByTagName("tr")
                                for(var j = 1; j< TRs.length; j++)
                                {
                                        if(TRs[j].cells[2])
                                        {
                                                if(TRs[j].cells[2].innerHTML.match("Spy on Kingdom")&&!TRs[j].cells[5].innerHTML.match("Failure"))
                                                {
                                                        var Form_string = "";
                                                        var matches = TRs[j].cells[1].innerHTML.match(/<a href=\"\/whois\/\?(.*?)\">(([A-Za-z0-9 ]{1,26}) \(([0-9]{1,2}):([0-9]{1,2})\))<\/a>/i);
                                                        var sector_link = matches[1].replace("&amp;","&");
                                                        var divID = matches[3].replace(/ /gi,"_");
                                                        Form_string += "[b]" + matches[2] + "[/b]\r\n";
                                                        Form_string += TRs[j].cells[0].innerHTML + "\r\n";
                                                        var kingdom_link = matches[1].replace("&amp;","&");
                                                        Form_string += "[k]" + kingdom_link + "[/k]" + "\r\n";
                                                        Form_string += "[statline]\r\n";
                                                        Form_string += "\r\n[comments]\r\n";
                                                        Form_string += TRs[j].cells[5].innerHTML.replace(/\n/gi,"").replace(/<br>/gi,"\r\n").replace(/<(.*?)>/gi,"").replace(/<\/(.*?)>/gi,"").replace(/\t/gi,"").replace(/&nbsp;/gi,"");
                                                        Form_string += "\r\n\r\n[i]Information posted using Ske Chrome Extension 0.4.7\r\nAvailable at [url]http://skarchive.net76.net/ske/][/i]";
                                                        TRs[j].cells[5].innerHTML += '<p><div><div id="' + divID + '"><img src="http://www.skarchive.net76.net/loader.gif" height="20" width="90"></div><div display:none;>' + Form_string + '</div><p><div  name="SubmitToForums"></div><p>';
                                                        GetStatLine(matches[3],sector_link);
                                                }
                                                if(TRs[j].cells[2].innerHTML.match("Spy on Military")&&!TRs[j].cells[5].innerHTML.match("Failure"))
                                                {
                                                        var current_defense = 0;
                                                        var min_offense = 0;
                                                        var max_offense = 0;
                                                        var total_military = 0;
                                                        var units_home = 0;
                                                        var units_total = 0;
                                                        var TRs2 = TRs[j].cells[5].getElementsByTagName("tr")
                                                        for(var x = 1; x< TRs2.length; x++)
                                                        {
                                                                // This is a rom within the som.
                                                                units_home = Number(TRs2[x].cells[1].innerHTML.replace(/,/g , ""));
                                                                units_total = Number(TRs2[x].cells[1].innerHTML.replace(/,/g , "")) + Number(TRs2[x].cells[2].innerHTML.replace(/,/g , "")) + Number(TRs2[x].cells[3].innerHTML.replace(/,/g , "")) + Number(TRs2[x].cells[4].innerHTML.replace(/,/g , "")) + Number(TRs2[x].cells[5].innerHTML.replace(/,/g , ""));
                                                                if(TRs2[x].cells[0].innerHTML.match("Soldiers"))
                                                                {
                                                                        current_defense += (units_home);
                                                                        total_military += (units_total);
                                                                        max_offense += (units_total);
                                                                }
                                                                if(TRs2[x].cells[0].innerHTML.match("Troopers")&&!TRs2[x].cells[0].innerHTML.match("Laser"))
                                                                {
                                                                        total_military += (units_total*4);
                                                                        min_offense += (units_total*4);
                                                                        max_offense += (units_total*4);
                                                                }
                                                                if(TRs2[x].cells[0].innerHTML.match("Dragoons")&&!TRs2[x].cells[0].innerHTML.match("Laser"))
                                                                {
                                                                        total_military += (units_total*5);
                                                                        min_offense += (units_total*5);
                                                                        max_offense += (units_total*5);
                                                                }
                                                                if(TRs2[x].cells[0].innerHTML.match("Fighters"))
                                                                {
                                                                        total_military += (units_total*6);
                                                                        min_offense += (units_total*6);
                                                                        max_offense += (units_total*6);
                                                                }
                                                                if(TRs2[x].cells[0].innerHTML.match("Laser Troopers"))
                                                                {
                                                                        current_defense += (units_home*4);
                                                                        total_military += (units_total*4);
                                                                }
                                                                if(TRs2[x].cells[0].innerHTML.match("Laser Dragoons"))
                                                                {
                                                                        current_defense += (units_home*5);
                                                                        total_military += (units_total*5);
                                                                }
                                                                if(TRs2[x].cells[0].innerHTML.match("Tanks"))
                                                                {
                                                                        current_defense += (units_home*9);
                                                                        total_military += (units_total*9);
                                                                        max_offense += (units_total*9);
                                                                }
                                                                if(TRs2[x].cells[0].innerHTML.match("Tactical Fighters"))
                                                                {
                                                                        total_military += (units_total*12);
                                                                        min_offense += (units_total*12);
                                                                        max_offense += (units_total*12);
                                                                }
                                                        }
                                                        var defense_percentage = Math.round((current_defense/total_military)*10000)/100;
                                                        var Form_string = "";
                                                        var matches = TRs[j].cells[1].innerHTML.match(/<a href=\"\/whois\/\?(.*?)\">(([A-Za-z0-9 ]{1,26}) \(([0-9]{1,2}):([0-9]{1,2})\))<\/a>/i);
                                                        var sector_link = matches[1].replace("&amp;","&");
                                                        var divID = matches[3].replace(/ /gi,"_");
                                                        Form_string += "[b]" + matches[2] + "[/b]\r\n";
                                                        Form_string += TRs[j].cells[0].innerHTML + "\r\n";
                                                        var kingdom_link = matches[1].replace("&amp;","&");
                                                        Form_string += "[k]" + kingdom_link + "[/k]" + "\r\n";
                                                        Form_string += "[statline]\r\n";
                                                        Form_string += "\r\n[comments]\r\n";
                                                        Form_string += TRs[j].cells[5].innerHTML.replace(/<(.*?)>/gi,"").replace(/<\/(.*?)>/gi,"").replace(/\n\n/gi,"<br>").replace(/\n/gi," ").replace(/<br>/gi,"\r\n").replace(/&nbsp;/gi,"");
                                                        Form_string += "\r\n[b][u]Military Statistics[/u][/b] [i](Tanks Worth)[/i]\r\nTotal Military: [b]" + CommaFormatted(total_military/9) + "[/b]\r\nPotential Offense: [b]" + CommaFormatted(min_offense/9) + " - " + CommaFormatted(max_offense/9) + "[/b]\r\nCurrent Defense: [b]" + CommaFormatted(current_defense/9) + "[/b]\r\nDefense Rating: [b]" + defense_percentage + "%[/b]\r\n(0-34% = Suicide, 35-70% = Fair Grab)";
                                                        Form_string += "\r\n\r\n[i]Information posted using Ske Chrome Extension 0.4.7\r\nAvailable at [url]http://skarchive.net76.net/ske/[url][/i]";
                                                        TRs[j].cells[5].innerHTML += "<p><div><b><u>Military Statistics</u></b><br>";
                                                        TRs[j].cells[5].innerHTML += "Total Military: <b>" + CommaFormatted(total_military/9) + "</b><br />Potential Offense: <b>" + CommaFormatted(min_offense/9) + " - " + CommaFormatted(max_offense/9) + "</b><br />Current Defense: <b>" + CommaFormatted(current_defense/9) + "</b>";
                                                        TRs[j].cells[5].innerHTML += " (<b>" + CommaFormatted((current_defense*1.1)/9) + "</b> w/ Max Shields)";
                                                        TRs[j].cells[5].innerHTML += "<br>Defense Rating: <b>" + defense_percentage + "%</b> (0-34% = <a href=\"javascript:alert('Suicide is defined as a kingdom who has 66% of their total military fource out at one time. They are not held to fair grab standards and can be attacked as many times as you like.\\r\\n\\r\\nNote: It is against game rules to coordinate a suicide intended to give a player free land.');\">Suicide</a>, 35-70% = <a href=\"javascript:alert('Fair Grab is a kingdom who was been caught with more than 30% of their total military out at one time. To avoid ganging on these kingdoms, a plaeyer/sector/alliance should only attack the player a total of 3 times within a 24 hour period.\\r\\n\\r\\nThere may be other factors involved so please check with your alliance Fair Grab policy first.');\">Fair Grab</a>)<br /><small>All numbers displayed are in Tanks Worth at the time of the SOM<br>and do not take into account the SOM's accuracy, sector state, planet types, research or shields</small></div>";
                                                        TRs[j].cells[5].innerHTML += '<p><div><div id="' + divID + '"><img src="http://www.skarchive.net76.net/loader.gif" height="20" width="90"></div><div style="display: none;">' + Form_string + '</div><p><div style="display:none;" name="SubmitToForums"></div><div name="alertsok"><a href=\"javascript:alert(\"'+ Form_string +'"\">Copy 2 Clipboard</a></div></div><p>';
                                                        GetStatLine(matches[3],sector_link);
                                                }
                                                if(TRs[j].cells[2].innerHTML.match("Spy on Shields")&&!TRs[j].cells[5].innerHTML.match("Failure"))
                                                {
                                                        var Form_string = "";
                                                        var matches = TRs[j].cells[1].innerHTML.match(/<a href=\"\/whois\/\?(.*?)\">(([A-Za-z0-9 ]{1,26}) \(([0-9]{1,2}):([0-9]{1,2})\))<\/a>/i);
                                                        var sector_link = matches[1].replace("&amp;","&");
                                                        var divID = matches[3].replace(/ /gi,"_");
                                                        Form_string += "[b]" + matches[2] + "[/b]\r\n";
                                                        Form_string += TRs[j].cells[0].innerHTML + "\r\n";
                                                        var kingdom_link = matches[1].replace("&amp;","&");
                                                        Form_string += "[k]" + kingdom_link + "[/k]" + "\r\n";
                                                        Form_string += "[statline]\r\n";
                                                        Form_string += "\r\n[comments]\r\n";
                                                        Form_string += TRs[j].cells[5].innerHTML.replace(/\n/gi,"\r\n").replace(/<br>/gi,"\r\n").replace(/<(.*?)>/gi," ").replace(/<\/(.*?)>/gi," ").replace(/&nbsp;/gi,"");
                                                        Form_string += "\r\n\r\n[i]Information posted using SK Tools Firefox Extension v0.6.1\r\nAvailable at [url]http://starkingdomstools.com/addon[/url][/i]";
                                                        TRs[j].cells[5].innerHTML += '<p><div><div id="' + divID + '"><img src="http://www.skarchive.net76.net/loader.gif" height="20" width="90"></div><div style="display: none;">' + Form_string + '</div><p><div name="SubmitToForums"></div></div><p>';
                                                        GetStatLine(matches[3],sector_link);
                                                }
                                                if(TRs[j].cells[2].innerHTML.match("Spy on Research")&&!TRs[j].cells[5].innerHTML.match("Failure"))
                                                {
                                                        var Form_string = "";
                                                        var matches = TRs[j].cells[1].innerHTML.match(/<a href=\"\/whois\/\?(.*?)\">(([A-Za-z0-9 ]{1,26}) \(([0-9]{1,2}):([0-9]{1,2})\))<\/a>/i);
                                                        var sector_link = matches[1].replace("&amp;","&");
                                                        var divID = matches[3].replace(/ /gi,"_");
                                                        Form_string += "[b]" + matches[2] + "[/b]\r\n";
                                                        Form_string += TRs[j].cells[0].innerHTML + "\r\n";
                                                        var kingdom_link = matches[1].replace("&amp;","&");
                                                        Form_string += "[k]" + kingdom_link + "[/k]" + "\r\n";
                                                        Form_string += "[statline]\r\n";
                                                        Form_string += "\r\n[comments]\r\n";
                                                        Form_string += TRs[j].cells[5].innerHTML.replace(/<td>Percent<\/td><\/tr>/gi,"<td>Percent</td></tr><br>").replace(/\n/gi,"\r\n").replace(/<br>/gi,"\r\n").replace(/<(.*?)>/gi," ").replace(/<\/(.*?)>/gi," ").replace(/&nbsp;/gi,"");
                                                        Form_string += "\r\n\r\n[i]Information posted using Ske Chrome Extension 0.4.7\r\nAvailable at [url]http://skarchive.net76.net/ske/][/i]";
                                                        TRs[j].cells[5].innerHTML += '<p><div><div id="' + divID + '"><img src="http://www.skarchive.net76.net/loader.gif" height="20" width="90"></div><div style="display: none;">' + Form_string + '</div><p><div name="SubmitToForums"></div></div><p>';
                                                        GetStatLine(matches[3],sector_link);
                                                }
                                                if(TRs[j].cells[2].innerHTML.match("Spy on Buildings")&&!TRs[j].cells[5].innerHTML.match("Failure"))
                                                {
                                                        var Form_string = "";
                                                        var matches = TRs[j].cells[1].innerHTML.match(/<a href=\"\/whois\/\?(.*?)\">(([A-Za-z0-9 ]{1,26}) \(([0-9]{1,2}):([0-9]{1,2})\))<\/a>/i);
                                                        var sector_link = matches[1].replace("&amp;","&");
                                                        var divID = matches[3].replace(/ /gi,"_");
                                                        Form_string += "[b]" + matches[2] + "[/b]\r\n";
                                                        Form_string += TRs[j].cells[0].innerHTML + "\r\n";
                                                        var kingdom_link = matches[1].replace("&amp;","&");
                                                        Form_string += "[k]" + kingdom_link + "[/k]" + "\r\n";
                                                        Form_string += "[statline]\r\n";
                                                        Form_string += "\r\n[comments]\r\n";
                                                        Form_string += TRs[j].cells[5].innerHTML.replace(/<td align=\"left\">Planets<\/td>/gi,"<br><td align=\"left\">Planets</td>").replace(/\n/gi,"\r\n").replace(/<br>/gi,"\r\n").replace(/<(.*?)>/gi," ").replace(/<\/(.*?)>/gi," ").replace(/&nbsp;/gi,"");
                                                        Form_string += "\r\n\r\n[i]Information posted using Ske Chrome Extension 0.4.7\r\nAvailable at [url]http://skarchive.net76.net/ske/][/i]";
                                                        TRs[j].cells[5].innerHTML += '<p><div><div id="' + divID + '"><img src="http://www.skarchive.net76.net/loader.gif" height="20" width="90"></div><div style="display: none;">' + Form_string + '</div><p><div name="SubmitToForums"></div></div><p>';
                                                        GetStatLine(matches[3],sector_link);
                                                }
                                                if(TRs[j].cells[2].innerHTML.match("Spy on Sector News")&&!TRs[j].cells[5].innerHTML.match("Failure"))
                                                {
                                                        var TRs2 = TRs[j].cells[5].getElementsByTagName("tr")
                                                        var SOSN_string = "";
                                                        for(var x = 1; x< TRs2.length; x++)
                                                        {
                                                                var Cells = TRs2[x].cells;
                                                                SOSN_string += '<news time="' + Cells[1].innerHTML + '">' + Cells[2].innerHTML + '</news>\r\n';
                                                        }
                                                        TRs[j].cells[5].innerHTML += '<p><div><div><form onSubmit="return SubmitToPasteBin(this);"><input type="hidden" name="mode" value="SoSN"><input type="hidden" name="paste_code" value="' + escape(SOSN_string) + '"><input type="Submit" name="Submit" value="Send To SK Tools Paste Bin"></form></div><div style="display: none;"></div><div style="display: none;" name="SubmitToForums"></div></div><p>';

                                                }
                                        }
                                }
                        }
                }
        }
}


MaxProbes();
if(window.location.href.match("h=1"))
{
        fillHistory();
        GetForums();
}
