/**
 * Created by NNNGUYEN on 9/21/2015.
 */
posiba.controller('mapController', function($scope, $http) {
		// create a message to display in our view
    $scope.message = 'Map Module';
    $scope.selectedCityName = ko.observable();

    //$scope.centerProperty = {
    //    lat: 45,
    //    lng: -73
    //};
    //$scope.zoomProperty = 8;
    //$scope.markersProperty = [ {
    //    latitude: 45,
    //    longitude: -74
    //}];
    //$scope.clickedLatitudeProperty = null;
    //$scope.clickedLongitudeProperty = null;

    $http.get();
});
