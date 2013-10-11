var express = require('express'),
    users = require('./routes/users');
    companies = require('./routes/companies');
    odometers = require('./routes/odometers');
 
var app = express();
 
app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
});
 
app.get('/user', users.findAll);
app.get('/user/:id', users.findById);
app.post('/user', users.addUser);
app.put('/users/:id', users.updateUser);
app.delete('/users/:id', users.deleteUser);


app.get('/company', companies.findAll);
app.get('/company/:id', companies.findById);
app.post('/company', companies.addCompany);
app.put('/company/:id', companies.updateCompany);
app.delete('/company/:id', companies.deleteCompany);

app.get('/odometer', odometers.findAll);
app.get('/odometer/:id', odometers.findById);
app.post('/odometer', odometers.addOdometer);
app.put('/odometer/:id', odometers.updateOdometer);
app.delete('/odometer/:id', odometers.deleteOdometer);

 
app.listen(3000);
console.log('Listening on port 3000...');