// 2012 Crmsolve Ltd

// Child object for SalesTeam Form views
ViewFormSalesTeam = function(id,from)
{
	this._tag = 'ViewFormSalesTeam';

	this.entity = 'SalesTeam';
	this.startPosition = {top:10,left:10};
	this.dataObject = dataSalesTeam;
	this.divTemplate = '#fileFormSalesTeam';
}
ViewFormSalesTeam.prototype = org.crmsolve.viewForm;
viewFormSalesTeam = new ViewFormSalesTeam();

// The class to use for a 'new' SalesTeam Form instance
ViewFormSalesTeamInstance = function(id,from)
{
	this._tag = 'ViewFormSalesTeamInstance';
	
	this.id = id;
	this.from = from;	
	this.open(id);
}
ViewFormSalesTeamInstance.prototype = viewFormSalesTeam;
