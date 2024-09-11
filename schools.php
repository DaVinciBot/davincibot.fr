<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DaVinciBot - Pôle Léonard de Vinci</title>

    <link rel="stylesheet" href="/style/all.css">
    <link rel="stylesheet" href="/style/schools.css">

<?php include("./include/meta_tags.php") ?>
</head>
<body>
<?php $active_page = "schools"; include("./include/header.php"); ?>

    <section id="intro-section">
        <div class="side-colored-block anim-up block-left"></div>
        <div class="side-colored-block anim-down anim-delayed block-right"></div>

        <div id="schools-intro">
            <h2 id="page-title">Nos <span class="short-h2">trois</span> écoles au
            <span class="short-h2"><br/></span>Pôle <span class="short-h2">Universitaire</span> Léonard de Vinci</h2>

            <div id="intro-grid">
                <div id="campus-picture-container" class="img-filtered"></div>

                <p id="intro-text">
                Le pôle universitaire Léonard de Vinci est un établissement d'enseignement supérieur privé d'intérêt général implanté
                à Courbevoie en plein cœur du quartier d'affaires de La Défense. Il s'organise autour de valeurs communes que sont
                l'hybridation, la professionnalisation, l'internationalisation, l'ouverture sociale, le sport et la culture et regroupe
                plus de 7500 élèves, tous différents, tournés ensemble vers la réussite de leurs études, de leur vie professionnelle.
                <br/><br/>Le Pôle Léonard de Vinci en tant qu'établissement d'enseignement supérieur regroupe 3 écoles, des départements
                pédagogiques et des services administratifs transversaux : une école d'ingénieurs (ESILV), de commerce (EMLV) et de
                multimédia (IIM).
                </p>
            </div>
        </div>
    </section>

    <section id="schools-pres">
        <div id="school-esilv" class="school-pres">
            <img id="logo-esilv" class="school-logo" src="/assets/images/esilv.webp" alt="Logo ESILV">
            L'ESILV est l'école d'ingénieurs du Pôle Léonard de Vinci située au cœur de Paris-La Défense et à Nantes sur son 2e campus.
            Elle se caractérise par une formation scientifique et technologique généraliste de haut niveau intégrant une forte
            dimension numérique, une ouverture à l'international et une pédagogie "projets" aboutie.

            <br/><br/>L'ESILV a été classée meilleure école d'ingénieurs privée de France dans le classement 2022 des écoles d'ingénieurs
            d'excellence réalisé par Le Figaro Etudiant, et y figure au 25e rang des meilleures écoles d'ingénieurs françaises.
            L'Etudiant la classe 24e école d'ingénieurs française ex-æquo en 2022, tandis que L'Usine nouvelle la place au 5e rang
            national dans son classement de 2022.
        </div>

        <div id="school-emlv" class="school-pres">
            <img id="logo-emlv" class="school-logo" src="/assets/images/emlv.webp" alt="Logo EMLV">
            L'EMLV, l'école de commerce du pôle, forme des cadres autonomes et opérationnels, capables d'évoluer dans un contexte
            muticulturel dans les métiers de la gestion, du commerce et du management.
            <br/>La pédagogie originale de l'EMLV accorde une large place au développement personnel, à l'initiative et à l'entrepreneuriat
            et multiplie les interactions avec le monde des affaires.
        </div>

        <div id="school-iim" class="school-pres">
            <img id="logo-iim" class="school-logo" src="/assets/images/iim.webp" alt="Logo IIM">
            L'Institut de l'Internet et du Multimédia (IIM) est une école spécialisée dans le numérique. Alors que fleurissent les
            écoles dédiées au web, l'IIM a compris bien avant les autres l'importance de la révolution digitale.
            <br/>Créée en 1995, plus de 2000 étudiants, 7 titres reconnus par l'État, un réseau de plusieurs centaines d'intervenants
            professionnels et de 2 300 anciens, l'IIM reste la première école de ce secteur en pleine évolution.
        </div>
    </section>

<?php include("./include/footer.php"); ?>
</body>
</html>