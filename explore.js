var tds = document.getElementsByTagName("div")
if(tds){
  for(var i = 0; i< tds.length; i++){ 
    if(tds[i].innerHTML.match("Settling one planet costs: <span class=\"platinum\">")&&found!=1){ 
      var cellHTML = tds[i].innerHTML;                        
      var lead = cellHTML.indexOf("maximum of <span class=\"planet\">");    
      var posStart = lead + 32;              
      var without_resource = cellHTML.substring(posStart, cellHTML.length);    
      var posEnd = without_resource.indexOf(" planets</span>.");      
      var maxLand = without_resource.substring(0, posEnd); 
      var MaxLand = maxLand.replace(/,/g , ""); 
      var form = document.getElementsByName("units")[0]; // Find the 'units' box
      var temp = Math.floor(MaxLand / 24) * 24      
      var temp2 = MaxLand - temp
      var found = 1;  
      MaxLand = (temp * 1)                
      if(temp2 == 23){
        MaxLand = MaxLand+23; 
        }    
      form.parentNode.innerHTML = form.parentNode.innerHTML.replace(maxLand + " planets</span>.",'<a href="javascript:void(null)" onclick="var form = document.getElementsByName(' + "'units'" + ')[0];form.value = ' + MaxLand + '">' + maxLand + ' planets</a></span>');
     }
   }
 }