// 2012 Crmsolve Ltd

// Child object for Product List views
ViewListProduct = function()
{
	this._tag = 'ViewListProduct';
	
	// Props for all product lists
	this.entity				='product';
	this.startPosition = {top:10,left:10};	
	this.dataObject		=	dataProduct;
	this.divTemplate	=	'#fileListProduct';
	this.gridMaker 		= function(table)
		{
			// The grid add button
		  var bAdd = table.siblings('.gridButtons').find('#add');           	
		  bAdd.click(function()
		  	{
			  	new ViewFormProductInstance(0,this);
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
		   		var form = cs.view.find('form','product',id);
		   		if (form) form.close();
		   		
		   		// Delete the row
		   		dataProduct.delete(id);
		
		   		// Refresh all product lists
		   		cs.view.refresh('product');
		   		
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
		      colNames:['Id','Ref','Product'],
		      colModel:[
		            {name:'id',			index:'id', 	width:20},
		            {name:'ref',		index:'ref', 	width:50},
		            {name:'name',		index:'name',	width:220}
		            ],
		      cmTemplate: {sortable:false},
		      sortname:'id',
		      sortorder:'asc',
		      viewrecords:false,
		      multiselect:false,
		      caption:'Products',
		      onSelectRow:function(rowid,status,e)
		        {
			        bDelete.addClass('gridButtonDeleteOn');
		        },
		      ondblClickRow: function(rowid,row,col,e) 
		        {       		
		        	var v = cs.view.find('form','product',rowid);
		        	if (v) v.bringToFront();
		        	else new ViewFormProductInstance(rowid,$(e.target));  
		        }
		
		    });
    };
}
ViewListProduct.prototype = org.crmsolve.viewList;
viewListProduct = new ViewListProduct();

// The subclass to 'new' from to get a new Product List
ViewListProductInstance = function(from)
{
	this._tag = 'ViewListProductInstance';
	
	// Props for individual product lists
	this.from	= $(from);
	
	// Call the ancestor
	this.open();
}
ViewListProductInstance.prototype = viewListProduct;
