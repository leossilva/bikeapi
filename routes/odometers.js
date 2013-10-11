var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('bikeapi', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'odometerdb' database");
        db.collection('odometers', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'odometers' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving odometer: ' + id);
    db.collection('odometers', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('odometers', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addOdometer = function(req, res) {
    var odometer = req.body;
    console.log('Adding odometer: ' + JSON.stringify(odometer));
    db.collection('odometers', function(err, collection) {
        collection.insert(odometer, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateOdometer = function(req, res) {
    var id = req.params.id;
    var odometer = req.body;
    console.log('Updating odometer: ' + id);
    console.log(JSON.stringify(odometer));
    db.collection('odometers', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, odometer, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating odometer: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(odometer);
            }
        });
    });
}

exports.deleteOdometer = function(req, res) {
    var id = req.params.id;
    console.log('Deleting odometer: ' + id);
    db.collection('odometers', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {

    var odometers = [
    {
        name: "novo odometro 1",
        mt_ridden: 0
    },
    {
        name: "novo odometro 2",
        mt_ridden: 0
    }];

    db.collection('odometers', function(err, collection) {
        collection.insert(odometers, {safe:true}, function(err, result) {});
    });

};