/*
jquery.percentageloader.js 
 
Copyright (c) 2012, Better2Web
All rights reserved.

This jQuery plugin is licensed under the Simplified BSD License. Please
see the file license.txt that was included with the plugin bundle.

*/

/*global jQuery */

(function ($) {
    /* Strict mode for this plugin */
    "use strict";
    /*jslint browser: true */

    /* Our spiral gradient data */
    var imgdata = "data:image/png;base64,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",
        gradient = new Image();
    gradient.src = imgdata;

    /** Percentage loader
     * @param	params	Specify options in {}. May be on of width, height, progress or value.
     *
     * @example $("#myloader-container).percentageLoader({
		    width : 256,  // width in pixels
		    height : 256, // height in pixels
		    progress: 0,  // initialise progress bar position, within the range [0..1]
		    value: '0mi'  // initialise text label to this value
		});
     */
    $.fn.percentageLoader = function (params) {
        var settings, canvas, percentageText, valueText, items, i, item, selectors, s, ctx, progress,
            value, cX, cY, lingrad, innerGrad, tubeGrad, innerRadius, innerBarRadius, outerBarRadius,
            radius, startAngle, endAngle, counterClockwise, completeAngle, setProgress, setValue,
            applyAngle, drawLoader, clipValue, outerDiv, fuel, totalFuel;

        /* Specify default settings */
        settings = {
            width: 256,
            height: 256,
            progress: 0,
            value: '0mi',
            controllable: false,
			fuel: 0
        };

        /* Override default settings with provided params, if any */
        if (params !== undefined) {
            $.extend(settings, params);
        } else {
            params = settings;
        }

        outerDiv = document.createElement('div');
        outerDiv.style.width = settings.width + 'px';
        outerDiv.style.height = settings.height + 'px';
        outerDiv.style.position = 'relative';

        $(this).append(outerDiv);

        /* Create our canvas object */
        canvas = document.createElement('canvas');
        canvas.setAttribute('width', settings.width);
        canvas.setAttribute('height', settings.height);
        outerDiv.appendChild(canvas);

        /* Create div elements we'll use for text. Drawing text is
         * possible with canvas but it is tricky working with custom
         * fonts as it is hard to guarantee when they become available
         * with differences between browsers. DOM is a safer bet here */
        percentageText = document.createElement('div');
        percentageText.style.width = (settings.width.toString() - 2) + 'px';
        percentageText.style.textAlign = 'center';
        percentageText.style.height = '50px';
        percentageText.style.left = 0;
        percentageText.style.position = 'absolute';

        valueText = document.createElement('div');
        valueText.style.width = (settings.width - 2).toString() + 'px';
        valueText.style.textAlign = 'center';
        valueText.style.height = '0px';
        valueText.style.overflow = 'hidden';
        valueText.style.left = 0;
        valueText.style.position = 'absolute';

        /* Force text items to not allow selection */
        items = [valueText, percentageText];
        for (i  = 0; i < items.length; i += 1) {
            item = items[i];
            selectors = [
                '-webkit-user-select',
                '-khtml-user-select',
                '-moz-user-select',
                '-o-user-select',
                'user-select'];

            for (s = 0; s < selectors.length; s += 1) {
                $(item).css(selectors[s], 'none');
            }
        }

		fuel = params.fuel / 2500;
		totalFuel = params.fuel;

        /* Add the new dom elements to the containing div */
        outerDiv.appendChild(percentageText);
        outerDiv.appendChild(valueText);

        /* Get a reference to the context of our canvas object */
        ctx = canvas.getContext("2d");


        /* Set various initial values */

        /* Centre point */
        cX = (canvas.width / 2) - 1;
        cY = (canvas.height / 2) - 1;

        /* Create our linear gradient for the outer ring */
        lingrad = ctx.createLinearGradient(cX, 0, cX, canvas.height);
        lingrad.addColorStop(0, '#FFF');
        lingrad.addColorStop(1, '#FFF');

        /* Create inner gradient for the outer ring */
        innerGrad = ctx.createLinearGradient(cX, cX * 0.133333, cX, canvas.height - cX * 0.133333);
        innerGrad.addColorStop(0, '#FFF');
        innerGrad.addColorStop(1, '#FFF');

        /* Tube gradient (background, not the spiral gradient) */
        tubeGrad = ctx.createLinearGradient(cX, 0, cX, canvas.height);
        tubeGrad.addColorStop(0, '#FFF');
        tubeGrad.addColorStop(1, '#FFF');

        /* The inner circle is 2/3rds the size of the outer one */
        innerRadius = cX * 0.6666;
        /* Outer radius is the same as the width / 2, same as the centre x
        * (but we leave a little room so the borders aren't truncated) */
        radius = cX - 2;

        /* Calculate the radii of the inner tube */
        innerBarRadius = innerRadius + (cX * 0.06);
        outerBarRadius = radius - (cX * 0.06);

        /* Bottom left angle */
        startAngle = 2.1707963267949;
        /* Bottom right angle */
        endAngle = 0.9707963267949 + (Math.PI * 2.0);

        /* Nicer to pass counterClockwise / clockwise into canvas functions
        * than true / false */
        counterClockwise = false;

        /* Borders should be 1px */
        ctx.lineWidth = 1;

        /**
         * Little helper method for transforming points on a given
         * angle and distance for code clarity
         */
        applyAngle = function (point, angle, distance) {
            return {
                x : point.x + (Math.cos(angle) * distance),
                y : point.y + (Math.sin(angle) * distance)
            };
        };


        /**
         * render the widget in its entirety.
         */
        drawLoader = function () {
            /* Clear canvas entirely */
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            /*** IMAGERY ***/

            /* draw outer circle */
            ctx.fillStyle = lingrad;
            ctx.beginPath();
            ctx.strokeStyle = '#FFF';
            ctx.arc(cX, cY, radius, 0, Math.PI * 2, counterClockwise);
            ctx.fill();
            ctx.stroke();

            /* draw inner circle */
            ctx.fillStyle = innerGrad;
            ctx.beginPath();
            ctx.arc(cX, cY, innerRadius, 0, Math.PI * 2, counterClockwise);
            ctx.fill();
            ctx.strokeStyle = '#FFF';
            ctx.stroke();

            ctx.beginPath();

            /**
             * Helper function - adds a path (without calls to beginPath or closePath)
             * to the context which describes the inner tube. We use this for drawing
             * the background of the inner tube (which is always at 100%) and the
             * progress meter itself, which may vary from 0-100% */
            function makeInnerTubePath(startAngle, endAngle) {
                var centrePoint, startPoint, controlAngle, capLength, c1, c2, point1, point2;
                centrePoint = {
                    x : cX,
                    y : cY
                };

                startPoint = applyAngle(centrePoint, startAngle, innerBarRadius);

                ctx.moveTo(startPoint.x, startPoint.y);

                point1 = applyAngle(centrePoint, endAngle, innerBarRadius);
                point2 = applyAngle(centrePoint, endAngle, outerBarRadius);

                controlAngle = endAngle + (3.142 / 2.0);
                /* Cap length - a fifth of the canvas size minus 4 pixels */
                capLength = (cX * 0.20) - 4;

                c1 = applyAngle(point1, controlAngle, capLength);
                c2 = applyAngle(point2, controlAngle, capLength);

                ctx.arc(cX, cY, innerBarRadius, startAngle, endAngle, false);
                ctx.bezierCurveTo(c1.x, c1.y, c2.x, c2.y, point2.x, point2.y);
                ctx.arc(cX, cY, outerBarRadius, endAngle, startAngle, true);

                point1 = applyAngle(centrePoint, startAngle, innerBarRadius);
                point2 = applyAngle(centrePoint, startAngle, outerBarRadius);

                controlAngle = startAngle - (3.142 / 2.0);

                c1 = applyAngle(point2, controlAngle, capLength);
                c2 = applyAngle(point1, controlAngle, capLength);

                ctx.bezierCurveTo(c1.x, c1.y, c2.x, c2.y, point1.x, point1.y);
            }

            /* Background tube */
            ctx.beginPath();
            ctx.strokeStyle = '#FFF';
            makeInnerTubePath(startAngle, endAngle);

            ctx.fillStyle = tubeGrad;
            ctx.fill();
            ctx.stroke();

            /* Calculate angles for the the progress metre */
            completeAngle = startAngle + (progress * (endAngle - startAngle));

            ctx.beginPath();
            makeInnerTubePath(startAngle, completeAngle);

            /* We're going to apply a clip so save the current state */
            ctx.save();
            /* Clip so we can apply the image gradient */
            ctx.clip();

            /* Draw the spiral gradient over the clipped area */
            ctx.drawImage(gradient, 0, 0, canvas.width, canvas.height);

            /* Undo the clip */
            ctx.restore();

            /* Draw the outline of the path */
            ctx.beginPath();
            makeInnerTubePath(startAngle, completeAngle);
            ctx.stroke();

            /*** TEXT ***/
            (function () {
                var fontSize, string, smallSize, heightRemaining;
                /* Calculate the size of the font based on the canvas size */
                fontSize = cX / 2;

                percentageText.style.top = ((settings.height / 2) - (fontSize / 2)).toString() - 10 + 'px';
                percentageText.style.color = '#OOO';
                percentageText.style.font = fontSize.toString() + 'px BebasNeueRegular';
                percentageText.style.textShadow = '0 1px 1px #FFFFFF';

                /* Calculate the text for the given percentage */
                string = (progress * 2500.0).toFixed(0) + '<img src="http://www.scottmacarthurritter.com/wp-content/themes/syntax/images/fuelPoints.png" width="14px" style="margin-bottom: 25px"/>';

                percentageText.innerHTML = string;

                /* Calculate font and placement of small 'value' text */
                smallSize = cX / 5.5;
                valueText.style.color = '#000';
                valueText.style.font = smallSize.toString() + 'px BebasNeueRegular';
                valueText.style.height = smallSize.toString() + 'px';
                valueText.style.textShadow = 'None';

                /* Ugly vertical align calculations - fit into bottom ring.
                 * The bottom ring occupes 1/6 of the diameter of the circle */
                heightRemaining = (settings.height * 0.16666666) - smallSize;
                valueText.style.top = ((settings.height * 0.8333333) + (heightRemaining / 4) - 38).toString() + 'px';
            }());
        };

        /**
        * Check the progress value and ensure it is within the correct bounds [0..1]
        */
        clipValue = function () {
            if (progress < 0) {
                progress = 0;
            }

            if (progress > 1.0) {
                progress = 1.0;
            }
        };

        /* Sets the current progress level of the loader
         *
         * @param value the progress value, from 0 to 1. Values outside this range
         * will be clipped
         */
        setProgress = function (value) {
            /* Clip values to the range [0..1] */
            progress = value;
			if(progress < fuel){
	            clipValue();
	            drawLoader();
				if(progress
 == 1){
				percentageText.innerHTML = totalFuel + '<img src="http://www.scottmacarthurritter.com/wp-content/themes/syntax/images/fuelPoints.png" width="14px" style="margin-bottom: 25px"/>';
				}
			}
			else{
				percentageText.innerHTML = totalFuel + '<img src="http://www.scottmacarthurritter.com/wp-content/themes/syntax/images/fuelPoints.png" width="14px" style="margin-bottom: 25px"/>';
			}
        };

        this.setProgress = setProgress;

        setValue = function (val) {
            value = val;
            valueText.innerHTML = value;
        };

        this.setValue = setValue;
        this.setValue(settings.value);

        progress = settings.progress;
        clipValue();

        /* Do an initial draw */
        drawLoader();

        /* In controllable mode, add event handlers */
        if (params.controllable === true) {
            (function () {
                var mouseDown, getDistance, adjustProgressWithXY;
                getDistance = function (x, y) {
                    return Math.sqrt(Math.pow(x - cX, 2) + Math.pow(y - cY, 2));
                };

                mouseDown = false;

                adjustProgressWithXY = function (x, y) {
                    /* within the bar, calculate angle of touch point */
                    var pX, pY, angle, startTouchAngle, range, posValue;
                    pX = x - cX;
                    pY = y - cY;

                    angle = Math.atan2(pY, pX);
                    if (angle > Math.PI / 2.0) {
                        angle -= (Math.PI * 2.0);
                    }

                    startTouchAngle = startAngle - (Math.PI * 2.0);
                    range = endAngle - startAngle;
                    posValue = (angle - startTouchAngle) / range;
                    setProgress(posValue);

                    if (params.onProgressUpdate) {
                        /* use the progress value as this will have been clipped
                         * to the correct range [0..1] after the call to setProgress
                         */
                        params.onProgressUpdate(progress);
                    }
                };

                $(outerDiv).mousedown(function (e) {
                    var offset, x, y, distance;
                    offset = $(this).offset();
                    x = e.pageX - offset.left;
                    y = e.pageY - offset.top;

                    distance = getDistance(x, y);

                    if (distance > innerRadius && distance < radius) {
                        mouseDown = true;
                        adjustProgressWithXY(x, y);
                    }
                }).mouseup(function () {
                    mouseDown = false;
                }).mousemove(function (e) {
                    var offset, x, y;
                    if (mouseDown) {
                        offset = $(outerDiv).offset();
                        x = e.pageX - offset.left;
                        y = e.pageY - offset.top;
                        adjustProgressWithXY(x, y);
                    }
                }).mouseleave(function () {
                    mouseDown = false;
                });
            }());
        }
        return this;
    };
}(jQuery));
