// 2012 Crmsolve Ltd

org = org || {};
org.crmsolve = org.crmsolve || {};

// Object for managing form data and edits
org.crmsolve.FormEdit = {
  // Use HTML5 'data' element attribute to keep status
  dataPrefix: "org.crmsolve.formedit.",

  // Initialise a form status ready for edit management
  init: function(form) {
    // Maintain an 'edited' status against the form as a whole
    $(form).data(this.dataPrefix + "edited", 0);

    // Put all edit identifying code here (extend for spinners, etc)
    $(form)
      .find(":input")
      .each(function() {
        $(this).data(this.dataPrefix + "original", $(this).prop("value"));
        $(this).bind("input", function() {
          $(this).data(this.dataPrefix + "edited", 1);
          $(form).data(this.dataPrefix + "edited", 1);
        });
        //cs.log(this);
      });
  }
};

// Form helpers
org.crmsolve.form = org.crmsolve.form || {
  init: function(form) {
    // Maintain an 'edited' status against the form as a whole
    $(form).data("org.crmsolve.formedit.edited", 0);

    // Put all edit identifying code here (extend for spinners, etc)
    $(form)
      .find(":input")
      .each(function() {
        $(this).data("org.crmsolve.formedit.original", $(this).prop("value"));
        $(this).bind("input", function() {
          $(this).data("org.crmsolve.formedit.edited", 1);
          $(form).data("org.crmsolve.formedit.edited", 1);
        });
      });
  },

  getEditStatus: function(form) {
    return $(form).data("org.crmsolve.formedit.edited");
  },

  erase: function(form) {
    $(form)
      .find(":input")
      .val("");
  },

  load: function(form, data) {
    var name;
    $(form)
      .find(":input")
      .each(function() {
        name = $(this).prop("name");
        //alert('set '+ name + ':' + data[name]);
        $(this).prop("value", data[name]);
      });
  },

  disable: function(form) {
    $(form)
      .find(":input")
      .each(function() {
        $(this).attr("disabled", "disabled");
        if ($(this).hasClass("ui-spinner-input")) {
          $(this).spinner("option", "disabled", true);
        }
      });
  },

  fieldDisable: function(field) {
    $(field).attr("disabled", "disabled");
  },

  getArray: function(form) {
    var data = {};
    $(form)
      .find(":input")
      .each(function() {
        data[$(this).prop("name")] = $(this).prop("value");
      });
    return data;
  },

  selectFill: function(field, data) {
    var html = "<option value=0></option>";
    for (i = 0; i < data.length; i++) {
      html +=
        "<option value=" + data[i]["id"] + ">" + data[i]["name"] + "</option>";
    }
    $(field).html(html);
  },

  selectPick: function(field, selected) {
    $(field).prop("value") = selected;
  },

  validateReset: function(form) {
    $(form)
      .find(":input")
      .removeClass("formErrorField");
    $(form)
      .find(".formErrorMessage")
      .html("");
  },

  validate: function(field, cond, msg) {
    if (!cond) {
      $(field).effect("shake", { distance: 5, times: 3 }, 300);
      $(field).addClass("formErrorField");

      if ($(".formErrorMessage").html() == "") $(".formErrorMessage").html(msg);
      return 1;
    }
    return 0;
  }
};
