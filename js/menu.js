var menus = [
  {
    nom: "Personnage",
    liste: [{ nom: "Création", icon: "ra ra-player ra-lg", page: "creation.html" },
    { nom: "Chargement", icon: "ra ra-player-teleport ra-lg", page: "perso.html" },
    { nom: "Prêt à l'emploi", icon: "ra ra-aura ra-lg", page: "#" }
    ]
  },
  {
    nom: "Donjon facile",
    liste: [{ nom: "Armes", icon: "ra ra-sword ra-lg", page: "armes.html" },
    { nom: "Armures", icon: "ra ra-helmet ra-lg", page: "armures.html" },
    { nom: "Divers", icon: "ra ra-meat ra-lg", page: "divers.html" }
    ]
  },
  {
    nom: "Scénario",
    liste: [{ nom: "La tour de Loubet", icon: "ra ra-tower ra-lg", page: "loubet.html" },
    { nom: "La foire de Ravsgalat", icon: "ra ra-wooden-sign ra-lg", page: "ravsgalat.html" }
    ]
  }
];

function setMenu(choix) {
  var nav = $("#menu");
  var html = "<img  id='logo' src='img/logo.png' width='50px'></img> \
    <button class='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#collapsibleNavbar'> \
      <span class='navbar-toggler-icon'></span> \
    </button> \
    <div class='collapse navbar-collapse' id='collapsibleNavbar' style='color: black;'> \
      <ul class='navbar-nav'>";

  menus.forEach(function (menu) {
    html += "<li class='nav-item dropdown'> \
                   <a class='nav-link dropdown-toggle"+ (choix == menu.nom ? " active" : "") + " ' href='#' role='button' data-bs-toggle='dropdown'>" + menu.nom + "</a> \
                    <ul class='dropdown-menu'>";
    menu.liste.forEach(function (sousMenu) {
      html += "<li><a class='dropdown-item " + sousMenu.icon + "' href='" + sousMenu.page + "'> " + sousMenu.nom + "</a></li>";
    });
    html += "  </ul> \
                 </li>";
  });
  html += "  </ul> \
             </div>";

  nav.html(html);

  $("#logo").on('click', function () {
    window.location = "./index.html";
  });
}
