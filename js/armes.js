function listeArmes() {
  strButton=
  "<div class='dropdown'> \
    <button type='button' class='btn btn-success dropdown-toggle' data-bs-toggle='dropdown'> \
      Action \
    </button> \
    <ul class='dropdown-menu'> \
      <li><h5 class='dropdown-header' style='color: silver; border-bottom: 1px solid silver;'>En toute honnêteté</h5></li>\
      <li><a class='dropdown-item' href='#' onclick='achat(\"objet\")' data-bs-toggle='modal' data-bs-target='#action-modal'>Acheter</a></li> \
      <li><a class='dropdown-item' href='#'>Marchander</a></li> \
      <li><a class='dropdown-item' href='#'>Voler</a></li> \
    </ul> \
  </div>";
  strButton2 = "<button type='button' class='btn btn-success'><img src='img/eye-solid.svg' style='width: 16px;'></img></span></button>";
  //strButton2 = "<img src='img/eye-solid.svg'></img>";
  armes.forEach(function(arme) {
    strLigne="<tr>";
    strLigne +="<td>"+arme.nom+"</td>";
    strLigne +="<td>"+arme.prix+"</td>";
    strLigne +="<td>"+arme.degat+"</td>";
    strLigne +="<td>"+arme.rupture+"</td>";
    strLigne +="<td>"+strButton2+"</td>";
    strLigne += "</tr>";
    $("#t-armes").append(strLigne);    
  });

}

function achat(objet) {
  $(".modal-title").html("Achat "+objet);

  $(".modal-footer").empty();
  $(".modal-footer").append("<button type='button' class='btn btn-success' data-bs-dismiss='modal' onclick='Acheter(\""+objet+"\")'>Acheter</button>");
  $(".modal-footer").append("<button type='button' class='btn btn-warning' data-bs-dismiss='modal'>Marchander</button>");
  $(".modal-footer").append("<button type='button' class='btn btn-danger' data-bs-dismiss='modal'>Voler</button>");

}
//<button type='button' class='btn btn-info btn-origine' onclick='descOrigine(\""+origine.nom+"\")' data-bs-toggle='modal' data-bs-target='#choix-modal'>Voir</button>
