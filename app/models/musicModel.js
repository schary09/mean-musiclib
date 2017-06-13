var mongoose = require('mongoose');

var partSchema = mongoose.Schema ({ 
    instrument: String
});

var pieceSchema = mongoose.Schema ({ 
        title: String,
        composer_last: String,
        composer_first: String,
        ensemble: String,
        chorus_source: String,
        symphony_source: String,
        duration: String
});
//each concert has one or more pieces and one or instruments
var concertSchema = mongoose.Schema ({ 
        name: String,
        date: Date,
        location: String,
        created_date: Date,
        updated_date: Date,
        active: Boolean,     
        pieces: [pieceSchema],
        instruments: [partSchema]  // id and instrument names
});

var orgSchema = mongoose.Schema ({
    org_name: String,  //Symphony,orchestra name
    org_home: String,
    org_owner: String,  // email 
    org_pwd: String,
    concerts: [concertSchema]
 });

// A piece is associated with one or more instruments. todo: instrument_nameand key should be
// a list for one piece
var partsMatrixSchema = mongoose.Schema ({ // for part matrix
    piece_name : String,
    instrument_name : String,
    key: String
});

var partsMatrixM = mongoose.model('PartsMatrixModel', partsMatrixSchema);
var musicM = mongoose.model('MusicModel', orgSchema);

var music_schemas = {'partsMatrixM' :partsMatrixM,'musicM' : musicM};
module.exports = music_schemas;