<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DaVinciBot - Pôle Léonard de Vinci</title>

    <link rel="stylesheet" href="/style/all.css">
    <link rel="stylesheet" href="/style/partners.css">

<?php include("./include/meta_tags.php") ?>
</head>
<body>
<?php $active_page = "partners"; include("./include/header.php"); ?>

    <div class="side-colored-block anim-down block-left"></div>
    <div class="side-colored-block anim-up anim-delayed block-right"></div>

    <section id="intro-section">
        <div id="container-partners">
            <h2 id="page-title">Nos partenaires</h2>

            <p id="partners-intro">
            Les partenaires de notre association, publics comme privés, sont les organismes qui nous permettent de réaliser nos
            projets et de travailler sur nos passions.
            <br/><br/>
            Certains nous fournissent du matériel, des outils ou même des financements, et sans eux, l'association n'existerait pas !
            </p>

            <div id="partners-carousel">
                <div id="carousel-contents">
                    <div class="carousel-partner bg-logo-dvic"></div>
                    <div class="carousel-partner bg-logo-monday"></div>
                    <div class="carousel-partner bg-logo-synum"></div>
                    <div class="carousel-partner bg-logo-gotronic"></div>
                    <?php /* <div class="carousel-partner bg-logo-faulhaber"></div> */ ?>

                    <!-- for the carousel animation to look infinite, we add the items twice -->
                    <div class="carousel-partner bg-logo-dvic"></div>
                    <div class="carousel-partner bg-logo-monday"></div>
                    <div class="carousel-partner bg-logo-synum"></div>
                    <div class="carousel-partner bg-logo-gotronic"></div>
                    <?php /* <div class="carousel-partner bg-logo-faulhaber"></div> */ ?>
                </div>
            </div>

            <a id="discover-link" href="#partners-section">Découvrir nos partenaires
                <span id="discover-arrow">
                    <svg viewBox="0 0 125 80" xmlns="http://www.w3.org/2000/svg">
                        <path d="M 10 25 h 60 a 5 5 0 0 0 5 -5 v -15 a 5 5 0 0 1 7 -2 L 120 38 a 4 4 0 0 1 0 4 L 82 77 a 5 5 0 0 1 -7 -2 V 60 a 5 5 0 0 0 -5 -5 h -60 a 5 5 0 0 1 -5 -5 V 30 a 5 5 0 0 1 5 -5" />
                    </svg>
                </span>
            </a>
        </div>
    </section>

    <section id="partners-section">
        <div class="partner-pres">
            <div class="partner-desc">
                <h3 class="partner-title">De Vinci Innovation Center</h3>

                <p class="partner-text">
                    Le <i>De Vinci Innovation Center</i> est le centre d'innovation transdisciplinaire du Pôle Léonard de Vinci.
                    Il collabore sur des projets industriels et noue des partenariats de recherche avec diverses entreprises et startups
                    partageant leurs valeurs.
                    <br/>Les chercheurs du DVIC contribuent activement à la recherche internationale de haut niveau
                    dans de multiples domaines, notamment l'intelligence artificielle, les interactions homme-machine et l'écologie.
                    
                    <br/><br/>C'est le mécène principal de DaVinciBot.
                </p>

                <a class="partner-link" href="https://dvic.devinci.fr/" target="_blank">SITE INTERNET</a>
            </div>

            <div class="partner-logo-container bg-logo-dvic"></div>
        </div>

        <div class="partner-pres reverse">
            <div class="partner-desc">
                <h3 class="partner-title">Monday</h3>

                <p class="partner-text">
                    Monday est le Work OS qui a été adopté par l'association DaVinciBot.
                    
                    <br/><br/>Il permet notamment aux chefs de projet de gérer leur équipe en organisant leur environnement de travail
                    comme bon leur semble (gestion des tâches, des documents, des budgets, etc...).
                </p>

                <a class="partner-link" href="https://monday.com/" target="_blank">SITE INTERNET</a>
            </div>

            <div class="partner-logo-container bg-logo-monday"></div>
        </div>

        <div class="partner-pres">
            <div class="partner-desc">
                <h3 class="partner-title">Seine et Yvelines Numérique</h3>

                <p class="partner-text">
                    Le département des Yvelines, à travers l'organisme Seine et Yvelines Numérique,
                    subventionne notre association en échange d'un accompagnement de certains collèges sur le défi <i>Challenge Ton Code</i>.
                    
                    <br/><br/>DaVinciBot est fier de diffuser son savoir et ses compétences à la nouvelle génération d'étudiants.
                </p>

                <a class="partner-link" href="https://www.sy-numerique.fr/" target="_blank">SITE INTERNET</a>
            </div>

            <div class="partner-logo-container bg-logo-synum"></div>
        </div>

        <div class="partner-pres reverse">
            <div class="partner-desc">
                <h3 class="partner-title">Go Tronic</h3>

                <p class="partner-text">
                    Magasin d'électronique assurant la distribution de composants électroniques en France
                    et à l'étranger depuis 1990, Go Tronic nous fait l'honneur d'être l'un des fournisseurs officiels de l'association.
                    Le matériel utilisé pour les projets et formations nous est notamment fourni par eux.
                    <br/><br/>Nous les remercions de promouvoir la robotique dans le milieu étudiant à travers notre association !
                </p>

                <a class="partner-link" href="https://gotronic.fr/" target="_blank">SITE INTERNET</a>
            </div>

            <div class="partner-logo-container bg-logo-gotronic"></div>
        </div>

        <?php

        // <div class="partner-pres">
        // <div class="partner-desc">
        //     <h3 class="partner-title">Faulhaber</h3>

        //     <p class="partner-text">
        //         Nous avons aussi la chance d'être fourni en partie par l'un des principaux fournisseurs de haute technologie
        //         dans le domaine des systèmes d'entraînement miniatures et microsystèmes.
                
        //         <br/><br/>La motorisation des projets de DaVinciBot monte d'un cran !
        //     </p>

        //     <a class="partner-link" href="https://www.faulhaber.com/fr/" target="_blank">SITE INTERNET</a>
        // </div>

        // <div class="partner-logo-container bg-logo-faulhaber"></div>
        // </div>

        ?>
    </section>

<?php include("./include/footer.php"); ?>
</body>
</html>