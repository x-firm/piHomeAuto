var MobileUnitsListViewModel = function () {
  var self = this;

  self.units = ko.observableArray([]);
  self.groups = ko.observableArray([]);

  self.waiting = ko.observable(false);

  self.loadUnits = function(){
    self.waiting(true);
    $.get("/Units/List", function(data){
      self.units(JSON.parse(data));
      self.waiting(false);
    }); 
  }

 self.loadGroups = function(){
    self.waiting(true);
    $.get("/Control/ListGroups", function(data){
      self.groups(JSON.parse(data));
      self.waiting(false);
    }); 
  }

  self.sendDeviceValue = function(data){
    self.waiting(true);
    $.ajax({
          type: "POST",
          url: "/Units/SetUnit", // your POST target goes here
          dataType: 'json',
          contentType: 'application/json',
          data: JSON.stringify(data), // message to send goes here
          success: function (data)
          {
              self.units(JSON.parse(data));
              self.waiting(false);
          }
      }); 
  }

 self.sendGroupValue = function(data){
    self.waiting(true);
    $.ajax({
          type: "POST",
          url: "/Control/SetGroup", // your POST target goes here
          dataType: 'json',
          contentType: 'application/json',
          data: JSON.stringify(data), // message to send goes here
          success: function ()
          {
              self.waiting(false);
          }
      }); 
  }

  self.groupOff = function(group) { 
    if(group !== undefined){
      var data = {units : group.units, value : false};
      console.log(data);
      self.sendGroupValue(data);
    }
  }
  
  self.groupOn = function(group) { 
    if(group !== undefined){
      var data = {units : group.units, value : true};
      console.log(data);
      self.sendGroupValue(data);
    }
  }

  self.deviceClicked = function(unit){
      if(unit !== undefined){
        var data = {id : unit.id, newValue : unit.currentValue, newDimValue : unit.currentDimValue, isDimmed : false};

        self.sendDeviceValue(data);
      }
  }

  self.deviceOn = function(unit) { 
    if(unit !== undefined){
      if(unit.currentValue !== true){
        var data = {unitAdress : unit.id, newValue : true, newDimValue : unit.currentDimValue, isDimmed : false};

        self.sendDeviceValue(data);
      }
    }
  }

  self.deviceDim_0 = function(unit){
    if(unit !== undefined){
      var data = {id : unit.id, newValue : unit.currentValue, newDimValue : 0, isDimmed : true};

      self.sendDeviceValue(data);
    }
  }

  self.deviceDim_128 = function(unit){
    if(unit !== undefined){
      var data = {id : unit.id, newValue : unit.currentValue, newDimValue : 128, isDimmed : true};

      self.sendDeviceValue(data);
    }
  }
  self.deviceDim_255 = function(unit){
    if(unit !== undefined){
      var data = {id : unit.id, newValue : unit.currentValue, newDimValue : 255, isDimmed : true};

      self.sendDeviceValue(data);
    }
  }

  self.deviceOff = function(unit) { 
    if(unit !== undefined){
      if(unit.currentValue !== false){
        var data = {unitAdress : unit.id, newValue : false, newDimValue : unit.currentDimValue, isDimmed : false};

        self.sendDeviceValue(data);
      }
    }
  }

  (function () {
    self.loadUnits();
    self.loadGroups();
  } (self));
}

