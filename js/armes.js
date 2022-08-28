function listeArmes() {
  strButton=
  "<div class='dropdown'> \
    <button type='button' class='btn btn-primary dropdown-toggle' data-bs-toggle='dropdown'> Action </button> \
    <ul class='dropdown-menu'> \
    <li><button type='button' class='btn' onclick='acheter(\"objet\")' data-bs-toggle='modal' data-bs-target='#action-modal'>Acheter</button> \
    <li><button type='button' class='btn' onclick='marchander(\"objet\")' data-bs-toggle='modal' data-bs-target='#action-modal'>Marchander</button> \
    <li><button type='button' class='btn' onclick='voler(\"objet\")' data-bs-toggle='modal' data-bs-target='#action-modal'>Voler</button> \
  </ul> \
  </div>";
  //data-bs-toggle='modal' data-bs-target='#action-modal'
  strButton2 = "<button type='button' class='btn btn-success'><img src='img/eye-solid.svg' style='width: 16px;'></img></span></button>";
  //strButton2 = "<img src='img/eye-solid.svg'></img>";
  armes.forEach(function(arme) {
    strLigne="<tr>";
    strLigne +="<td> <i class='"+arme.icon+"'> "+arme.nom+"</i></td>";
    strLigne +="<td>"+arme.prix+"</td>";
    strLigne +="<td>"+arme.degat+"</td>";
    strLigne +="<td>"+arme.rupture+"</td>";
    strLigne +="<td>"+strButton.replaceAll("objet",arme.nom)+"</td>";
    strLigne += "</tr>";
    $("#t-armes").append(strLigne);    
  });

}

function acheter(nomArme) {
  $(".modal-title").html("Acheter");
  $("#objet").html(nomArme);
  $("#txt-marchand").html("C'est une lame de bonne qualité. C'est un prix d'ami que je vous fait!");

  var arme = armes.find(arme => arme.nom===nomArme);

  $("#caract").empty();
  $("#caract").append("<li class='list-group-item'><span style='font-weight: bold;'>Type:</span> "+arme.type+"</li>");
  $("#caract").append("<li class='list-group-item'><span style='font-weight: bold;'>Prix:</span> "+arme.prix+" pièces d'or</li>");
  $("#caract").append("<li class='list-group-item'><span style='font-weight: bold;'>Rupture:</span> "+arme.rupture+"</li>");

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
  $(".modal-footer").append("<button type='button' class='btn btn-primary' data-bs-dismiss='modal' onclick='resultAcheter(\""+arme.nom+"\")' data-bs-toggle='modal' data-bs-target='#result-modal'>Acheter</button>");
  $(".modal-footer").append("<button type='button' class='btn btn-danger' data-bs-dismiss='modal'>Fermer</button>");
}

function resultAcheter(nomArme) {
  var arme = armes.find(arme => arme.nom===nomArme);
  var fortune=pj.fortune;

  if (fortune>=arme.prix) {
    $(".modal-title").html("Achat effectué");
    $("#txt-result").html("<span style='font-weight: bold;'>"+nomArme+"</span> vient d'être acheté pour "+arme.prix+" pièces d'or.");
    pj.fortune -= arme.prix;
    pj.armes.push(nomArme);
    $("#fortune").val(pj.fortune);
    localStorage.setItem("pj",JSON.stringify(pj));
  } else {
    $(".modal-title").html("Achat non effectué");
    $("#txt-result").html("<span style='font-weight: bold;'>"+nomArme+"</span> est beaucoup trop cher pour vous!");
  }

  $(".modal-footer").empty();
  $(".modal-footer").append("<button type='button' class='btn btn-danger' data-bs-dismiss='modal'>Fermer</button>");
}

function marchander(nomArme) {
  $(".modal-title").html("Marchander");
  $("#objet").html(nomArme);
  $("#txt-marchand").html("Attention je n'aime pas les arnaques. Cela a tendance à faire monter les prix!");

  var arme = armes.find(arme => arme.nom===nomArme);

  $("#caract").empty();
  $("#caract").append("<li class='list-group-item'><span style='font-weight: bold;'>Type:</span> "+arme.type+"</li>");
  $("#caract").append("<li class='list-group-item'><span style='font-weight: bold;'>Prix:</span> "+arme.prix+" pièces d'or</li>");
  $("#caract").append("<li class='list-group-item'><span style='font-weight: bold;'>Rupture:</span> "+arme.rupture+"</li>");

  $("#bonus").empty();
  $("#malus").empty();
  setBonusMalus(arme,"attaque");
  setBonusMalus(arme,"parade");
  setBonusMalus(arme,"adresse");
  setBonusMalus(arme,"courage");
  setBonusMalus(arme,"charisme");
  setBonusMalus(arme,"force");
  setBonusMalus(arme,"intelligence");

  var radin=pj.competences.find(competence => competence==="radin");
  var charisme=+pj.charisme;
  if (radin !="") {
    $("#txt-comptences").html("Vous posséder la compétence \"Radin\". Vous aves un bonus de +4 au marchandage!");
    charisme += 4;
  }
  $("#txt-explication").html("Vous pouvez marchander en effectuant un jet de charisme.");

  $(".modal-footer").empty();
  $(".modal-footer").append("<p>Vous pouvez marchander en effectuant un jet de charisme <= "+charisme+".<p>");
  $(".modal-footer").append("<button type='button' class='btn btn-primary' data-bs-dismiss='modal' onclick='tirageD20("+charisme+")'>Marchander</button>");
  $(".modal-footer").append("<button type='button' class='btn btn-danger' data-bs-dismiss='modal'>Fermer</button>");
}

function voler(nomArme) {
  $(".modal-title").html("Voler");
  $("#objet").html(nomArme);
  $("#txt-marchand").html("Si l'envie vous prend de voler, j'ai un garde à l'entrée du magasin!");

  var arme = armes.find(arme => arme.nom===nomArme);

  $("#caract").empty();
  $("#caract").append("<li class='list-group-item'><span style='font-weight: bold;'>Type:</span> "+arme.type+"</li>");
  $("#caract").append("<li class='list-group-item'><span style='font-weight: bold;'>Prix:</span> "+arme.prix+" pièces d'or</li>");
  $("#caract").append("<li class='list-group-item'><span style='font-weight: bold;'>Rupture:</span> "+arme.rupture+"</li>");

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
  $(".modal-footer").append("<button type='button' class='btn btn-danger' data-bs-dismiss='modal' onclick='resultVoler()'>Voler</button>");
}

function setBonusMalus(arme,caract) {
  if (arme[caract]>0) {
    $("#bonus").append("<li class='list-group-item'><span style='font-weight: bold;'>"+caract.capitalize()+":</span> "+arme[caract]+"</li>");
  }
  if (arme[caract]<0) {
    $("#malus").append("<li class='list-group-item'><span style='font-weight: bold;'>"+caract.capitalize()+":</span> "+arme[caract]+"</li>");
  }
}

/*function acheter(nomArme) {
  var arme = armes.find(arme => arme.nom===nomArme);

  var fortune=$("#fortune").val();
  fortune -= arme.prix;
  $("#fortune").val(fortune);
  if(!pj.hasOwnProperty(armes)) {
    pj.armes = [];
  }
  pj.armes.push(nomArme);
  console.info(pj);
}*/

function tirageD20(seuil) {
  result=Math.ceil(Math.random()*20);

  if(result<=seuil) {
    alert(result+" sur "+seuil+" C'est tout bon!");
  } else {
    alert(result+" sur "+seuil+" Ca marche pas...");
  }

}
