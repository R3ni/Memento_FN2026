<?php

$db = new PDO('sqlite:' . __DIR__ . '/../database/memento.db');

$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

?>