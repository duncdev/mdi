// 2012 Crmsolve Ltd

// Alias for the crmsolve modules
var cs = org.crmsolve;

// Note the current menu section
var currentSectionName = null;

function fDebug()
{
	cs.view.listAll();
};

$(document).ready(function()
{	
	// jQuery to add the corners
	$('.section > div').addClass('ui-corner-all');
			
	// Hide all the view object templates
	$('.view').hide();			
	
	// Hide all the page sections
	$('.section').hide();
	
	// Enable FormEdit functionality on all forms
	$('form').each(function(){cs.FormEdit.init(this)});

	// Header bar button setup
	$('#menubar button').each(function(index) {$(this).data('sequence',index);});
	$('#menubar button').click(
		function() 
		{
			var sectionName = $(this).attr('id');			
			if (sectionName.indexOf('_') >= 0) sectionName = sectionName.substring(0,sectionName.indexOf('_'));
												
			var dir=['right','left'];
			if (currentSectionName == null)	$('#section_'+sectionName).show();	
			else
			{
				// establish direction of transition
				var from = $('#menubar button[id="'+ currentSectionName + '"]').data('sequence');
				var to = $('#menubar button[id="' + sectionName + '"]').data('sequence');
				if (from==to) return;
				if (from<to) dir.reverse();
				$('#menubar button').removeClass('headerButtonActive');
				$('#section_'+currentSectionName).hide('slide',{direction:dir[0]},300);
				$('#section_'+sectionName).show('slide',{direction:dir[1]},300);
			}
							
			$('#menubar button[id="' + sectionName + '"]').addClass('headerButtonActive');
			currentSectionName = sectionName;
					
		}
	);	
	
	$('#file_list_clients').click(
	 function()
	 {
	   var v = new ViewListClientInstance($(this));
	   //cs.log(v.vid + ":" + v.type + ":" + v.entity + ":" + v.id);
	   //$('#window_close_all').parent().before('<li><button id="view' + v.vid + '">' + v.entity + ' ' + v.type + ' ' + v.id + '</button></li>');
	 }
  );
	$('#file_list_products').click(function(){new ViewListProductInstance($(this));});
	$('#file_list_salesteams').click(function(){new ViewListSalesTeamInstance($(this));});
	
	$('#file_new_client').click(function(){new ViewFormClientInstance(0);});
	$('#file_new_product').click(function(){new ViewFormProductInstance(0);});
	$('#file_new_salesteam').click(function(){new ViewFormSalesTeamInstance(0);});
	
	$('#window_close_all').click(function(){cs.view.closeAll();});
	
	// file section by default
	$('#buttonfile').click();
						
});
