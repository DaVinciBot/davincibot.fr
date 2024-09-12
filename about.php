<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DaVinciBot - Pôle Léonard de Vinci</title>

    <link rel="stylesheet" href="/style/all.css">
    <link rel="stylesheet" href="/style/about.css">

<?php include("./include/meta_tags.php") ?>
</head>
<body>
<?php $active_page = "about"; include("./include/header.php"); ?>

    <section>
        <div class="side-colored-block anim-down block-left"></div>
        <div class="side-colored-block anim-up anim-delayed block-right"></div>

        <div id="container-about">
            <div id="about">
                <h2 id="page-title">A propos</h2>

                <p id="about-text" class="text-justify">
                    L'assocation DaVinciBot regroupe les passionnés de robotique du Pôle Léonard de Vinci.
                    <br/><br/>
                    Elle est née suite à l'initiative d'un groupe d'étudiants voulant participer à la Coupe de France
                    de Robotique (CDR), évènement phare dans le monde la robotique française regroupant chaque année des
                    dizaines d'écoles supérieures et universités.
                    <br/><br/>
                    Depuis, notre association réalise plusieurs projets. Ces derniers sont proposés à l'initiative des élèves
                    et rentrent dans le cadre des projets annuels de l'ESILV (PIX2, PING et PI²).
                    <br/><br/>
                    Tous les ans, les membres élisent un ou plusieurs nouveaux co-présidents qui constituent alors un bureau
                    pour gérer et représenter l'association. Vous découvrez ainsi le bureau actuel pour l'année 2023-2024.
                </p>
            </div>

            <div id="council-pictures" style="overflow:hidden;">
                <div class="council-member"><div class="member-picture bg-placeholder"></div><h3 class="member-name">Louis-Amaury</h3><div>Co-président</div></div>
                <div class="council-member"><div class="member-picture bg-placeholder "></div><h3 class="member-name">Noah.</h3><div>Co-président</div></div>
                <div class="council-member"><div class="member-picture m-lucas" ></div><h3 class="member-name">Lucas</h3><div>Vice-président</div></div>
                <div class="council-member"><div class="member-picture bg-placeholder"></div><h3 class="member-name">Elsa</h3><div>Secrétaire<br>général</div></div>
                <div class="council-member"><div class="member-picture bg-placeholder"></div><h3 class="member-name">Urbain</h3><div>Trésorier</div></div>
                <div class="council-member"><div class="member-picture bg-placeholder"></div><h3 class="member-name">Florian</h3><div>Responsable<br>projets</div></div>
                <div class="council-member"><div class="member-picture bg-placeholder "></div><h3 class="member-name">Thomas</h3><div>Responsable<br>formations</div></div>
                <div class="council-member"><div class="member-picture bg-placeholder"></div><h3 class="member-name">Recherche active</h3><div>Responsable<br>communication</div></div>
                <div class="council-member"><div class="member-picture bg-placeholder"></div><h3 class="member-name">Gaël</h3><div>Responsable<br>évènements</div></div>
            </div>
        </div>
    </section>

<?php include("./include/footer.php"); ?>
</body>
</html>