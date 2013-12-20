function MaxShields()
{
        var forms = document.getElementsByTagName('input');
        for(var i = 0; i< forms.length; i++) 
        {
                if(forms[i].name)
                {
                        var amount = forms[i].parentNode.parentNode.childNodes[7].innerHTML;
                        amount = amount.replace("<span class=\"power\">","").replace(/,/g , "").replace(" energy/hour" , "").replace("<\/span>" , "");       
                        forms[i].parentNode.innerHTML += ' - <a href="javascript:Fill(' + forms[i].name + ',' + amount + ');">Max</a>';
                        forms[i].parentNode.innerHTML += ' - <a href="javascript:Fill(' + forms[i].name + ',' + Math.floor(amount * 1.1) + ');">10% extra</a>';
						forms[i].parentNode.innerHTML += ' - <a href="javascript:Fill(' + forms[i].name + ',' + Math.floor(amount * 1.05) + ');">5% extra</a>';
				}
        }
}

MaxShields();