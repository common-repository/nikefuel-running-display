function fuelCircle(fuel, miles){

jQuery(document).ready(function($) {

	var $topLoader = $("#topLoader").percentageLoader({width: 160, height: 160, controllable : false, progress : 0, fuel : fuel });
	var topLoaderRunning = false;
	$( window ).ready(function() {
		if (topLoaderRunning) {
			return;
		}
		topLoaderRunning = true;
		$topLoader.setProgress(0);
		$topLoader.setValue('0mi');
		var kb = 0;
		var totalKb = miles;
		var animateFunc = function() {
			kb += .07;
			$topLoader.setProgress(kb / totalKb);
			$topLoader.setValue(kb.toFixed(2).toString() + 'mi');
			if (kb <= totalKb) {
				setTimeout(animateFunc, 25);
			} else {
				$topLoader.setValue(totalKb.toFixed(2).toString() + 'mi');
				topLoaderRunning = false;
			}
		}
		setTimeout(animateFunc, 25);
	});

});

}
