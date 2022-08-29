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
  type="";
  armes.forEach(function(arme) {
    if (type != arme.type) {
      type=arme.type;
      strLigne=" \
      <tr> \
        <td colspan='5' style='background-color: burlywood;' onclick='$(\".c-"+arme.type.id().id()+"\").toggle()'><i class='"+arme.icon+"'><span style='font-weight: bold;'> "+arme.type+"</span></i></td> \
      </tr>";
      $("#t-armes").append(strLigne);    
    }
    strLigne="<tr class='c-"+arme.type.id().id()+"' style='display: none;'>";
    strLigne +="<td>"+arme.nom+"</i></td>";
    strLigne +="<td>"+arme.prix+"</td>";
    strLigne +="<td>"+arme.degat+"</td>";
    strLigne +="<td>"+arme.rupture+"</td>";
    strLigne +="<td>"+strButton.replaceAll("objet",arme.nom)+"</td>";
    strLigne += "</tr>";
    $("#t-armes").append(strLigne);    
  });
}

function acheter(nomArme) {
  var arme = armes.find(arme => arme.nom===nomArme);

  $(".modal-title").html("Acheter");
  $("#objet").html("<i class='"+arme.icon+"'> "+nomArme+"<hr>");
  $("#txt-marchand").html("C'est une lame de bonne qualité. C'est un prix d'ami que je vous fait!");

  $("#caract").empty();
  $("#caract").append("<li class='list-group-item'><span style='font-weight: bold;'>Dégâts:</span> "+arme.degat+"</li>");
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
  $(".modal-footer").append("<button type='button' class='btn btn-primary' data-bs-dismiss='modal' onclick='resultAcheter(\""+arme.nom+"\",0)' data-bs-toggle='modal' data-bs-target='#result-modal'>Acheter</button>");
  $(".modal-footer").append("<button type='button' class='btn btn-danger' data-bs-dismiss='modal'>Fermer</button>");
}

function resultAcheter(nomArme, prix) {
  var arme = armes.find(arme => arme.nom===nomArme);
  var fortune=pj.fortune;

  prix = (prix==0 ? arme.prix : prix);
  if (fortune>=prix) {
    $(".modal-title").html("Achat effectué");
    $("#txt-result").html("<span style='font-weight: bold;'>"+nomArme+"</span> vient d'être acheté pour "+arme.prix+" pièces d'or.");
    pj.fortune -= prix;
    pj.armes.push(nomArme);
    $("#fortune").val(pj.fortune);
    localStorage.setItem("pj",JSON.stringify(pj));
    $("#eq-armes").append("<li><span style='font-weight: bold;'>"+arme.nom+"</span> ("+arme.degat+")</li>");
  } else {
    $(".modal-title").html("Achat non effectué");
    $("#txt-result").html("<span style='font-weight: bold;'>"+nomArme+"</span> est beaucoup trop cher pour vous!");
  }

  $(".modal-footer").empty();
  $(".modal-footer").append("<button type='button' class='btn btn-danger' data-bs-dismiss='modal'>Fermer</button>");
}

function marchander(nomArme) {
  var arme = armes.find(arme => arme.nom===nomArme);
  $(".modal-title").html("Marchander");
  $("#objet").html("<i class='"+arme.icon+"'> "+nomArme+"<hr>");
  $("#txt-marchand").html("Attention je n'aime pas les arnaques. Cela a tendance à faire monter les prix!");

  $("#caract").empty();
  $("#caract").append("<li class='list-group-item'><span style='font-weight: bold;'>Dégâts:</span> "+arme.degat+"</li>");
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
  $(".modal-footer").append("<button type='button' class='btn btn-primary' data-bs-dismiss='modal' onclick='resultMarchander(\""+arme.nom+"\","+charisme+")' data-bs-toggle='modal' data-bs-target='#result-modal'>Marchander</button>");
  $(".modal-footer").append("<button type='button' class='btn btn-danger' data-bs-dismiss='modal'>Fermer</button>");
}

function resultMarchander(nomArme, vlCaract) {
  var arme = armes.find(arme => arme.nom===nomArme);
  var fortune=pj.fortune;

  $(".modal-footer").empty();
  $("#txt-result").empty();
  
  result=Math.ceil(Math.random()*20);
  if(result==1) {
    $(".modal-title").html("Marchandage effectué");
    $("#txt-tirage").html("Réussite critique du marchandage ("+result+" sur "+vlCaract+").");
    $("#txt-result").append("<p style='position: relative; top: 10px; left: -50px;'>Maintenant que vous le dite, il y avait bien une erreur sur le prix!</p>");
    $("#txt-result").append("<p style='position: relative; top: 10px; left: -50px;'>Du coup je vous fait <span style='font-weight: bold;'>"+nomArme+"</span> à moitié prix, soit "+arme.prix/2+" pièces d'or.</p>");
    $(".modal-footer").append("<button type='button' class='btn btn-success' data-bs-dismiss='modal' onclick='resultAcheter(\""+arme.nom+"\","+arme.prix/2+")' data-bs-toggle='modal' data-bs-target='#result-modal'>Acheter</button>");
  } else if(result<=vlCaract) {
    $(".modal-title").html("Marchandage effectué");
    $("#txt-tirage").html("Réussite du marchandage ("+result+" sur "+vlCaract+").");
    $("#txt-result").append("<p style='position: relative; top: 10px; left: -50px;'>Bon c'est parce que c'est vous, je vous fait <span style='font-weight: bold;'>"+nomArme+"</span> pour "+arme.prix*0.8+" pièces d'or.</p>");
    $(".modal-footer").append("<button type='button' class='btn btn-success' data-bs-dismiss='modal' onclick='resultAcheter(\""+arme.nom+"\","+arme.prix*0.8+")' data-bs-toggle='modal' data-bs-target='#result-modal'>Acheter</button>");
    /*pj.fortune -= arme.prix;
    pj.armes.push(nomArme);
    $("#fortune").val(pj.fortune);
    localStorage.setItem("pj",JSON.stringify(pj));*/
  } else if(result==20){
    $(".modal-title").html("Marchandage raté");
    $("#txt-tirage").html("Echec critique du marchandage ("+result+" sur "+vlCaract+").");
    $("#txt-result").append("<p style='position: relative; top: 10px; left: -50px;'>Je n'aime pas le marchandage et le fait qu'on essaye de me la faire.</p>");
    $("#txt-result").append("<p style='position: relative; top: 10px; left: -50px;'><span style='font-weight: bold;'>"+nomArme+"</span> ne fera pas parti de votre équipement!</p>");
  } else {
    $(".modal-title").html("Marchandage raté");
    $("#txt-tirage").html("Echec du marchandage ("+result+" sur "+vlCaract+").");
    $("#txt-result").append("<p style='position: relative; top: 10px; left: -50px;'>En fait je viens de me souvenir que <span style='font-weight: bold;'>"+nomArme+"</span> appartenait à Glud l'Ancien.</p>");
    $("#txt-result").append("<p style='position: relative; top: 10px; left: -50px;'>Du coup le prix augmente à "+arme.prix*1.2+" pièces d'or.</p>");
    $(".modal-footer").append("<button type='button' class='btn btn-warning' data-bs-dismiss='modal' onclick='resultAcheter(\""+arme.nom+"\","+arme.prix*1.2+")' data-bs-toggle='modal' data-bs-target='#result-modal'>Acheter ?</button>");
  }


  $(".modal-footer").append("<button type='button' class='btn btn-danger' data-bs-dismiss='modal'>Fermer</button>");
}

function voler(nomArme) {
  var arme = armes.find(arme => arme.nom===nomArme);
  $(".modal-title").html("Voler");
  $("#objet").html("<i class='"+arme.icon+"'> "+nomArme+"<hr>");
  $("#txt-marchand").html("Si l'envie vous prend de voler, j'ai un garde à l'entrée du magasin!");

  $("#caract").empty();
  $("#caract").append("<li class='list-group-item'><span style='font-weight: bold;'>Dégâts:</span> "+arme.degat+"</li>");
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
  $(".modal-footer").append("<button type='button' class='btn btn-warning' data-bs-dismiss='modal' onclick='resultVoler()'>Voler</button>");
  $(".modal-footer").append("<button type='button' class='btn btn-danger' data-bs-dismiss='modal'>Fermer</button>");
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
  $("#equiepent").append("<li class='list-group-item'><span style='font-weight: bold;'>"+nomArme+"</span></li>");

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

function initArmes() {
    pj = JSON.parse(localStorage.getItem("pj"));

    pj.armes.forEach(function(nomArme) {
      var arme = armes.find(arme => arme.nom===nomArme);
      $("#eq-armes").append("<li><span style='font-weight: bold;'>"+arme.nom+"</span> ("+arme.degat+")</li>");
    });
 
}