<?php 
    $error_code = $_GET["code"];
    if($error_code == null) $error_code = 500;

    $messages = array(
        403 => "Accès non autorisé.",
        404 => "Page non trouvée.",
        500 => "Erreur du serveur."
    );
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DaVinciBot - Erreur <?php echo $error_code; ?></title>

    <link rel="stylesheet" href="/style/all.css">
    <link rel="stylesheet" href="/style/error.css">

<?php include("./include/meta_tags.php") ?>
</head>
<body>
    <?php $active_page = "error"; include("./include/header.php"); ?>
    <section>
        <div id="title">
            <h1 id="error-code"><?php echo $error_code ?></h1>
            <h2 id="error-title">ERREUR.</h2>
        </div>

        <h2 id="error-message">
            <?php echo $messages[$error_code]; ?>
        </h2>

        <a href="/" id="error-button">Retour à l'accueil</a>
    </section>

    <footer id="error-footer">
        <div id="error-footer-address">
            12 avenue Léonard de Vinci
            <br/>92400 Courbevoie
        </div>

        <div id="error-footer-contacts">
            <h4>Contactez-nous :</h4>
            <a href="mailto:davincibot@devinci.fr">davincibot@devinci.fr</a>
        </div>

        <div id="error-footer-socials">
            <a href="https://www.instagram.com/davincibot_pulv/" target="_blank">
                <img src="/assets/icons/instagram.svg" alt="Logo Instagram">
            </a>

            <a href="https://www.facebook.com/DaVinciBotPULV/" target="_blank">
                <img src="/assets/icons/facebook.svg" alt="Logo Facebook">
            </a>

            <a href="https://www.linkedin.com/company/davincibot/" target="_blank">
                <img src="/assets/icons/linkedin.svg" alt="Logo LinkedIn">
            </a>
        </div>
    </footer>
</body>
</html>