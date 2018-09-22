var express = require('express');
var app = express();
var mysql = require('mysql');

app.set('view engine','html');
app.use(express.static(__dirname+'/views'));

//conexxion a la base
var conexion=mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'',
	database:'maps',
	port:'3306'
})

conexion.connect();

//inicio
app.get('/',function(req,res){
	res.render(__dirname+'index.html');
	//res.sendFile(__dirname+'index.html')
});

//rutas
//obtener todos los municipios
app.get('/municipios',function(req,res){
	conexion.query('SELECT * from muncipios',function(err,rows,fields){
		if(err) throw err;
		console.log(rows[0]);

		res.json(rows);
	});

	//res.send('obtener municipios aqui')
});
//obtener un municipio en especifico
app.get('/municipios/:municipio',function(req,res){
	conexion.query('SELECT C_NOMBRE,CV_TIPO,C_TIPO,C_ESTATUS,INMUEBLE_C_VIALIDAD_PRINCIPAL,INMUEBLE_LATITUD,INMUEBLE_LONGITUD FROM escuelas where INMUEBLE_C_NOM_MUN=?',req.params.municipio,function(err,rows,fields){
		if(err) {
			req.send("error en la consulta");
			return;
		}
		res.json(rows);
	});
});

app.get('municipios:')

app.listen(3000,function(){
	console.log('servidor iniciado en el puerto 3000')
});