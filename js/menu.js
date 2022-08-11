var menus = [
    { nom: "Personnage",
      liste: [ { nom: "Création", page: "perso.html" },
               { nom: "Chargement", page: "#" },
               { nom: "Prêt à l'emploi", page: "#" }
             ]
    } ,
    { nom: "Caisse des Donjons",
      liste: [ { nom: "Armes", page: "perso.html" },
               { nom: "Armures", page: "#" },
               { nom: "Armures", page: "#" },
               { nom: "Divers", page: "#"}
             ]
    } ,
    { nom: "Scénario",
      liste: [ { nom: "Loubet", page: "loubet.html" } ]
    }
];  

function setMenu(choix) {
    var nav = $("#menu");
    var html="<img  id='logo' src='img/logo.png' width='50px'></img> \
    <button class='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#collapsibleNavbar'> \
      <span class='navbar-toggler-icon'></span> \
    </button> \
    <div class='collapse navbar-collapse' id='collapsibleNavbar' style='color: black;'> \
      <ul class='navbar-nav'>";

    menus.forEach(function(menu) {
        html += "<li class='nav-item dropdown'> \
                   <a class='nav-link dropdown-toggle"+(choix==menu.nom ? " active" : "")+"' href='#' role='button' data-bs-toggle='dropdown'>"+menu.nom+"</a> \
                    <ul class='dropdown-menu'>";
        menu.liste.forEach(function(sousMenu) {
            html += "<li><a class='dropdown-item' href='"+sousMenu.page+"'>"+sousMenu.nom+"</a></li>";
        });
        html += "  </ul> \
                 </li>";
    });
    html += "  </ul> \
             </div>";

    nav.html(html);

    $("#logo").on('click', function() {
        window.location = "./index.html";    
   });
}
