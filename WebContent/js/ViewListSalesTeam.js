// 2012 Crmsolve Ltd

// Child object for SalesTeam List views
ViewListSalesTeam = function()
{
	this._tag = 'ViewListSalesTeam';
	
	// Props for all SalesTeam lists
	this.entity				='SalesTeam';
	this.startPosition 		= {top:10,left:10};	
	this.dataObject		=	dataSalesTeam;
	this.divTemplate	=	'#fileListSalesTeam';
	this.gridMaker 		= function(table)
		{
			// The grid add button
		  var bAdd = table.siblings('.gridButtons').find('#add');           	
		  bAdd.click(function()
		  	{
			  	new ViewFormSalesTeamInstance(0,this);
		  	}
		  ).attr('class','gridButtonAdd');
		  // Enabled by default
		  bAdd.addClass('gridButtonAddOn');
		
			// The grid delete button
			var bDelete = table.siblings('.gridButtons').find('#delete');           	
		  bDelete.click(function()
		   	{
		   		// If there is an open form for this row then close it
		   		var id = table.jqGrid('getGridParam','selrow');
		   		var form = cs.view.find('form','SalesTeam',id);
		   		if (form) form.close();
		   		
		   		// Delete the row
		   		dataSalesTeam.delete(id);
		
		   		// Refresh all SalesTeam lists
		   		cs.view.refresh('SalesTeam');
		   		
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
		      colNames:['Id','Ref','Sales Team'],
		      colModel:[
		            {name:'id',			index:'id', 	width:20},
		            {name:'ref',		index:'ref', 	width:50},
		            {name:'name',		index:'name',	width:220}
		            ],
		      cmTemplate: {sortable:false},
		      sortname: 'id',
		      sortorder: 'asc',
		      viewrecords: false,
		      multiselect: false,
		      caption: 'Sales Teams',
		      onSelectRow: function(rowid,status,e)
		        {
			        bDelete.addClass('gridButtonDeleteOn');
		        },
		      ondblClickRow: function(rowid,row,col,e) 
		        {       		
		        	var v = cs.view.find('form','SalesTeam',rowid);
		        	if (v) v.bringToFront();
		        	else new ViewFormSalesTeamInstance(rowid,$(e.target));  
		        }
		
		    });
    };
}
ViewListSalesTeam.prototype = org.crmsolve.viewList;
viewListSalesTeam = new ViewListSalesTeam();

// The subclass to 'new' from to get a new SalesTeam List
ViewListSalesTeamInstance = function(from)
{
	this._tag = 'ViewListSalesTeamInstance';
	
	// Props for individual SalesTeam lists
	this.from	= $(from);
	
	// Call the ancestor
	this.open();
}
ViewListSalesTeamInstance.prototype = viewListSalesTeam;
