// 2012 Crmsolve Ltd

// Child object for Client Form views
ViewFormClient = function()
{
	this._tag = 'ViewFormClient';

	this.entity = 'client';
	this.startPosition = {top:10,left:10};
	this.dataObject = dataClient;
	this.divTemplate = '#fileFormClient';
}
ViewFormClient.prototype = org.crmsolve.viewForm;
viewFormClient = new ViewFormClient();

// The class to 'new' for an instance of a Client Form
ViewFormClientInstance = function(id, from)
{
	this._tag = 'ViewFormClientInstance';

	this.id = id;
	this.from = from;
	this.open(id);
}
ViewFormClientInstance.prototype = viewFormClient;