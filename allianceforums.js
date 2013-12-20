var server = document.URL.split("/")[4];

var links = document.getElementsByTagName("A");
for(var i = 0; i< links.length; i++){
  if(links[i].href.match("www.starkingdoms.com/whois")){
    linkdata = links[i].href.split("/")
	links[i].href = 'http://www.starkingdoms.com/game/' + server + '/whois/' + linkdata[4]
  }
}