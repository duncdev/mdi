// 2012 Crmsolve Ltd
	
// Child object to manage Client Data
DataClient = function()
{
	// Initial demo data
	this.entity = 'client';
	
	this.data =
			[{id:'1',ref:'C8923',name:'Aberdeen Asset Mgmt',email:'sales@abacus.co.uk',	tel:'02075981234',revYTD:45000,revMTD:7490,toYTD:1440000,toMTD:290200},
			 {id:'2',ref:'C7628',name:'Aegon',							email:'sales@aegon.co.uk',										revYTD:17830,revMTD:1192,toYTD:1740000,toMTD:123000},
			 {id:'3',ref:'C1223',name:'Bibby',							email:'sales@bibby.co.uk',										revYTD:27830,revMTD:2124,toYTD:2738000,toMTD:250020},
			 {id:'4',ref:'C2982',name:'Dun & Bradstreet',		email:'sales@dandb.co.uk',										revYTD:97830,revMTD:9367,toYTD:9292000,toMTD:873990},
			 {id:'5',ref:'C1762',name:'Friends Life',				email:'sales@friends.co.uk',									revYTD:1730,revMTD:124,toYTD:629000,toMTD:35680},
			 {id:'6',ref:'C9821',name:'Lazard Asset Mgmt',	email:'sales@lazard.co.uk',										revYTD:23870,revMTD:2821,toYTD:2910000,toMTD:216400},
			 {id:'7',ref:'C5492',name:'Legal & General',		email:'sales@landg.co.uk',										revYTD:37810,revMTD:3124,toYTD:3860000,toMTD:319300},
			 {id:'8',ref:'C0921',name:'Newton Inv Mgmt',		email:'sales@newton.co.uk',										revYTD:97430,revMTD:8623,toYTD:9230000,toMTD:917200}		 
			 ];
			 
	this.lastid = 8;
	
	this.make = function(id)
	{
		return {id:id,ref:'C',name:''};		
	}
}
DataClient.prototype = org.crmsolve.data;
dataClient = new DataClient();
