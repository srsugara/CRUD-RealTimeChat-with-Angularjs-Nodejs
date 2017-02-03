var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var customerSchema=new Schema({
	firstname:String,
	lastname:String,
	phone:String,
	address:{
		street:String,
		city:String,
		state:String,
		zip:String
	}
});

module.exports=mongoose.model('customers',customerSchema);