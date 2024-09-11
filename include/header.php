<?php

if(!isset($active_page)) {
    $active_page = "index";
}

function active_class($page, $prefix = "") {
    global $active_page;

    if($page == $active_page) {
        echo $prefix."active-page";
    }
}

function select_index_link($normal_link, $index_link) {
    global $active_page;

    if($active_page == "index") {
        echo $index_link;
    } else {
        // echo $normal_link;
        echo "/$index_link";
    }
}

$ext = ".php";
$prod = true; // TODO: SET TO TRUE IN PRODUCTION
if($prod || getenv("IS_PMNG") == "true") {
    $ext = "";
}

?>
    <script>
        // we inline this javascript to set the theme attribute as early as possible to avoid a sudden color change induced by another
        // network round trip of downloading this script and blocking the rendering of the page (as this script would not be async)
        const THEME_STORAGE = "dvb-theme";
        
        function setTheme(theme) {
            document.documentElement.setAttribute("data-theme", theme);
            if(theme == getOsPreference()) localStorage.removeItem(THEME_STORAGE);
            else localStorage.setItem(THEME_STORAGE, theme);
        }

        function toggleTheme() {
            if(document.documentElement.getAttribute("data-theme") == "dark") setTheme("light");
            else setTheme("dark");
        }

        function getOsPreference() {
            return (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "dark" : "light";
        }

        let theme = getOsPreference();

        // if a theme is saved, it overrides the OS preference
        let savedTheme = localStorage.getItem(THEME_STORAGE);
        if(savedTheme != null)
            theme = savedTheme;

        setTheme(theme);
    </script>

    <header id="site-header">
        <a href="<?php select_index_link("/", "#intro") ?>">
            <img class="main-logo dark-mode" src="/assets/images/white_logo.webp" alt="DaVinciBot">
            <img class="main-logo light-mode" src="/assets/images/colored_logo.webp" alt="DaVinciBot">
        </a>
        <span id="header-links">
            <a href="<?php select_index_link("/", "#intro"); ?>" class="<?php active_class("index"); ?>">Accueil</a>
            <span class="link-separator"></span>
            <a href="/about<?php echo $ext; ?>" class="<?php active_class("about"); ?>">L'association</a>
            <span class="link-separator"></span>
            <a href="<?php select_index_link("/cdr$ext", "#cdr"); ?>" class="individual-project-link<?php active_class("cdr", " "); ?>">CDR</a>
            <a href="<?php select_index_link("/jasper$ext", "#jasper"); ?>" class="individual-project-link<?php active_class("jasper", " "); ?>">JASPER</a>
            <a href="<?php select_index_link("/travelers$ext", "#travelers"); ?>" class="individual-project-link<?php active_class("travelers", " "); ?>">TRAVELERS</a>
            <a href="<?php select_index_link("/#cdr", "#cdr"); ?>" id="all-projects-link">Nos projets</a>
            <span class="link-separator"></span>
            <a href="/partners<?php echo $ext; ?>" class="<?php active_class("partners"); ?>">Partenaires</a>
            <a href="/schools<?php echo $ext; ?>" class="<?php active_class("schools"); ?>">Nos écoles</a>
        </span>

        <div id="header-theme-toggle" onclick="toggleTheme()">
            <img class="dark-mode" src="/assets/images/sun.svg" alt="Mode clair" title="Basculer au mode clair">
            <img class="light-mode" src="/assets/images/moon.svg" alt="Mode sombre" title="Basculer au mode sombre">
        </div>
    </header>

    <div id="bottom-theme-toggle" onclick="toggleTheme()">
        <img class="dark-mode" src="/assets/images/sun.svg" alt="Mode clair" title="Basculer au mode clair">
        <img class="light-mode" src="/assets/images/moon.svg" alt="Mode sombre" title="Basculer au mode sombre">
    </div>
