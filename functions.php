<?php

function myplugin_add_meta_box() {

	$screens = array( 'post', 'page' );

	foreach ( $screens as $screen ) {

		add_meta_box(
			'NikeFuelDisplay-ChooseRun',
			__( 'NikeFuel Display Run', 'NikeFuel_ChooseRun' ),
			'myplugin_meta_box_callback',
			$screen,
			'side'
		);
	}
}
add_action( 'add_meta_boxes', 'myplugin_add_meta_box' );

/**
 * Prints the box content.
 * 
 * @param WP_Post $post The object for the current post/page.
 */
function myplugin_meta_box_callback( $post ) {

	// Add an nonce field so we can check for it later.
	wp_nonce_field( 'myplugin_meta_box', 'myplugin_meta_box_nonce' );

	/*
	 * Use get_post_meta() to retrieve an existing value
	 * from the database and use the value for the form.
	 */
	$nikeRun = get_post_meta( $post->ID, 'nikeFuelRun', true );
?>

  <p>
    <select class="widefat" name="nikeFuelRun" id="nikeFuelRun">

	<option value="1">No Run</option> 

<?php
include_once (plugin_dir_path(__FILE__) . '/nike.php');

$n = new NikePlusPHP();
$activites = $n->activities();

function cmp($a, $b)
{
	return strtotime($b["date"]) - strtotime($a["date"]);
}
$b = 0;

foreach($activites as $key => $value){
	$b++;
	$activity = $n->activity($key);
	$datetime = $activity->activity->startTimeUtc;
	$dtarray = explode("T", $datetime);
	$act[$b]['key'] = $key;
	$act[$b]['date'] = $dtarray[0];
	$act[$b]['miles'] = $n->toMiles($activity->activity->distance);
	$act[$b]['fuel'] = $activity->activity->fuel;
}

	usort($act, "cmp");

	print_r($act);

	for($p = 0; $act[$p]; $p++){
			echo '<option value="'.$act[$p]['key'].'" ';
			if($act[$p]['key'] == $nikeRun){
				echo 'selected';
			}
			echo '>'.$act[$p]["date"].' // '.$act[$p]["fuel"].' // '.$act[$p]["miles"].'</option>';
	}
	
?>
</select>

  </p>


<?php
}

/**
 * When the post is saved, saves our custom data.
 *
 * @param int $post_id The ID of the post being saved.
 */
function myplugin_save_meta_box_data( $post_id ) {

	/*
	 * We need to verify this came from our screen and with proper authorization,
	 * because the save_post action can be triggered at other times.
	 */

	// Check if our nonce is set.
	if ( ! isset( $_POST['myplugin_meta_box_nonce'] ) ) {
		return;
	}

	// Verify that the nonce is valid.
	if ( ! wp_verify_nonce( $_POST['myplugin_meta_box_nonce'], 'myplugin_meta_box' ) ) {
		return;
	}

	// If this is an autosave, our form has not been submitted, so we don't want to do anything.
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}

	// Check the user's permissions.
	if ( isset( $_POST['post_type'] ) && 'page' == $_POST['post_type'] ) {

		if ( ! current_user_can( 'edit_page', $post_id ) ) {
			return;
		}

	} else {

		if ( ! current_user_can( 'edit_post', $post_id ) ) {
			return;
		}
	}

	/* OK, it's safe for us to save the data now. */
	
	// Make sure that it is set.
	if ( ! isset( $_POST['nikeFuelRun'] ) ) {
		return;
	}

	// Sanitize user input.
	$my_data = $_POST['nikeFuelRun'];

	// Update the meta field in the database.
	update_post_meta( $post_id, 'nikeFuelRun', $my_data );
}
add_action( 'save_post', 'myplugin_save_meta_box_data' );

?>