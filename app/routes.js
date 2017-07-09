var musicModel = require('./models/musicModel');

var musiclibModel = musicModel.musicM;
var musicMatrixModel = musicModel.partsMatrixM;

module.exports = function(app) {

    // create organization, symphony or orchestra
    app.post('/api/org',function(req, res){
        console.log(req.body);
        musiclibModel.create({
            org_name: req.body.orgname,
            org_location: req.body.orglocation,
            org_owner: req.body.orgowner,
            concerts: []
        }, function(err, results) {
            if(err) res.send("Unable to create org");
            res.send(results); // send back id, name,location
        });
        
    });
    
    // create concert entry
    app.post('/api/concert/', function(req, res) {
         //console.log(req.body.params);
        //console.log(req.body.params.concert_data);
        var currentDate = new Date();
        musiclibModel.findById(req.body.params.org_id, function(err, orgObj){
                 if(err) 
                     res.send("Unable to find organization, please contact admin");
                 else {
                    orgObj.concerts.push({
                        date : req.body.params.concert_data.date,
                        name : req.body.params.concert_data.name,
                        location : req.body.params.concert_data.location,
                        active: true,
                        created_date: currentDate,
                        updated_date: currentDate                        
                     });
                     orgObj.save(function(err, orgObj) {
                         if(err) res.send("Unable to create concert, please contact admin");
                         
                         musiclibModel.findById(req.body.params.org_id, function(err, orgObj){
                             if (err)
                                 res.send("Unable to create concert, please contact admin");
                             console.log(orgObj.concerts);
                             res.json(orgObj);
                         });
                     });
                 }
        });
    });
    
    // create 'piece' 
     app.post('/api/concert/piece/', function(req, res) {
         console.log(req.body.params);
         musiclibModel.findById(req.body.params.org_id, function(err, orgObj) {
             //console.log(orgObj);
            var concertObj = orgObj.concerts.id(req.body.params.concert_id);
            //console.log(concertObj);
            if(err) 
                     res.send("Unable to locate concert, please contact admin");
            else {
                     // add piece to concert program
                     concertObj.pieces.push({
                        title: req.body.params.piece_data.title,
                        composer_last : req.body.params.piece_data.lastname,
                        composer_first : req.body.params.piece_data.firstname,
                        ensemble : req.body.params.piece_data.ensemble, 
                        chorus_source : req.body.params.piece_data.chorussource, 
                        symphony_source : req.body.params.piece_data.symphonysource,
                        duration : req.body.params.piece_data.duration                 
                     });
                     orgObj.save(function(err, orgObj){
                         if(err) res.send("Unable to create piece entry, contact admin");
                     musiclibModel.findById(req.body.params.org_id, function(err, orgObj) {
                         if(err) res.send("Unable to create piece entry, contact admin");
                        var concertObj = orgObj.concerts.id(req.body.params.concert_id);
                        var pieces = concertObj.pieces;
                        res.json(pieces); 
                     });
                     });
                 }
         });
    });
    
    // add instrument to concert
    app.post('/api/concert/instrument/', function(req, res) {
         console.log(req.body.params);
         musiclibModel.findById(req.body.params.org_id, function(err, orgObj) {
             //console.log(orgObj);
            var concertObj = orgObj.concerts.id(req.body.params.concert_id);
            //console.log(concertObj);
            if(err) 
                     res.send("Unable to locate concert, please contact admin");
            else {
                     // add instrument to concert program
                     concertObj.instruments.push({
                        instrument: req.body.params.instrument_data.instrument
                     });
                     orgObj.save(function(err, concertObj){
                         if(err) res.send("Unable to create instrument entry, contact admin");
                     musiclibModel.findById(req.body.params.org_id, function(err, orgObj) {
                        if(err) res.send("Unable to create instrument entry, contact admin");
                        var concertObj = orgObj.concerts.id(req.body.params.concert_id);                 var instruments = concertObj.instruments; 
                        res.json(instruments);
                     });
                     });
                 }
         });
    });
  
    // create 'parts'entry 
    app.post('/api/concert/piece/part/', function(req, res) {
        console.log(req); // 
        musicMatrixModel.create ({
            instrument_name : req.body.params.instrument_name,
            piece_name : req.body.params.piece_name,
            key : req.body.params.instrument_data.key
        }, function(err, results) {
            if(err) res.send("Unable to create matrix entry");
            musicMatrixModel.find({piece_name:req.body.params.piece_name}, function(err, obj){
                console.log(obj);
                if(err) res.send("Unable to create matrix entry");
                res.json(obj);
            });
        });    
        
    });
 
    // update 'parts'entry 
    app.post('/api/concert/piece/part/update', function(req, res) {
        musicMatrixModel.findOneAndUpdate({$and: [{piece_name:req.body.params.piece_name}, {instrument_name: req.body.params.instrument_name}]},{key: req.body.params.instrument_data.key}, function(err, partObj) {
            if(err) throw(err);
            res.send(partObj);
        });
        
    });
    
    // Delete concert
    app.post('/api/concert/delete/', function(req, res) {
        console.log(req);
        musiclibModel.findById(req.body.params.org_id, function(err, orgObj) {
            var concertObj = orgObj.concerts.id(req.body.params.concert_id);
            if(err)
                res.send("Unable to locate org,contact admin");
            console.log(concertObj);
            concertObj.active = false;           
            concertObj.save(function(err, concertObj){
                if(err) res.send("Unable to update concert");
            });
            console.log(concertObj);
            res.send("Deleted");
        })
    });
    
    //Delete piece
    app.post('/api/concert/piece/delete/', function (req, res) {
        console.log(req);
        musiclibModel.findById(req.body.params.org_id, function(err, orgObj) {
            var concertObj = orgObj.concerts.id(req.body.params.concert_id);
            var pieceObj = concertObj.pieces.id(req.body.params.piece_id);
            if(err)
                res.send("Unable to locate organization")
                
           pieceObj.remove();
           orgObj.save(function(err){
               if(err) res.send("Unable to delete");
           });
            console.log(orgObj);
            res.send(orgObj);    
       });
    });
 
    //Delete instrument
    app.post('/api/concert/instrument/delete/', function (req, res) {
        console.log(req);
        musiclibModel.findById(req.body.params.org_id, function(err, orgObj) {
            var concertObj = orgObj.concerts.id(req.body.params.concert_id);
            var instrumentObj = concertObj.instruments.id(req.body.params.instrument_id);
            if(err)
                res.send("Unable to locate organization")
                
           instrumentObj.remove();
           orgObj.save(function(err){
               if(err) res.send("Unable to delete instrument");
           });
            musiclibModel.findById(req.body.params.org_id, function(err, orgObj) {
                var concertObj = orgObj.concerts.id(req.body.params.concert_id);
                var instruments = concertObj.instruments;
                if(err)
                    res.send("Unable to fetch updated instrument list")
                res.send(instruments);    
            });    
       });
    });
    
    // Fetch organization by org name,owner
    app.get('/api/org/name/', function(req, res) {
        console.log(req.query);
        musiclibModel.findOne({org_name: req.query.org_name, org_owner: req.query.org_owner}, function(err, result) {
            if(err)
                res.send("Unable to locate organization" + req.params.org_name)
            res.send(result);    
            console.log(result);
        });
    });

    // Fetch all concerts for this organization
    app.get('/api/concerts', function(req, res) {
        console.log(req);
        musiclibModel.findById(req.query.org_id, function(err, orgObj) {
            var concerts = orgObj.concerts;
            if(err)
                res.send("Unable to locate organization")
                console.log(concerts);
            res.send(concerts);    
        });
    });
    
    // Fetch all pieces for a specific concert-works
    app.get('/api/concert/pieces', function(req, res) {
        //console.log(req);
        musiclibModel.findById(req.query.org_id, function(err, orgObj) {
            var concertObj = orgObj.concerts.id(req.query.concert_id);
            var pieces = concertObj.pieces;
            if(err)
                res.send("Unable to locate organization")
            res.send(pieces);    
        });
    });
    // Fetch all instruments for a specific concert
    app.get('/api/concert/instruments', function(req, res) {
       //console.log(req);
        musiclibModel.findById(req.query.org_id, function(err, orgObj) {
            var concertObj = orgObj.concerts.id(req.query.concert_id);
            var instruments = concertObj.instruments;
            if(err)
                res.send("Unable to locate organization")
            res.send(instruments);    
        });
    });

    // fetch all parts for a piece
    app.get('/api/concert/piece/parts/', function(req, res) {
       // console.log(req);
        musicMatrixModel.find({piece_name:req.query.piece_name}, function(err, results) {
                if ( err)
                    res.send("error");// todo:handleError(err);
                console.log(results);
                res.send(results);
            });
        });
   app.get('/api/concert/piece/part/get', function(req, res) {
       //console.log(req);
        musicMatrixModel.findOne({$and: [{piece_name:req.query.piece_name}, {instrument_name: req.query.instrument_name}]},function(err, partObj) {
            if(err) throw(err);
            res.send(partObj);
        });
        
    });
    // ---------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});
}