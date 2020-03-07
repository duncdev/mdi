// 2012 Crmsolve Ltd

org = org || {};
org.crmsolve = org.crmsolve || {};

// Child object for Form type views
org.crmsolve.ViewForm = function() {
  this.tag = "ViewForm";

  // All children are forms
  this.type = "form";

  // Keep a count to help with the position staggering
  var count = 0;

  // Open a form view (id is zero for a new db row) by either revealing an existing view or creating a new view
  this.open = function(id) {
    var width;

    // If given id is zero then we create a new db row and get its id
    if (id == 0) id = this.dataObject.nextId();

    // Keep the database id for this row
    this.id = id;

    // Alert the parent object of the new view
    this.add();

    // Create a copy of the template div and locate the form
    this.div = $(this.divTemplate).clone();
    this.form = this.div.find("form");

    // Dont show the content until expanded because re-flows are messy
    this.div.children().css({ opacity: 0 });

    // Add to the dom
    this.div.appendTo($(this.divTemplate).parent());

    // Allow drags and bringtofront
    this.div.draggable().mousedown(
      function(e) {
        this.bringToFront();
      }.bind(this)
    );

    // Actions for the close and save buttons
    this.div.find("#close").click(
      function(e) {
        this.closePrompt();
      }.bind(this)
    );
    this.div.find("#save").click(
      function(e) {
        this.save();
        return false;
      }.bind(this)
    );

    width = this.div.css("width");

    // Setup the form edit status handling
    org.crmsolve.form.init(this.form);

    // Position the shrunken form at the element invoking the creation
    this.div
      .css({ width: 0, height: 0, opacity: 0.3 })
      .show()
      .position({
        //this.div.css({opacity:0.3}).show().position({
        my: "left top",
        at: "left top",
        of: this.div.parent()
      });

    // Reset staggered opening position if necessary
    if (
      parseInt(this.startPosition.left) +
        ++count * this.offsetLeft +
        parseInt(width) >
      parseInt(this.div.parent().css("width"))
    )
      count = 0;

    // Animate the form opening
    this.div.animate(
      {
        top: this.startPosition.top + count * this.offsetTop,
        left: this.startPosition.left + count * this.offsetLeft,
        width: parseInt($(this.divTemplate).css("width")) + 15,
        height: parseInt($(this.divTemplate).css("height")),
        opacity: 1
      },
      this.speedShow,
      function() {
        this.div.children().css({ opacity: 1 });
      }.bind(this)
    );

    // Load the database details if any to the form
    this.load();

    return id;
  };

  // Load a rows details to a view
  this.load = function() {
    this.bringToFront();

    // Get the row from the database
    var row = this.dataObject.select(this.id);

    // If it didnt exist then make a new one
    if (row == null) row = this.dataObject.make(this.id);

    // Load the form with the row content
    org.crmsolve.form.load(this.form, row);
  };

  // Close a view, prompting for any unsaved changes
  this.closePrompt = function() {
    if (org.crmsolve.form.getEditStatus(this.form) != 0) {
      // Prompt for save
      org.crmsolve.prompt2("Changes to " + this.entity, "Save changes?", [
        {
          button: "yes",
          function: function() {
            this.save();
          }.bind(this)
        },
        {
          button: "no",
          function: function() {
            this.close();
          }.bind(this)
        }
      ]);
    } else this.close();
  };

  // Save the form details to the db
  (this.save = function() {
    // Get the form data
    data = org.crmsolve.form.getArray(this.form);

    // Save to the database
    this.dataObject.save(data);

    // Alert the parent object of the change to allow list refreshes
    this.refresh(this.entity);

    this.close();
  }),
    // Close a view with no prompt
    (this.close = function() {
      // Shrink the view back to its opening position
      this.div.children().animate({ opacity: 0 }, 100);
      this.div.animate(
        {
          left: this.fromLeft,
          top: this.fromTop,
          width: 20,
          height: 10,
          opacity: 0
        },
        this.speedClose,
        function() {
          // Remove from the dom
          this.div.remove();
          // Remove our record
          this.remove();
        }.bind(this)
      );
    });

  this.toString = function() {
    return this.type + ":" + this.entity + "[" + this.id + "]:" + this.vid;
  };
};

// The ViewForm object inherits from View
org.crmsolve.ViewForm.prototype = org.crmsolve.view;
// A single ViewForm instance holds the static info and provides a prototype
org.crmsolve.viewForm = new org.crmsolve.ViewForm();
