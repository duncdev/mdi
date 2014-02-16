// 2012 Crmsolve Ltd

// Child object for Client List views
ViewListClient = function()
{
	this._tag = 'ViewListClient';

	// Props for all client lists
	this.entity 			= 'client';	
	this.startPosition = {top:10,left:10};	
	this.dataObject		= dataClient;
	this.divTemplate 	= '#fileListClient';
	this.gridMaker 		= function(table) 
		{		
		  // The grid add button
		  var bAdd = table.siblings('.gridButtons').find('#add');           	
		  bAdd.click(function()
		  	{
			  	new ViewFormClientInstance(0,this);	
		  	}
		  ).attr('class','gridButtonAdd');
		  // Enable it by default
		  bAdd.addClass('gridButtonAddOn');
		  
			// The grid delete button
			var bDelete = table.siblings('.gridButtons').find('#delete');           	
		  bDelete.click(function()
		   	{
		   		// If there is an open form for this row then close it
		   		var id = table.jqGrid('getGridParam','selrow');
		   		var form = cs.view.find('form','client',id);
		   		if (form) form.close();
		   		
		   		// Delete the row
		   		dataClient.delete(id);
		
		   		// Refresh all client lists
		   		cs.view.refresh('client');
		   		
		   		// Select the next row
		   		table.jqGrid('setSelection',3);
		   		
		   		// Disable the button
		   		bDelete.removeClass('gridButtonDeleteOn');
			  }
		  ).attr('class','gridButtonDelete');     	
		  
			return table.jqGrid({
				datatype:'local',
		    sortable:false,
		    height:200,
		    hidegrid:false,
		    shrinkToFit:true,
		    colNames:['Id','Ref','Customer','YTD','MTD','YTD','MTD'],
		    colModel:[
		            {name:'id',			index:'id', 	width:20},
		            {name:'ref',		index:'ref', 	width:50},
		            {name:'name',		index:'name',	width:120},
		            {name:'revYTD',		index:'revYTD',	width:100, 	align:'right',resizable:true,formatter:cs.jqgrid.formatEuro, unformat:cs.jqgrid.formatEuroU},
		            {name:'revMTD',		index:'revMTD', width:90,	align:'right',resizable:true,formatter:cs.jqgrid.formatEuro, unformat:cs.jqgrid.formatEuroU},
		            {name:'toYTD',		index:'toYTD',	width:100, 	align:'right',resizable:true,formatter:cs.jqgrid.formatEuro, unformat:cs.jqgrid.formatEuroU},
		            {name:'toMTD',		index:'toMTD', 	width:90,	align:'right',resizable:true,formatter:cs.jqgrid.formatEuro, unformat:cs.jqgrid.formatEuroU},
		        ],
		    cmTemplate: {sortable:false},
		    sortname: 'id',
		    sortorder: 'asc',
		    viewrecords: false,
		    multiselect: false,
		    caption: 'Clients',
		    onSelectRow: function(rowid,status,e)
		        { 
			        bDelete.addClass('gridButtonDeleteOn');
		
		        },
		    ondblClickRow: function(rowid,row,col,e) 
		        {   
		        	// If a form view already exists then show it
		        	var v = cs.view.find('form','client',rowid);
		        	if (v) v.bringToFront();
		        	// Otherwise open one
		        	else new ViewFormClientInstance(rowid,$(e.target));  
		        }
		
		    }).jqGrid('setGroupHeaders', {
			  useColSpanStyle: true, 
			  groupHeaders:[
				{startColumnName: 'revYTD', numberOfColumns: 2, titleText: 'Revenue'},
				{startColumnName: 'toYTD', numberOfColumns: 2, titleText: 'Turnover'}
			  ]	
			});
		};
	
}
ViewListClient.prototype = org.crmsolve.viewList;
viewListClient = new ViewListClient();

// The subclass to use 'new' on to get a new Client List
ViewListClientInstance = function(from)
{
	this._tag = 'ViewListClientInstance';

	// Props for individual client lists
	this.from	= $(from);
	
	// Call the ancestor
	this.open();
}
ViewListClientInstance.prototype = viewListClient;
