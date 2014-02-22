var currenciesShown = [];
var showAll = false;

self.port.on("run", function(currenciesToShowPersistentData) {

	currenciesShown = currenciesToShowPersistentData;
  
	$('#mineable-filter').parent().append("<input style=\"margin: 0 0 0 5px;\" disabled='' type='checkbox'><a style=\"margin: 0 0 0 3px; cursor: pointer;\" id='show-all'>Show all</a>");
	$("#currencies").children("tbody").children('tr').append( "<input type='checkBox' class='chkBox' checked />");
  
	$('input[type="checkbox"]').click(function(){
  		if($(this).prop( "checked" )){
  			currenciesShown.push($(this).parent().attr('id'));
  			self.port.emit('simple-storage', currenciesShown)
  		}else{
  			var index = currenciesShown.indexOf($(this).parent().attr('id'));
  			if (index > -1) {
    			currenciesShown.splice(index, 1);
			}
  		}
  	});
     
	showSelected();
  
	$('#show-all').click(function() {
  		toggleShowAll();
	});
  
});

function showSelected(){
   
	$("#currencies").children("tbody").children('tr').each(function () {
		$( this ).hide();
	});
	
	if(currenciesShown){
  		currenciesShown.forEach(function(entry) {
			$("#"+entry).show();
			$("#"+entry).find('input[type=checkBox]').hide();
  	});	
  }
}

function toggleShowAll(){

	if(!showAll){
	
		showAll = true;
		
		$('#show-all').text("Show selected");
	
		$("#currencies").children("tbody").children('tr').each(function(index) {
			checked = false;
			elementid = this.id;
			
			if(currenciesShown){
				currenciesShown.forEach(function(entry) {
				if(entry == elementid){
					checked = true;
				}
				});
			}
		
			$( this ).find('input[type=checkBox]').show();
			if(checked){
				$( this ).find('input[type=checkBox]').attr('checked', true);
			}else{
				$( this ).find('input[type=checkBox]').attr('checked', false); 
			}
		
			$( this ).show();
		
  		});

  	}else{
  		showAll = false;
  		$('#show-all').text("Show all");
  		showSelected();
  	}
  	
}
