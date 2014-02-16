// 2012 Crmsolve Ltd

var org = org || {}
org.crmsolve = org.crmsolve || {}

// Top level parent object for a local in-browser database table
org.crmsolve.Data = function()
{
	// Get the next sequence number for a new row
	this.nextId = function() 
	{
		return ++this.lastid;
	}

	// Find a row by id
	this.select = function(id)
	{
	
		for (i=0;i<this.data.length && this.data[i]['id']!=id;i++);
		if (i<this.data.length) 
		{
			return this.data[i];
		}
		return null;		
	}

	// Save a rows changes
	this.save = function(row) 
	{
		var changeRow = this.select(row['id']);
		if (changeRow == null)
		{
			changeRow = {};
			this.data.push(changeRow);
		}
		
		for (key in row)
		{
			changeRow[key] = row[key];		
		}
	}
	
	// Remove a row from the table
	this.delete = function(id)
	{
		for (i=0;i<this.data.length && this.data[i]['id']!=id;i++);
		if (i<this.data.length) 
		{
			this.data.splice(i,1);
			return true;
		}
		else return false;
	}
	
	// Debugging
	this.debug = function(msg)
	{
		org.crmsolve.log(msg);
		for (i=0;i < this.data.length;i++)
		{
			org.crmsolve.log(i + ":" + this.data[i]['id'] + ':' + this.data[i]['ref'] + ':' + this.data[i]['name']);
		}
	}

}

// Create an instance to use as a prototype
org.crmsolve.data = new org.crmsolve.Data();
