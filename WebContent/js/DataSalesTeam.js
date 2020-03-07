// 2012 Crmsolve Ltd

// Child object to manage Product Data
DataSalesTeam = function() {
  // Initial demo data
  this.entity = "salesTeam";

  this.data = [
    { id: "1", ref: "S001", name: "UK" },
    { id: "2", ref: "S002", name: "Benelux" },
    { id: "3", ref: "S003", name: "Germany/Austria" },
    { id: "4", ref: "S004", name: "Middle East" },
    { id: "5", ref: "S005", name: "Asia/Pacific" },
    { id: "6", ref: "S006", name: "US" },
    { id: "7", ref: "S007", name: "Japan" }
  ];
  this.lastid = 7;

  this.make = function(id) {
    return { id: id, ref: "S", name: "" };
  };
};
DataSalesTeam.prototype = org.crmsolve.data;
dataSalesTeam = new DataSalesTeam();
