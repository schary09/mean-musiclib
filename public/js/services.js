    musicAppVar.service('musicSvc', function($http){
        var self = this;
        this.orgData = {};
        return {
            create : function(org) {
                orgData =  $http.post('/api/org',org);
                return orgData;
            },
            setOrgData: function(odata){
                orgData = odata;
            },
            getOrgData :function() {
                return orgData;
            },
            createConcert: function(orgId, concertData) {
                orgData =  $http.post('/api/concert/', {params: {"org_id": orgId, "concert_data": concertData}});
                return orgData;
            },
            createPiece: function(orgId, concertId, pieceData) {
                return $http.post('/api/concert/piece/', {params: {"org_id": orgId , "concert_id": concertId, "piece_data": pieceData}});
            },
            addInstrument: function(orgId, concertId, instrumentData) {
                return $http.post('/api/concert/instrument/', {params: {"org_id": orgId , "concert_id": concertId, "instrument_data": instrumentData}});
            },
            createPart: function(pieceId, instrumentId,instrumentData) {
                return $http.post('/api/concert/piece/part/', {params: {"piece_name": pieceId, "instrument_name": instrumentId, "instrument_data": instrumentData}});
            },
            updateConcert: function(orgId, concertId, concertData) {
                return $http.post('/api/concert/', {params: {"org_id": orgId, "concert_id": concertId, "concert_data": concertData}});
            },
            updatePiece: function(concertId, pieceId, pieceData) {
                return $http.post('/api/concert/piece/', {params: {"concert_id": concertId, "piece_id": pieceId, "piece_data": pieceData}});
            },
            updatePart: function(pieceName, instrumentName, instrumentData) {
                return $http.post('/api/concert/piece/part/update', {params: {"piece_name": pieceName, "instrument_name" : instrumentName, "instrument_data": instrumentData}});
            },
            getOrg: function(orgname, orgowner) {
              orgData = $http.get('/api/org/name' , {params: {"org_name": orgname,"org_owner": orgowner}});
                return orgData;
            },
            getConcert: function(concertId) {
                return $http.get('/api/concert/', {params: {"org_id": orgId, "concert_id": concertId}});
            },
            getPieces: function (orgId, concertId) {
                return $http.get('/api/concert/pieces/', {params: {"org_id": orgId, "concert_id": concertId}});
            },
            getInstruments: function(orgId, concertId) {
                return $http.post('/api/concert/instruments/', {params: {"org_id": orgId , "concert_id": concertId}});
            },           
            getParts: function (pieceName) {
                return $http.get('/api/concert/piece/parts/', {params: {"piece_name": pieceName}}); // can use id too
            },
            getPart: function(pieceName, instrumentName) {
                return $http.get('/api/concert/piece/part/get', {params: {"piece_name": pieceName, "instrument_name" : instrumentName}});
            },
            getConcerts : function(orgId) {// get all concerts for this org id
                return $http.get('/api/concerts/', {params: {"org_id": orgId}});
            },
            getPartsMatrix: function (orgId, concertId) {
                return $http.get('/api/concert/partsmatrix/', {params: {"org_id": orgId, "concert_id": concertId}});
            },
            deleteConcert: function(orgId,concertId) {
                return $http.post('/api/concert/delete/', {params: {"org_id": orgId, "concert_id": concertId}})   
            },
            deletePiece: function(orgId, concertId, pieceId) {
                return $http.post('/api/concert/piece/delete/', {params: {"org_id": orgId, "concert_id": concertId, "piece_id": pieceId}});
            },
            deleteInstrument: function(orgId, concertId, instrumentId) {
                return $http.post('/api/concert/instrument/delete/', {params: {"org_id": orgId, "concert_id": concertId, "instrument_id": instrumentId}});
            },            
            deletePart: function(orgId, concertId,pieceId, partId) {
                  return $http.post('/api/concert/piece/part/delete/', {params: {"org_id": orgId, "concert_id": concertId, "piece_id": pieceId, "part_id": partId}});              
            }
        }

}); 