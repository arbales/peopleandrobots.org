function submitDForm(e){
	Event.stop(e);
	request = new Ajax.Request(this.readAttribute('action'), {
		method: post,
		
	})
}

document.observe("dom:loaded",function(){
	$$('form.dynamic').each(function(s){
		s.observe('submit', submitDForm, false);
	});
});
