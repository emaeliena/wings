var wingsApp = angular.module('wingsApp', []);

wingsApp.controller('WingsCtrl', function ($scope) {
	$scope.activeCard = {
		x: '100',
		y: '0',
		angle: '0'
	};
});
