var url = require('url');

var adr = 'http://localhost:8080/default.htm?year=2025&month=april';

var q = url.parse(adr, true);

console.log('Detalles de la URL: ');
console.log("Host: " + q.host);
console.log("Path: " + q.pathname);
console.log("Query: " + q.search); 

var qdata = q.query;
console.log("Year: " + qdata.year);
console.log("Month: " + qdata.month);