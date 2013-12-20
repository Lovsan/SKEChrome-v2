var links = document.getElementsByTagName("A");

for(var i = 0; i< links.length; i++){
  if(links[i].innerHTML.match("income")){
	links[i].parentNode.innerHTML = '<br><a target="skmain" href="?reward1=true">Click here to vote and get 3 hours of income.</a><br><br>'
  }
}
