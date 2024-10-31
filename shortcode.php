<?php

function nike_function( $atts ) {

 global $post;
 extract( shortcode_atts(array(

 'param' => '',

 ),$atts));

 $post_meta = get_post_meta($post->ID);

	$runID = $post_meta['nikeFuelRun'][0];

$n = new NikePlusPHP();

if($runID && $runID != 1 && $n->userId){

echo '<div id="container"><div id="topLoader"></div></div>';

$activites = $n->activities();
$activity = $n->activity($runID);

$fuelPoints = $activity->activity->fuel;
$time = $n->toMinutes($activity->activity->duration);
$distance = $n->toMiles($activity->activity->distance);

echo  '<script type="text/javascript">fuelCircle('.$fuelPoints.' , '.$distance.');</script>';


}



}

add_shortcode('NikeFuel Display', 'nike_function');



?>