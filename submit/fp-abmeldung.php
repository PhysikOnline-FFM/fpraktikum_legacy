<?php

/**
 * script that is called after user wants to delete registration
 */
error_reporting(E_ALL);
ini_set('display_errors', 1);

$Anmeldeformular = '<a href="http://4-3.ilias.physikelearning.de/ilias.php?ref_id=11819&cmd=frameset&cmdClass=ilrepositorygui&cmdNode=du&baseClass=ilRepositoryGUI">Anmeldeformular</a>';

$data = [
  "hrz" => $_POST['hrz'],
  "graduation" => $_POST['graduation']
];

foreach ($data as $name => $value) {
  if (!$value) {
    echo '<h1>Bitte rufe diese Seite nur über das '.$Anmeldeformular.' auf.</h1>';
    exit();
  }
}

require '/home/elearning-www/public_html/elearning/ilias-5.1/Customizing/global/include/fpraktikum/database/class.FP-Database.php';

$error = "";

// something needs to happen if the user has a partner

$fp_database = new FP_Database();


// check user input again
if ($fp_database->checkUser($data['hrz'], $data['graduation']) == false) {
  $error = "Du bist nicht angemeldet und kannst dich nicht abmelden, bitte gehe wieder zum ".$Anmeldeformular." zurück";
}

// more checks, e.g. regex checks for entries

if ($error != "") {
  echo '<h1>'.$error.'</h1>';
  exit ();
}

// it should be save now to access the db

if ($fp_database->rmAnmeldung($data)) {
  echo "<br>Du hast dich erfolgreich ausgetragen.<br>";
} else {
  // TO-DO: Error-message + Info for user what he has to do (mailing admin? maybe?)
  echo "<br>Du konntest dich nicht austragen.<br>";
}

header('Location: http://5-1.ilias.physikelearning.de/goto_FB13-PhysikOnline_cat_11819.html');
?>

