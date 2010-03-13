function submitDForm(e){
	Event.stop(e);
	request = new Ajax.Request(this.readAttribute('action'), {
		method: post,
		
	})
}


function runAccordians(){
	if ($('footer_block')){
	  $('footer_block').fade();
  }
  
	$$('ul.multidimensional .list-selector:not(._open)').each(function(s){
		new Effect.BlindUp(s.next('ul'), {duration:.2});
	});

	$$('ul.multidimensional .list-selector').each(function(s){

		s.observe('click', function(event){
			if (!s.hasClassName('_open')){
				old = s.up('ul').down('._open') || null;
				e = this.next('ul');
				
				next = s.up('li').next() || null;
				if (!next) {
					s.up('li').morph('padding-bottom:12px');
				}

				
				if (!e.down('ul')){
					e.addClassName('_last_dimension');
				}
				
				if (old){
					new Effect.Parallel([
						new Effect.BlindDown(e, {sync:true}),
						new Effect.BlindUp(old.next('ul'), {sync:true}),
						], {
							duration: .5,
							afterFinish: function(){
  						  e.setStyle("height:auto");
								old.removeClassName('_open');
								s.addClassName('_open'); 
							},
					});
				} else {
					new Effect.Parallel([
						new Effect.BlindDown(e, {sync:true}),
						], {      
							duration: .5,
							afterFinish: function(){
  						  e.setStyle("height:auto");
								s.addClassName('_open'); 
							},
					});
				}
			} else {
				s.next('ul').blindUp();
				s.removeClassName('_open');
			}
		});
	});
}

document.observe("dom:loaded",function(){
  runAccordians();
	$$('form.dynamic').each(function(s){
		s.observe('submit', submitDForm, false);
	});
});
