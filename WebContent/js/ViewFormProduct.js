// 2012 Crmsolve Ltd

// Child object for Product Form views
ViewFormProduct = function(id, from) {
  this._tag = "ViewFormProduct";

  this.entity = "product";
  this.startPosition = { top: 10, left: 10 };
  this.dataObject = dataProduct;
  this.divTemplate = "#fileFormProduct";
};
ViewFormProduct.prototype = org.crmsolve.viewForm;
viewFormProduct = new ViewFormProduct();

// The class to use for a 'new' Product Form instance
ViewFormProductInstance = function(id, from) {
  this._tag = "ViewFormProductInstance";

  this.id = id;
  this.from = from;
  this.open(id);
};
ViewFormProductInstance.prototype = viewFormProduct;
