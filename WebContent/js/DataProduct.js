// 2012 Crmsolve Ltd

// Child object to manage Product Data
DataProduct = function() {
  // Initial demo data
  this.entity = "product";

  this.data = [
    { id: "1", ref: "P001", name: "Euro Govt" },
    { id: "2", ref: "P002", name: "Euro Yen" },
    { id: "3", ref: "P003", name: "Euro Euro" },
    { id: "4", ref: "P004", name: "Euro Dollar" },
    { id: "5", ref: "P005", name: "US Treasury" },
    { id: "6", ref: "P006", name: "Govt JGB" },
    { id: "7", ref: "P007", name: "Gilts" },
    { id: "8", ref: "P008", name: "Repo" },
    { id: "9", ref: "P009", name: "Credit Derivs" },
    { id: "10", ref: "P010", name: "Equity Cash" },
    { id: "11", ref: "P011", name: "Equity Derivs" },
    { id: "12", ref: "P012", name: "Syndication" }
  ];
  this.lastid = 8;

  this.make = function(id) {
    return { id: id, ref: "P", name: "" };
  };
};
DataProduct.prototype = org.crmsolve.data;
dataProduct = new DataProduct();
