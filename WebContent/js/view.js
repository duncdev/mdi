// 2012 Crmsolve Ltd

org = org || {};
org.crmsolve = org.crmsolve || {};

// Top level parent object to manage multi document views
org.crmsolve.View = function()
{
	this._tag = 'View';

	// Internal unique ids for each view instance created
	var lastvid=0;
	
	// Array of every currently open view instance
	var instances=[];
	
	// Stagger the opening position of new views by these default offsets
	this.offsetLeft=40;
	this.offsetTop=40;
	
	// How fast to animate the view transitions
	this.speedShow=300;
	this.speedClose=300;
	
	// Record the details of a new view instance in the array
	this.add = function()
	{
		this.vid = ++lastvid;
		instances.push(this);
		return this.vid;
	}
	
	// Remove the details of a view from the instances array when it is closed
	this.remove = function()
	{
		instances.splice(instances.indexOf(this),1);	
	}
		
	// Force a close of all views
	this.closeAll = function()
	{
		for (i=0,l=instances.length; i<l; i++)
		{
			instances[i].close();
		}
	}
		
	// Force a data refresh of any open list views showing a given database entity
	this.refresh = function(entity)
	{
		for (i=0,l=instances.length; i<l; i++)
		{
			// Only refresh 'list' views of the given entity
			if ( instances[i].type == org.crmsolve.viewList.type
				&& instances[i].entity == entity)
			{
				instances[i].load();
			}
		}
	}
	
	// Bring a view to the front using z-index
	this.bringToFront = function()
	{
		// Find the currently largest z-index for all view instances
		var max = 0;
		for (i=0,l=instances.length; i<l; i++)
		{
			max = Math.max(max,$(instances[i].div).css('z-index'));
		}
		// Set this view to a higher z-index
		$(this.div).css({'z-index':++max});
		// [Could re-base the z-indexes to avoid getting too large although browsers allow for > million]
	}

	// Locate a view by type, entity and id
	this.find = function(type, entity, id)
	{
		for (i=0,l=instances.length; i<l; i++)
		{
			if (instances[i].type 		== type &&
					instances[i].entity 	== entity &&
					instances[i].id 			== id)
				return instances[i];
		}
		return false;		
	}

	// Log a list of all open views	
	this.listAll = function()
	{
		for (i=0,l=instances.length; i<l; i++)
		{
			org.crmsolve.log(instances[i]);
		}
	}
}

// Create the single instance 'view' for static vars and as a prototype
org.crmsolve.view = new org.crmsolve.View();
