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

    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

//******************************* 
//   Vencimiento del token 
//*******************************
// 60 segundo 
// 60 minuto 
// 24 horas
// 30 dias

process.env.CADUCIDAD_TOKEN = '48h'

//******************************* 
//   SEED de autenticación
//*******************************

process.env.SEED = process.env.SEED || 'este-es-el-seed-de-desarrollo';

//******************************* 
//   Google Client ID
//*******************************


process.env.CLIENT_ID = process.env.CLIENT_ID || '87031055158-a3icrlncb7lf308o2f1a8m2napjhffqu.apps.googleusercontent.com';