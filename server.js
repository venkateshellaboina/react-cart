const port = process.env.PORT || 5000;
const mongoose= require('mongoose');
var Schema=mongoose.Schema;
const express = require('express');
var bodyParser = require('body-parser');
const app=express();
app.use(express.static('public'));
var con;

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));


mongoose.connect("mongodb://localhost/mydb",function(err){
	if(err) throw err;
	console.log('connected to db');
});

con=mongoose.connection;
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : true }))

var CartSchema =new Schema({
	 name : {type:String,required:true},
	 description : {type:String},
	 price : {type:Number},
	 quantity: {type:Number},
});

var CartModel=mongoose.model('shop',CartSchema);

app.use(function(req, res, next) { 
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS,DELETE,PUT"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
	next(); }
);
	
app.post('/add', (req, res) => {
	
	var item= new CartModel(
		{
			   name : req.body.name,
			   description : req.body.description,
			   price : req.body.price,
			   quantity : req.body.quantity
		});
		item.save(function(err,result){
		   if(err)
			   {
				   console.log('save failed' + err);
			   }
		   else console.log('save succes');
		});
})

