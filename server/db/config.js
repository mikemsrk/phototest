var path = require('path');
var mongoose = require('mongoose');

if(process.env.PORT){
  mongoose.connect('mongodb://MongoLab-4:hbr_o1kgEOz63XBvflkBNKM0R1HTYCQ24eNB_2S5FrY-@ds036698.mongolab.com:36698/MongoLab-4');
}else{
  mongoose.connect('mongodb://localhost/test');
}

var db = mongoose.connection;
var Schema = mongoose.Schema;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('mongodb connection: successful');
});

exports.counterSchema = Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});

exports.userSchema = new Schema({
  userId: {type: String},
  username: String,
  password: String
});

exports.photoSchema = new Schema({
  image_url: String,
  user_id: Number,
  group_id: Number,
  views: Number
});
