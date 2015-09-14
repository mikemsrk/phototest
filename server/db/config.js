var dbUrl = {};

if(process.env.NODE_ENV == "production"){
  dbUrl.deploy = true; // FALSE = LOCAL
}else{
  dbUrl.deploy = false; // TRUE = DEPLOYED
}

var url_parse = function(url){ // Parse the deployment mysql server params
  if(url){
    dbUrl.user = url.split(':')[1].substring(2);
    dbUrl.password = url.split(':')[2].split("@")[0];
    dbUrl.host = url.split('@')[1].split("/")[0];
    dbUrl.database = url.split('/')[3].split("?")[0];
  }
};

url_parse(process.env.CLEARDB_DATABASE_URL);

var knex;

if(dbUrl.deploy){
  knex = require('knex')({
    client: 'mysql',
    connection: {
      host: dbUrl.host,
      user: dbUrl.user,
      password: dbUrl.password,
      database: dbUrl.database,
      charset: 'utf8'
    }
  });
}else{
  knex = require('knex')({
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'padlet',
      charset: 'utf8'
    }
  });
}


var db = require('bookshelf')(knex);
db.plugin('registry');

db.knex.schema.hasTable('photos').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('photos', function (photo) {
      photo.increments('id').primary();
      photo.string('image_url', 255).unique();
      photo.integer('user_id');
      photo.integer('group_id');
      photo.integer('views').defaultTo(0);
      photo.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

module.exports = db;
