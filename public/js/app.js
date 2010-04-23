SiteCache = {};
function submitDForm(e){
	Event.stop(e);
	request = new Ajax.Request(this.readAttribute('action'), {
		method: post,
		
	})
}


function runAccordians(){
	/*if ($('footer_block')){
	  $('footer_block').fade();
  } */
  
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

function runPorch(){
  if ($('porch')){
      var items = $('porch').down('ul').childElements('li');

      function preventPanelCollisions(){
        items.each(function(s){
          s.stopObserving('mouseover');
        }); 
      }

      function restoreHeight(event, element){
        if (event == false){
          // element
        } else {
          var element = event.element();
        }
        var effects = []
        items.each(function(s){
          effects.push(new Effect.Morph(s, {style:'height:200px;', sync: true}));
          });

        new Effect.Parallel(effects, {duration: .5});
        element.stopObserving('mouseout');
      }

      function sunroom(event, element){
        if (event == false){
          // element
        } else {
          var element = event.element();
        }        
        var effects = []

        items.each(function(s){
          effects.push(new Effect.Morph(s, {style:'height:275px;', sync: true}));
          });

        new Effect.Parallel(effects, {duration: .5});
        element.observe('mouseout', restoreHeight);
      }

      function watchPanels(){
        items.each(function(s){
          s.observe('mouseover', selectPane);
        });
      }

      function selectPane(event, element){
        if (event == false){
          // element
        } else {
          var element = event.element();
        }
        var others = items.without(element);
        var current = element;
        var width = 25 / (items.length - 1);
        var effects = []
        effects.push(new Effect.Morph(current, {style:'width:75%', sync: true}));

        others.each(function(s){
          effects.push(new Effect.Morph(s, {style:'width:'+width+'%;', sync: true}));
        });

        new Effect.Parallel(effects, {
          duration: .5,
          beforeStart: preventPanelCollisions,
          afterFinish: watchPanels});

      }

      items.each(function(s){
        s.morph('width:' + (1/items.length * 100) + '%;', {duration: .5});
        s.observe('mouseover', selectPane);
      });

      //$('porch').observe('click', sunroom)
      SiteCache.currentPorchIndex = 0;
      new PeriodicalExecuter(function(){
        selectPane(false, $$('.porch ul li')[SiteCache.currentPorchIndex]);
        if ($$('.porch ul li').size()-1 == SiteCache.currentPorchIndex){
          SiteCache.currentPorchIndex = 0;
        } else {
          SiteCache.currentPorchIndex++;
        }
      }, 5);
  }
}


document.observe("dom:loaded",function(){
  runAccordians();
  runPorch();
	$$('form.dynamic').each(function(s){
		s.observe('submit', submitDForm, false);
	});
});
