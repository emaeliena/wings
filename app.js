var $ = function(id){ return document.getElementById(id); }
fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';

var easing_chosen = null;
for (var k in fabric.util.ease) {
	if (easing_chosen === null) {
		easing_chosen = k;
	}
	var option  = document.createElement('option');
	option.value = k;
	option.innerHTML = k;

	$('easing').appendChild(option);
}

var canvas = new fabric.Canvas('c', {
	backgroundColor: 'rgb(100,100,200)',
	width: 1500,
	height: 800
});

fabric.Image.fromURL('generic.png', function (img) {
	// img.filters.push(new fabric.Image.filters.Grayscale())
	// img.applyFilters(canvas.renderAll.bind(canvas));
	canvas.add(img);

	var easing = fabric.util.ease.easeInExpo;

	$('rotate').onclick = function () {
		img.animate('angle', '+=25', {
			onChange: canvas.renderAll.bind(canvas)
		});
	};
	$('move').onclick = function () {
		img.animate('left', '+=150', {
			onChange: canvas.renderAll.bind(canvas)
		});
	};
	$('combine').onclick = function () {
		img.animate('angle', '=45');
		img.animate('top', '+=65');
		img.animate('left', '+=250', {
			onChange: canvas.renderAll.bind(canvas),
			easing: fabric.util.ease[easing_chosen]
		});
	};
	$('reset').onclick = function () {
		img.animate('angle', '90');
		img.animate('top', '250');
		img.animate('left', '250', {
			onChange: canvas.renderAll.bind(canvas),
			easing: easing
		});
	};
	$('easing').onchange = function () {
		console.log('onchange fired');
		console.log(this);
		easing_chosen = this.value;
	};
	$('apply').onclick = function () {
		object_angle = img.angle * Math.PI / 180;
		var x = 100;
		var y = 100;
		var angle = -30;
		length = Math.sqrt(x*x+y*y);

		console.log(Math.sin(object_angle));

		var xp = Math.sin(object_angle)*length;
		var yp = Math.cos(object_angle)*length*-1;

		var x_prefix = (xp < 0) ? '-=' : '+=';
		var y_prefix = (yp < 0) ? '-=' : '+=';
		var angle_prefix = (angle < 0) ? '-=' : '+=';

		img.animate('angle', angle_prefix + Math.abs(angle));
		img.animate('top', y_prefix + Math.abs(yp));
		img.animate('left', x_prefix + Math.abs(xp), {
			onChange: canvas.renderAll.bind(canvas),
		});

	};
}, {
	left: 250,
	top: 250,
	angle: 45,
	lockScalingX: true,
	lockScalingY: true,
});

