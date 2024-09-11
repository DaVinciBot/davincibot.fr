<?php

$file = "./links.db";
$link = "https://davincibot.fr/";
$debug = isset($_GET["debug"]);

try {
    $pdo = new PDO("sqlite:$file");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $statement = $pdo->prepare("SELECT * FROM redirection WHERE slug = :slug");

    if(!isset($_GET["link"])) {
        throw new Exception("No link provided!");
    }

    $slug = $_GET["link"];
    $statement->bindParam(":slug", $slug);
    
    $statement->execute();
    $row = $statement->fetch(PDO::FETCH_ASSOC);
    
    if ($row) {
        $link = $row["link"];
    } else {
        throw new Exception("No link found!");
    }
} catch (Exception $e) {
    if($debug) {
        die($e->getMessage());
    }
}

http_response_code(302);
header("Location: $link");

?>
