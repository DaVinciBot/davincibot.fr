    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">

    <?php
        $meta_host = "https://www.davincibot.fr/";
        $meta_page = $_SERVER["REQUEST_URI"];
    ?>

    <meta property="og:title" content="DaVinciBot - Pôle Léonard de Vinci" />
    <meta property="og:url" content="<?php echo $meta_host.$meta_page; ?>" />
    <meta property="og:image" content="<?php echo $meta_host; ?>/assets/images/asso.webp" />
    <meta property="og:description" content="DaVinciBot, l'association des passionnés de robotique du Pôle Léonard de Vinci." />

    <?php /* other tags are kept in individual pages in the case they need to be changed */ ?>