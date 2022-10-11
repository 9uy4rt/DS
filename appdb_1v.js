var mysql=require('mysql');
var express=require('express');
var app=express();
var port=3000;

var bodyParser=require('body-parser');
var conn=mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"mysql123",
	database:"testdb"
});

app.use(express.static(__dirname+'/public'));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',function(req,res){
	res.sendFile(__dirname+'/public/main.html');
});

app.post('/w',function(req,res){
	const command=req.body.command;
	//consile.log(req.body.order);
/*	conn.connect(function(err){
		if(err) throw err;
		else*/ if(command=="book"){
		var sql="SELECT * FROM book ";
		conn.query(sql,function(err,result){
			if(err) throw err;
			//console.log(result);
			res.render('list.ejs',{rows:result});
			});
		}else if(command=="tables"){
			var sql="show tables";
			conn.query(sql,function(err,result){
			if(err) throw err;
			res.render('listtables.ejs',{rows:result});
			});
		}else if(command=="desc"){
			var sql="desc book";
			conn.query(sql,function(err,result){
			if(err) throw err;
			res.render('listdesc.ejs',{rows:result});
			});
		}else if(command=="databases"){
			var sql="show databases;";
			conn.query(sql,function(err,result){
			if(err) throw err;
			res.render('listdatabases.ejs',{rows:result});
			});
		}else if(command=="홍길동"){
		var sql="select * from book where name='홍길동'";
         conn.query(sql,function(err,result){
         if(err) throw err;
         res.render('listhong.ejs',{rows:result});
         });
		}else if(command=="심청전"){
      var sql="select * from book where name='심청전'";
         conn.query(sql,function(err,result){
         if(err) throw err;
         res.render('listsim.ejs',{rows:result});
         });
		}else if(command=="price"){
      var sql="select price from book";
         conn.query(sql,function(err,result){
         if(err) throw err;
         res.render('listprice.ejs',{rows:result});
         });
      }

	});
	
	//res.send('OK');
//});

app.listen(port,function(err){
	if(err) throw err;
	console.log(`App listening on port ${port}`);
});
