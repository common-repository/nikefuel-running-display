<?php

class MySettingsPage
{
    /**
     * Holds the values to be used in the fields callbacks
     */
    private $options;

    /**
     * Start up
     */
    public function __construct()
    {
        add_action( 'admin_menu', array( $this, 'add_plugin_page' ) );
        add_action( 'admin_init', array( $this, 'page_init' ) );
    }

    /**
     * Add options page
     */
    public function add_plugin_page()
    {
        // This page will be under "Settings"
        add_options_page(
            'Settings Admin', 
            'NikeFuel Running Display', 
            'manage_options', 
            'NFRD', 
            array( $this, 'create_admin_page' )
        );
    }

    /**
     * Options page callback
     */
    public function create_admin_page()
    {
        // Set class property
//        $this->options = get_option( 'NFRD_Username' );
        $this->options = get_option( 'NFRD_Group' );
        ?>
        <div class="wrap">
            <?php screen_icon(); ?>
            <h2>NikeFuel Running Display</h2>           
            <form method="post" action="options.php">
            <?php
                settings_fields( 'NFRD_Group' );   
                do_settings_sections( 'NFRD-setting-admin' );
                submit_button(); 
            ?>
            </form>
        </div>
        <?php
    }

    /**
     * Register and add settings
     */
    public function page_init()
    {        
        register_setting(
            'NFRD_Group', // Option group
            'NFRD_Username', // Option name
            array( $this, 'sanitize' ) // Sanitize
        );

        register_setting(
            'NFRD_Group', // Option group
            'NFRD_PW', // Option name
            array( $this, 'sanitize' ) // Sanitize
        );


        add_settings_section(
            'NFRD_section_id', // ID
            'NikeFuel Running Login Information', // Title
            array( $this, 'print_section_info' ), // Callback
            'NFRD-setting-admin' // Page
        );  

        add_settings_field(
            'NFRD_Username',
            'Username', 
            array( $this, 'NFRD_Username_callback' ), // Callback
            'NFRD-setting-admin',
            'NFRD_section_id'           
        );      

        add_settings_field(
            'NFRD_PW', 
            'Password', 
            array( $this, 'NFRD_PW_Callback' ), 
            'NFRD-setting-admin', 
            'NFRD_section_id'
        );      
    }

    /**
     * Sanitize each setting field as needed
     *
     * @param array $input Contains all settings fields as array keys
     */
    public function sanitize( $input )
    {
        $new_input = array();
		
        if( isset( $input['NFRD_Username'] ) )
            $new_input['NFRD_Username'] = sanitize_text_field( $input['NFRD_Username'] );

        if( isset( $input['NFRD_PW'] ) )
            $new_input['NFRD_PW'] = sanitize_text_field( $input['NFRD_PW'] );

        return $new_input;
    }

    /** 
     * Print the Section text
     */
    public function print_section_info()
    {
        print 'Enter Your NikeFuel User Information Below:';

    }

    /** 
     * Get the settings option array and print one of its values
     */
    public function NFRD_Username_callback()
    {
	$pioptions = get_option('NFRD_Username');
        printf(
            '<input type="text" id="NFRD_Username" name="NFRD_Username[NFRD_Username]" value="'.$pioptions['NFRD_Username'].'" />',
            isset( $this->options['NFRD_Username'] ) ? esc_attr( $this->options['NFRD_Username']) : ''
        );
    }

    /** 
     * Get the settings option array and print one of its values
     */
    public function NFRD_PW_Callback()
    {
	$pioptions = get_option('NFRD_PW');
        printf(
            '<input type="password" id="NFRD_PW" name="NFRD_PW[NFRD_PW]" value="'.$pioptions['NFRD_PW'].'" />',
            isset( $this->options['NFRD_PW'] ) ? esc_attr( $this->options['NFRD_PW']) : ''
        );
    }
}

if( is_admin() )
    $my_settings_page = new MySettingsPage();

?>