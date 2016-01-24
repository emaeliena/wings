fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';

var wingsApp = angular.module('wingsApp', []);

wingsApp.controller('WingsCtrl', function ($scope) {

	console.log(angular.element(document).find('#apply'));

	var getAnimationFabricPrefix = function (value) {
		return (value < 0) ? '-=' : '+=';
	}

	var canvas = new fabric.Canvas('c', {
		backgroundColor: 'rgb(100,100,200)',
		width: 1500,
		height: 600
	});

	$scope.activeCard = {
		x: '100',
		y: '0',
		angle: '0'
	};

	fabric.Image.fromURL('generic.png', function (img) {
		canvas.add(img);

		angular.element(document).find('#apply').on("click", function () {
			object_angle = img.angle * Math.PI / 180;
			length = Math.sqrt($scope.activeCard.x*$scope.activeCard.x+$scope.activeCard.y*$scope.activeCard.y);

			var xp = Math.sin(object_angle)*length;
			var yp = Math.cos(object_angle)*length*-1;
			var x_prefix = getAnimationFabricPrefix(xp);
			var y_prefix = getAnimationFabricPrefix(yp);
			var angle_prefix = getAnimationFabricPrefix($scope.activeCard.angle);

			img.animate('angle', angle_prefix + Math.abs($scope.activeCard.angle));
			img.animate('top', y_prefix + Math.abs(yp));
			img.animate('left', x_prefix + Math.abs(xp), {
				onChange: canvas.renderAll.bind(canvas),
			});

		});
	}, {
		left: 250,
		top: 250,
		angle: 45,
		lockScalingX: true,
		lockScalingY: true,
	});


});
