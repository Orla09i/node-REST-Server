//******************************* 
//   Puerto
//*******************************

process.env.PORT = process.env.PORT || 3000;

//******************************* 
//   Entorno
//*******************************

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//******************************* 
//   Base de Datos
//*******************************

let urlDB;

if (process.env.NODE_ENV === 'dev') {

    urlDB = 'mongodb://localhost:27017/negocio';
} else {

    urlDB = 'mongodb://OrlaPrieto:A123456@ds049864.mlab.com:49864/negocio';
}

process.env.URLDB = urlDB;