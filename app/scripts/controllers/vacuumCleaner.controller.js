'use strict';
angular.module('tpFinalApp')
  .controller('VacuumCleanerCtrl', ['$location', '$scope', '$timeout', '$interval', function ($location, $scope, $timeout, $interval) {

  		$scope.numberOfRows = 4;
  		$scope.numberOfColumns = 5;
  		$scope.value = 5;
  		$scope.cells = [];
  		$scope.indexRow = 0;
  		$scope.indexColumn = 0;
  		$scope.previousIndexRow = 0;
  		$scope.previousIndexColumn = 0;
  		$scope.aspiradoraHabilitada = false;
  		$scope.opcionesHabilitadas = true;
  		$scope.accionActualAspiradora = "Apagada";
  		$scope.cantidadBaldosasLimpiadas = 0;
  		$scope.cantidadBaldosas = 0;
  		$scope.clock = 0;
  		$scope.restartClock = 0;


  		function initialize() {
  			$scope.numberOfRows = 4;
  			$scope.numberOfColumns = 5;
			$scope.clock = 0;
			$scope.restartClock = 0;
  			var updateClock = function() {
		        if ($scope.restartClock === 1) {
		        	$scope.clock = 0;
		        	$scope.restartClock = 0;
		        }
		        else {
		        	$scope.clock = $scope.clock + 1;
		        }
		    };
		    $interval(updateClock, 1000);
    	}

  		initialize();

  		$scope.comenzarAspiradora = function () {
     		$scope.aspiradoraHabilitada = true;
     		$scope.opcionesHabilitadas = false;
     		var number;
     		$scope.cells = [];
     		$scope.cantidadBaldosas = 0;
     		for (var i = 0; i < $scope.numberOfRows; i++) {
  				var row = [];
  				for (var j = 0; j < $scope.numberOfColumns; j++) {
  					number = Math.floor(Math.random()*(5)+1);
  					$scope.cantidadBaldosas = $scope.cantidadBaldosas + 1;
  					if (number >= 3 ) {
  						row.push({estado: 'sucio', analizando: false});
  					}
  					else {
  						row.push({estado: 'limpio', analizando: false});
  					}
  				}
  				$scope.cells.push(row);
  			}
  			$scope.indexRow = 0;
	  		$scope.indexColumn = 0;
	  		$scope.previousIndexRow = 0;
	  		$scope.previousIndexColumn = 0;
	  		$scope.accionActualAspiradora = "Encendida";
	  		$scope.cantidadBaldosasLimpiadas = 0;
	  		$scope.restartClock = 1;
     		vacuumCleanerAction();
		}

		$scope.detenerAspiradora = function () {
     		$scope.aspiradoraHabilitada = false;
     		$scope.opcionesHabilitadas = true;
     		$scope.accionActualAspiradora = "Apagada";
		}

		$scope.clickCell = function(piso) {
		    if (piso.estado === 'limpio') {
		    	piso.estado = 'sucio';
		    }
		}

		function vacuumCleanerAction() {
  			$timeout(limpiarCelda,1000);	
		}

		function limpiarCelda() {
			var previousRow = $scope.cells[$scope.previousIndexRow];
			if (previousRow[$scope.previousIndexColumn].estado === 'limpiando') {
		  		previousRow[$scope.previousIndexColumn].estado = 'limpio';
		  		$scope.cantidadBaldosasLimpiadas = $scope.cantidadBaldosasLimpiadas + 1;
		  		$scope.accionActualAspiradora = "Analizando baldosa";
		  	}
			previousRow[$scope.previousIndexColumn].analizando = false;	
			if ($scope.indexRow < $scope.numberOfRows) {	//Todavia me quedan filas por analizar
				if ($scope.indexColumn === $scope.numberOfColumns) { //Ya analicé toda la fila
					$scope.indexColumn = 0;
					$scope.indexRow++;
				} 
				if ($scope.indexRow === $scope.numberOfRows && $scope.aspiradoraHabilitada) { //Ya analicé toda la superficie
					$scope.indexRow = 0;
					$timeout(limpiarCelda,1000);
				}
				else {	//Se analiza la baldosa
					var currentRow = $scope.cells[$scope.indexRow];
					currentRow[$scope.indexColumn].analizando = true;
					if (currentRow[$scope.indexColumn].estado === 'sucio' && $scope.aspiradoraHabilitada) { 
						$scope.accionActualAspiradora = "Limpiando baldosa";
		  				currentRow[$scope.indexColumn].estado = 'limpiando';
		  				$scope.previousIndexRow = $scope.indexRow;
		  				$scope.previousIndexColumn = $scope.indexColumn;
		  				$scope.indexColumn++;
		  				$timeout(limpiarCelda,3000);
		  			}
		  			else {
		  				if ($scope.aspiradoraHabilitada) {
		  					$scope.accionActualAspiradora = "La baldosa esta limpia!";
		  					$scope.previousIndexRow = $scope.indexRow;
				  			$scope.previousIndexColumn = $scope.indexColumn;
				  			$scope.indexColumn++;
				  			$timeout(limpiarCelda,1000);
		  				}
		  				else {
		  					$scope.accionActualAspiradora = "Apagada";
		  				}
		  			}
				}
			}
			else {
				if ($scope.aspiradoraHabilitada) {
					$scope.indexRow = 0;
					$scope.numberOfColumns == 0;
					$timeout(limpiarCelda,1000);
				}
			}
		}

  }]);