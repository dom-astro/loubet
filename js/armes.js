function listeArmes() {
  strButton=
  "<div class='dropdown'> \
    <button type='button' class='btn btn-success btn-sm' onclick='voir(\"objet\")' data-bs-toggle='modal' data-bs-target='#action-modal'> \
      Voir \
    </button> \
  </div>";
  strButton2 = "<button type='button' class='btn btn-success'><img src='img/eye-solid.svg' style='width: 16px;'></img></span></button>";
  //strButton2 = "<img src='img/eye-solid.svg'></img>";
  armes.forEach(function(arme) {
    strLigne="<tr>";
    strLigne +="<td>"+arme.nom+"</td>";
    strLigne +="<td>"+arme.prix+"</td>";
    strLigne +="<td>"+arme.degat+"</td>";
    strLigne +="<td>"+arme.rupture+"</td>";
    strLigne +="<td>"+strButton.replace("objet",arme.nom)+"</td>";
    strLigne += "</tr>";
    $("#t-armes").append(strLigne);    
  });

}

function voir(nomArme) {
  $(".modal-title").html(nomArme);

  var arme = armes.find(arme => arme.nom===nomArme);

  $("#bonus").empty();
  $("#malus").empty();
  setBonusMalus(arme,"attaque");
  setBonusMalus(arme,"parade");
  setBonusMalus(arme,"adresse");
  setBonusMalus(arme,"courage");
  setBonusMalus(arme,"charisme");
  setBonusMalus(arme,"force");
  setBonusMalus(arme,"intelligence");

  $(".modal-footer").empty();
  $(".modal-footer").append("<button type='button' class='btn btn-success' data-bs-dismiss='modal' onclick='acheter(\""+nomArme+"\")'>Acheter</button>");
  $(".modal-footer").append("<button type='button' class='btn btn-warning' data-bs-dismiss='modal' onclick='marchander(\""+nomArme+"\")'>Marchander</button>");
  $(".modal-footer").append("<button type='button' class='btn btn-danger' data-bs-dismiss='modal' onclick='voler(\""+nomArme+"\")'>Voler</button>");

}

function setBonusMalus(arme,caract) {
  if (arme[caract]>0) {
    $("#bonus").append("<li class='list-group-item'>"+caract.capitalize()+": "+arme[caract]+"</li>");
  }
  if (arme[caract]<0) {
    $("#malus").append("<li class='list-group-item'>"+caract.capitalize()+": "+arme[caract]+"</li>");
  }
}

function acheter(nomArme) {
  var arme = armes.find(arme => arme.nom===nomArme);

  var fortune=$("#fortune").val();
  fortune -= arme.prix;
  $("#fortune").val(fortune);
  if(!pj.hasOwnProperty(armes)) {
    pj.armes = [];
  }
  pj.armes.push(nomArme);
  console.info(pj);
}

function tirageD20(caract) {

}
