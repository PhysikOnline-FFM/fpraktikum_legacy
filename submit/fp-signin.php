<?php

require_once("class.fp_register.php");
require_once("../include/fp_constants.php");
require_once("../include/class.logger.php");

ini_set( 'E_ALL', 1 );
ini_set( 'display_errors', 1 );


/**
 * Script handles all signing up processes.
 *
 * @date January 2017
 * @author Lars Gröber
 */
$Register = new Register();

/**
 * A user wants to register.
 */
if ( isset( $_POST['submit_register'] ) )
{
    // saves form-input data of student
    $data = [
        "registrant" => htmlspecialchars( $_POST['registrant'] ),
        "graduation" => htmlspecialchars( $_POST['graduation'] ),
        "semester"   => htmlspecialchars( $_POST['semester'] ),
        "institute1" => htmlspecialchars( $_POST['institute1'] ),
        "institute2" => htmlspecialchars( $_POST['institute2'] ),
        "notes"      => htmlspecialchars( $_POST['notes'] ) . " "
    ];

    $partner = NULL;
    $partner_name = NULL;

    // check if the user chose a partner
    $post = htmlspecialchars( $_POST['check-partner'] );
    if ( isset( $post ) )
    {
        $partner = htmlspecialchars( $_POST['partner-hrz'] );
        $partner_name = htmlspecialchars( $_POST['partner-name'] );
    }

    // actual sign up process
    $Register->signUp_registrant( $data, $partner, $partner_name );
}
/**
 * A partner wants to accept.
 */
elseif ( isset( $_POST['submit_partner-accepts'] ) )
{
    $Register->signUp_partner( htmlspecialchars( $_POST['partner'] ), htmlspecialchars( $_POST['semester'] ), htmlspecialchars( $_POST['token'] ) );
}

if ( $Register->isErrorBit() )
{
    echo '<div class=\"alert alert-danger\" role=\"alert\"><strong>Fehler:</strong><ul>';
    foreach ( $Register->getError() as $key => $text )
    {
        echo '<li>' . $text . '</li>';
    }
    echo '</ul></div>';
    exit ();
}

echo '<div class=\"alert alert-danger\" role=\"alert\"><strong>Erfolg:</strong> Deine Daten wurden erfolgreich gespeichert!</p>';

header( "Location: " . fp_const\REGISTRATION_MASK );

?>

<!--Deine Daten wurden erfolgreich gespeichert!-->
