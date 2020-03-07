// 2012 Crmsolve Ltd

// Utility functions

var org = org || {};
org.crmsolve = org.crmsolve || {};

// General
org.crmsolve.log =
  org.crmsolve.log ||
  function(msg) {
    console.log(msg);
  };

// Date helpers
org.crmsolve.date = org.crmsolve.date || {
  format: "yy-mm-dd",

  today: function() {
    var currentTime = new Date();
    return Date.parse(
      currentTime.getMonth() +
        1 +
        "/" +
        currentTime.getDate() +
        "/" +
        currentTime.getFullYear()
    );
  },

  toString: function(date) {
    return $.datepicker.formatDate(format, date);
  },

  fromString: function(dateString) {
    try {
      return $.datepicker.parseDate(format, dateString);
    } catch (e) {
      return null;
    }
  }
};

// Number helpers
org.crmsolve.number = org.crmsolve.number || {
  format: function(number, dp, ts, ccy) {
    number = this.unFormat("" + number);
    var num = parseFloat(number);
    var pw;
    dp = parseInt(dp, 10);
    dp = isNaN(dp) ? 2 : dp;
    ts = ts || ",";
    ccy = ccy || "";

    return num != number
      ? false
      : ccy +
          ((0.9).toFixed(0) == "1"
            ? num.toFixed(dp)
            : (Math.round(num * (pw = Math.pow(10, dp) || 1)) / pw).toFixed(dp)
          ).replace(/^(-?\d{1,3})((\d{3})*)(\.\d+)?$/, function(
            all,
            first,
            subsequence,
            dmp,
            dec
          ) {
            return (
              (first || "") +
              subsequence.replace(/(\d{3})/g, ts + "$1") +
              (dec || "")
            );
          });
  },

  unFormat: function(numberString) {
    return numberString.replace(/[^.0-9]/g);
  }
};

// Grid helpers
org.crmsolve.jqgrid = org.crmsolve.jqgrid || {
  // Drop down selector values in jqGrid format
  getSelect: function(dataArray) {
    var s = "";
    for (i = 0, l = dataArray.length; i < l; i++) {
      s += dataArray[i]["id"] + ":" + dataArray[i]["name"] + ";";
    }
    return s.substring(0, s.length - 1);
  },

  // Grid Formatter/unformatters
  formatPercent: function(cellvalue, options, rowObject) {
    if (cellvalue == null || cellvalue == "") return "";
    cellvalue = parseFloat(cellvalue).toFixed(2);
    return cellvalue + "%";
  },

  formatPercentU: function(cellvalue, options, cell) {
    if (cellvalue == "") return null;
    return cellvalue.replace("%", "");
  },

  formatEuro: function(cellvalue, options, rowObject) {
    if (cellvalue == null || cellvalue == "") return "";
    return org.crmsolve.number.format(cellvalue, 0, ",", "€");
  },

  formatEuroU: function(cellvalue, options, cell) {
    if (cellvalue == "") return null;
    return cellvalue.replace("€", "").replace(",", "");
  }
};

// 2 option user prompt
org.crmsolve.prompt2 = function(title, message, options) {
  var $dialog = $("<div></div>")
    .html(message)
    .dialog({
      dialogClass: "prompt2",
      title: title,
      modal: true,
      closeOnEscape: true,
      //open: function(event, ui) { $(".ui-dialog-titlebar-close", $(this).parent()).hide(); },
      buttons: [
        {
          text: options[0]["button"],
          click: function() {
            if (typeof options[0]["function"] === "function")
              options[0]["function"]();
            $(this).dialog("close");
          }
        },
        {
          text: options[1]["button"],
          click: function() {
            if (typeof options[1]["function"] === "function")
              options[1]["function"]();
            $(this).dialog("close");
          }
        }
      ]
    });

  $dialog.dialog("open");
};
