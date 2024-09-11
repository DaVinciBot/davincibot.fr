<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DaVinciBot - Pôle Léonard de Vinci</title>

    <link rel="stylesheet" href="/style/all.css">
    <link rel="stylesheet" href="/style/index.css">

<?php include("./include/meta_tags.php") ?>
</head>
<body>
<?php $active_page = "index"; include("./include/header.php"); ?>

    <section id="intro">
        <div class="side-colored-block anim-down block-left"></div>

        <div id="intro-container">
            <h1 id="page-title">DaVinciBot, association<br>étudiante de robotique</h1>

            <p id="intro-text">
                <span id="intro-border"></span>
                DaVinciBot rassemble des étudiants de l'ESILV, de l'EMLV et de l'IIM
                du Pôle Universitaire Léonard de Vinci autour d'activités et projets innovants.
            </p>

            <div id="intro-links">
                <a href="https://www.instagram.com/davincibot_pulv/" target="_blank">INSTAGRAM</a>
                <a href="https://www.facebook.com/DaVinciBotPULV/" target="_blank">FACEBOOK</a>
                <a href="https://www.linkedin.com/company/davincibot/" target="_blank">LINKEDIN</a>
                <a href="https://www.github.com/DaVinciBot/" target="_blank">GITHUB</a>
            </div>

            <a id="projects-link" href="#cdr">Découvrir nos projets
                <span id="discover-projects-arrow">
                    <svg viewBox="0 0 125 80" xmlns="http://www.w3.org/2000/svg">
                        <path d="M 10 25 h 60 a 5 5 0 0 0 5 -5 v -15 a 5 5 0 0 1 7 -2 L 120 38 a 4 4 0 0 1 0 4 L 82 77 a 5 5 0 0 1 -7 -2 V 60 a 5 5 0 0 0 -5 -5 h -60 a 5 5 0 0 1 -5 -5 V 30 a 5 5 0 0 1 5 -5" />
                    </svg>
                </span>
            </a>

        </div>

        <div id="intro-image-container">
            <img id="intro-image" class="img-filtered" src="/assets/images/asso.webp" alt="Membres de DaVinciBot">
        </div>
        
        <div class="horizontal-colored-blocks intro-blocks right-blocks variation-1"></div>
    </section>

    <div id="projects-general-description">
        <h1 id="projects-title">Nos projets :</h1>
        <p>
            Les projets à DaVinciBot sont la pierre angulaire de l'association. Grâce à eux, nos membres aprennent et expérimentent
            sur des technologies qui ne sont pas vues en cours. Ces projets permettent aussi de faire rayonner l'association et le pôle
            à l'extérieur de ses murs.<br/><br/>

            Cette année, nous avons trois projets dans l'association :
        </p>
    </div>

    <a class="project-anchor" id="cdr"></a>
    <!-- we use a separate element as an anchor to move it up on small devices to account for the header height -->
    <section class="project-section">
        <div class="project-image-container background-cdr img-filtered">
            <div class="horizontal-colored-blocks project-blocks-top left-blocks variation-3"></div>
            <div class="horizontal-colored-blocks project-blocks-bottom left-blocks variation-2"></div>
        </div>
        <div class="project-intro">
            <span class="project-number">01</span>
            <h2 class="project-intro-title">Coupe de Robotique</h2>
            <p class="project-intro-description">
                La Coupe de France de robotique (abrégée en <i>CDR</i>) est le projet fondateur de l'association, en 2013.
                <span class="p-break"></span>
                Chaque année, plus d'une centaine d'écoles et autres équipes indépendantes s'affrontent lors d'une
                compétition autour d'un thème unique annuel, amenant de nouveaux challenges. L'année dernière, avec un thème sur
                l'archéologie, notre équipe est arrivé à la 36ème place sur plus de 150 participants.
                <span class="p-break"></span>
                Cette année, le thème est "la cerise sur le gâteau" : Un thème avec un challenge particulier, il va falloir déplacer de
                grands objects pour construire un faux gâteau ainsi que des petits objets (les cerises...) le tout de façon très précise.
            </p>

            <div class="project-more-info">
                <a href="/cdr<?php echo $ext ?>">
                    <svg viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
                        <path d="M 30 30 v -22 a 5 5 0 0 1 5 -5 a 5 5 0 0 1 5 5 v 54 a 5 5 0 0 1 -5 5 a 5 5 0 0 1 -5 -5" style="transform: rotate(90deg); transform-origin: 50% 50%;" />
                        <path d="M 30 30 v -22 a 5 5 0 0 1 5 -5 a 5 5 0 0 1 5 5 v 54 a 5 5 0 0 1 -5 5 a 5 5 0 0 1 -5 -5" />
                    </svg>
                    d'infos
                </a>
            </div>
        </div>
    </section>

    <a class="project-anchor" id="jasper"></a>
    <section class="project-section reverse">
        <div class="project-image-container background-jasper img-filtered">
            <div class="horizontal-colored-blocks project-blocks-top right-blocks variation-4"></div>
            <div class="horizontal-colored-blocks project-blocks-bottom right-blocks variation-3"></div>
        </div>
        <div class="project-intro">
            <span class="project-number">02</span>
            <h2 class="project-intro-title">JASPER</h2>
            <p class="project-intro-description">
                JASPER est le projet de robotique humanoïde actuel de DaVinciBot.
                <span class="p-break"></span>
                Nous nous sommes inspiré de nos années de traveaux sur InMoov, le robot humanoïde totalement imprimé en 3D,
                pour refonder le projet. Notre objectif est de réaliser un robot robuste et fiable en nous détachant du
                plastique pour aller vers des matériaux plus solides comme l'aluminium.
                <span class="p-break"></span>
                Les travaux de cette année vont porter sur les bras du robot, le tronc ayant été fabriqué l'année dernière.
                Nous espérons dans un futur proche que JASPER devienne une plateforme d'expérimentation pour les technologies liées
                à l'humanoïde, apportant de nouvelles oportunités d'innovation pour l'association, le DVIC et le pôle universitaire.
            </p>

            <div class="project-more-info">
                <a href="/jasper<?php echo $ext ?>">
                    <svg viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
                        <path d="M 30 30 v -22 a 5 5 0 0 1 5 -5 a 5 5 0 0 1 5 5 v 54 a 5 5 0 0 1 -5 5 a 5 5 0 0 1 -5 -5" style="transform: rotate(90deg); transform-origin: 50% 50%;" />
                        <path d="M 30 30 v -22 a 5 5 0 0 1 5 -5 a 5 5 0 0 1 5 5 v 54 a 5 5 0 0 1 -5 5 a 5 5 0 0 1 -5 -5" />
                    </svg>
                    d'infos
                </a>
            </div>
        </div>
    </section>

    <a class="project-anchor" id="travelers"></a>
    <section class="project-section">
        <div class="project-image-container background-travelers img-filtered">
            <div class="horizontal-colored-blocks project-blocks-top left-blocks variation-2"></div>
            <div class="horizontal-colored-blocks project-blocks-bottom left-blocks variation-4"></div>
        </div>
        <div class="project-intro">
            <span class="project-number">03</span>
            <h2 class="project-intro-title">TRAVELERS</h2>
            <p class="project-intro-description">
                Travelers est un projet de DVB qui est déjà dans sa troisième année.
                L'objectif est de réaliser un rover amphibie capable de rouler sur Titan, la plus grande lune de Saturne,
                et de nager sur ses océans de méthane. Après deux ans à travailler sur une structure "classique", l'équipe à décidé
                d'innover et de changer radicalement la forme du robot vers quelque chose de plus modulaire.
                <span class="p-break"></span>
                Le challenge principal est donc de réaliser une structure mécanique, électronique et informatique capable de s'adapter à
                plusieurs types de terrains.
                <span class="p-break"></span>
                La structure même du projet en modules indépendants va permettre pendant de nombreuses années de développer nombre de
                technologies liées à l'exploration spatiale sur une base stable. 
            </p>

            <div class="project-more-info">
                <a href="/travelers<?php echo $ext ?>">
                    <svg viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
                        <path d="M 30 30 v -22 a 5 5 0 0 1 5 -5 a 5 5 0 0 1 5 5 v 54 a 5 5 0 0 1 -5 5 a 5 5 0 0 1 -5 -5" style="transform: rotate(90deg); transform-origin: 50% 50%;" />
                        <path d="M 30 30 v -22 a 5 5 0 0 1 5 -5 a 5 5 0 0 1 5 5 v 54 a 5 5 0 0 1 -5 5 a 5 5 0 0 1 -5 -5" />
                    </svg>
                    d'infos
                </a>
            </div>
        </div>
    </section>

<?php include("./include/footer.php"); ?>
</body>
</html>