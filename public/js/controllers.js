    musicAppVar.controller('mainController', function($scope, $http, musicSvc) {
        $scope.formData = {};
        $scope.orgData = musicSvc.orgData;
        $scope.editData = {};

        //watch?
        $scope.$watch('orgData', function() {
            musicSvc.orgData = $scope.orgData;
            console.log($scope.orgData);
        });
        
        $scope.getConcerts = function(orgId) {
            musicSvc.getConcerts(orgId)
                .success(function(data) {
                    $scope.concerts = data;
            });
        };
        
        // for downloading pieces as csv
        $scope.getPiecesCSV= function() {
            $scope.piecesArray = $scope.pieces;
            for(index=0; index < $scope.pieces.length; ++index){
                $scope.piecesArray[index]._id= null;
            }
            return $scope.piecesArray;
            
        };
        // for downloading parts as csv
        $scope.getPartsCSV= function() {
            $scope.partsArray = $scope.parts;
            for(index=0; index < $scope.parts.length; ++index){
                $scope.partsArray[index]._id = null;
                $scope.partsArray[index]._v = null;
            }
            return $scope.partsArray;
            
        };
 
        $scope.getOrg = function() {// by name and owner?
            if($scope.formData.orgname != undefined) { 
                //console.log($scope.formData.orgname);
                musicSvc.getOrg($scope.formData.orgname, $scope.formData.orgowner)
                    .success(function(data) {
                    $scope.orgData = data;
                    $scope.concerts = data.concerts;
                });
            }
        };
        
        $scope.getPieces = function(orgId, concertId) {
            if(concertId != undefined) { 
                //console.log(orgId);
                //console.log(concertId);
                musicSvc.getPieces(orgId, concertId)
                    .success(function(data) {
                    $scope.pieces = data; 
                });
            }
        };

        //get instruments in concert
        $scope.getInstruments = function(orgId, concertId) {
            if(concertId != undefined) { 
                console.log(orgId);
                console.log(concertId);
                musicSvc.getInstruments(orgId, concertId)
                    .success(function(data) {
                    $scope.instruments = data; 
                });
            }
        };
        // get parts by selected concert/piece
        $scope.getParts = function(pieceName) {
            console.log("in parts");
            if(pieceName != undefined) { 
                musicSvc.getParts(pieceName)
                    .success(function(data) {
                    $scope.parts = data; 
                    console.log($scope.parts);
                });
            }
        };
 
        $scope.getPart = function(pieceId, partId) { 
                musicSvc.getPart(pieceId, partId)
                    .success(function(data) {
                        $scope.formData = {};
                    $scope.part = data;
                });
        };
        
        $scope.getPartsMatrix = function(orgId, concertId) {
            if(concertId != undefined) { 
                //console.log(orgId);
                //console.log(concertId);
                musicSvc.getPartsMatrix(orgId, concertId)
                    .success(function(data) {
                    $scope.partsMatrix = data; 
                });
            }
        };
        
        $scope.create = function() {
            if($scope.formData.orgname != undefined) { 
                musicSvc.create($scope.formData)
                    .success(function(data) {
                        $scope.formData = {};
                        $scope.org = data;
                        musicSvc.setOrgData(data);
                        console.log(data);
                });
            }
        };
    
        $scope.createConcert = function(orgId) {
            //var odata = musicSvc.getOrgData();
            //console.log(odata);//odata._id
            //var orgId = "592f72b77af10328b4dd8ff9";
            console.log(orgId);
            if($scope.formData.name != undefined && orgId != undefined) { 
                musicSvc.createConcert(orgId, $scope.formData)
                    .success(function(data) {
                        $scope.formData = {};
                        $scope.concert = data;
                    console.log($scope.concert);
                });
            }
        };
 
        $scope.createPiece = function(orgId,concertId) {
            console.log(orgId);
            console.log(concertId);
            if($scope.formData.title != undefined) {
                musicSvc.createPiece(orgId, concertId, $scope.formData)
                    .success(function(data) {
                        $scope.formData = {};
                    $scope.orgData = data;
                    $scope.concerts = data.concerts;
                });
            }
        };
    
        $scope.addInstrument = function(orgId, concertId) {
            if($scope.formData.instrument != undefined) { 
                musicSvc.addInstrument(orgId, concertId, $scope.formData)
                    .success(function(data) {
                        $scope.instruments = data;
                        $scope.formData = {};
              });               
            }
        }
        $scope.createPart = function(pieceId,instrumentId) {
            console.log(pieceId);
            console.log(instrumentId);
            if($scope.formData.key != undefined) { 
                musicSvc.createPart(pieceId,instrumentId, $scope.formData)
                    .success(function(data) {
                        $scope.formData = {};
                        //$scope.concerts = data;
                });
            }
        };
  
        $scope.updateConcert = function(orgId, concertId) {
            //var odata = musicSvc.getOrgData();
            //console.log(odata);//odata._id
            if($scope.formData.name != undefined) { 
                musicSvc.updateConcert(orgId, concertId, $scope.formData)
                    .success(function(data) {
                        $scope.formData = {};
                });
            }
        };
 
        $scope.updatePiece = function(orgId, concertId, pieceId) {
            if($scope.formData.name != undefined) { 
                musicSvc.updatePiece(orgId, concertId, pieceId, $scope.formData)
                    .success(function(data) {
                        $scope.formData = {};
                });
            }
        };
        
        $scope.updatePart = function(pieceId, partId) { // its actually name
            if($scope.formData != undefined) { 
                console.log($scope.formData);
                //console.log($scope.formData.key);
                musicSvc.updatePart(pieceId, partId, $scope.formData)
                    .success(function(data) {
                        $scope.formData = {};
                        console.log(data);
                });
            }
        };

        $scope.deleteConcert = function(orgId, concertId) {
            if(concertId != undefined) {
                musicSvc.deleteConcert(orgId, concertId)
                    .success(function(data) {
                        $scope.formData = {};
                        //$scope.concerts = data;
                });
            }
        };
        
         $scope.deletePiece = function(orgId, concertId, pieceId) {
            if(pieceId != undefined) {
                musicSvc.deletePiece(orgId, concertId, pieceId)
                    .success(function(data) {
                        $scope.formData = {};
                    $scope.orgData = data;
                    $scope.concerts = data.concerts;
                });
            }
        };
        
        $scope.deletePart = function(orgId, concertId, pieceId, partId) {
            if(partId != undefined) {
                musicSvc.deletePart(orgId, concertId, pieceId, partId)
                    .success(function(data) {
                        $scope.formData = {};
                        //$scope.concerts = data;
                });
            }
        };
        
        $scope.EditConcert = function() {
            console.log($scope.editData);
            console.log($scope.orgData._id);
            var orgId = $scope.orgData._id;
            var concertId = $scope.editData.concert._id;
            $scope.pieces = $scope.editData.concert.pieces;
            musicSvc.deleteConcert(orgId, concertId)
                    .success(function(data) {
                        $scope.formData = {};
                        //$scope.concerts = data;
                });
        };

        $scope.EditPiece = function() {
            console.log($scope.editData);
            var orgId = $scope.orgData._id;
            var concertId = $scope.selectedC._id;
            var pieceId = $scope.editData.piece._id;
                musicSvc.deletePiece(orgId, concertId, pieceId)
                    .success(function(data) {
                        $scope.formData = {};
                        //$scope.concerts = data;
                });           
        };
 
        $scope.EditInstrument = function() {
            console.log($scope.editData);
            var orgId = $scope.orgData._id;
            var concertId = $scope.selectedC._id;
            var instrumentId = $scope.editData.instrument._id;
            musicSvc.deleteInstrument(orgId,concertId,instrumentId)
                .success(function(data) {
                $scope.instruments = data;
            });
            //console.log(selectedId);
        };
        $scope.EditPart = function() {
            console.log($scope.editData);
            var selectedId = $scope.editData.part._id;
           
            console.log(selectedId);
        };
        /*$scope.deleteConcert = function(id) {
            musicSvc.delete(id)
                .success(function(data) {
                //$scope.concerts = data;
            });
        };*/
    });

    