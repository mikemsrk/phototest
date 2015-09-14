var db = require('../config');


var Photo = db.Model.extend({
  tableName: 'photos',
  hasTimestamps: true,

  initialize: function () {
    // Place for creating event listener

  }

});


module.exports = db.model('Photo', Photo);
