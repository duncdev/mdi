// 2012 Crmsolve Ltd

org = org || {};
org.crmsolve = org.crmsolve || {};

// Child object for List type views
org.crmsolve.ViewList = function()
{
	this._tag = 'ViewList';

	// All children will be lists
	this.type='list';
	
	// Keep a count to help with the position staggering
	var count=0;
							
	// Open a new list view
	this.open = function()
	{						
		var width,
				height;
		
		// Alert the parent object		
		this.add();
	
		// Create a copy of the template list div and build the jqgrid
		this.div = $(this.divTemplate).clone(true);
		this.grid = this.gridMaker(this.div.find('table'));
								
		// Hide the view content until expanded else it re-flows
		this.div.children().css({'opacity':0});
		
		// Add the new div to the dom				
		this.div.appendTo($(this.divTemplate).parent());
		
		// Allow drags and bringToFront when clicked
		this.div.draggable().mousedown(function(e){this.bringToFront()}.bind(this));
		
		// The close button hook					
	  this.div.find('#close').click(function(e){this.close()}.bind(this));
	    		    	
		// Keep the original size for animated expanding
		width = this.div.css('width');
		height = this.div.css('height');		
		
		// Load the list data
		this.load();
							
		// Position the shrunken list over the element invoking the view creation
		this.div.css({width:0,height:0,opacity:0.3}).show().position({
    		my: "left top",
    		at: "left top",   
       	//of: this.divTemplate.parent()
       	of: this.div.parent()
       	});

	  // Reset the count used to stagger opening positions
		if (parseInt(this.startPosition.left)+(++count*this.offsetLeft)+parseInt(width) > parseInt(this.div.parent().css('width'))) count=0;

   	// Animate the list opening       	       		      	
   	this.div.animate({'top':this.startPosition.top+count*this.offsetTop,
   										'left':this.startPosition.left+count*this.offsetLeft,
   										'width':width,
   										'height':height,
   										'opacity':1},this.speedShow,
	    function()
	    {
	    	this.div.children().animate({'opacity':1},100);
	    }.bind(this)
	  );
	    		
		this.bringToFront();
	}
		
	// Refresh the list data content
	this.load = function()
	{				
		this.grid.jqGrid('clearGridData');
		this.grid.trigger('reloadGrid');
		for(var i=0;i<this.dataObject.data.length;i++)
		{
			this.grid.jqGrid('addRowData',this.dataObject.data[i]['id'],this.dataObject.data[i]);
		}
		
		// No row selected so disable the delete button
    var button = $(this.div).children('.gridButtons').find('#delete');
    button.removeClass('gridButtonDeleteOn');		
	}
					
	// Close the list view
	this.close = function()
	{				
		// Shrink the view back to its opening position
	  this.div.children().animate({'opacity':0},100);
		this.div.animate({'left':0,
											'top':0,
											'width':20,
											'height':10,
											'opacity':0},this.speedClose,
			function() {
				// Remove view from the dom
				this.div.remove();
				// Remove view instance from parent array
				this.remove();
			}.bind(this));
	}
	
	
	this.toString = function()
	{
		return this.type + ":" + this.entity + ":" + this.vid;
	}

}
// The ViewList object inherits from View
org.crmsolve.ViewList.prototype = org.crmsolve.view;
// A single ViewList instance keeps the static (class) values
org.crmsolve.viewList = new org.crmsolve.ViewList();



