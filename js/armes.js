class Armes {
  constructor(armes) {
    if ("armes" in localStorage) {
      this.armes = JSON.parse(localStorage.getItem("armes"));;
    } else {      
      this.armes = armes;
      this.save();
    }

  }

  save() {
    localStorage.setItem("armes", JSON.stringify(this.armes));
  }

  actionButton(arme) {
    let strButton=
    "<div class='dropdown'> \
      <button type='button' class='btn btn-primary dropdown-toggle' data-bs-toggle='dropdown'> Action </button> \
      <ul class='dropdown-menu'> \
        <li><button id='btn-acheter-"+arme.nom.id()+"' type='button' class='btn' data-bs-toggle='modal' data-bs-target='#action-modal'>Acheter</button> \
        <li><button id='btn-marchander-"+arme.nom.id()+"' type='button' class='btn' data-bs-toggle='modal' data-bs-target='#action-modal'>Marchander</button> \
        <li><button id='btn-voler-"+arme.nom.id()+"' type='button' class='btn' data-bs-toggle='modal' data-bs-target='#action-modal'>Voler</button> \
      </ul> \
    </div>";

    return strButton;
  }

  liste() {

    let type="";
    let self=this;
    $("#t-armes").empty();
    this.armes.forEach(function(arme) {
      if (type != arme.type) {
        type=arme.type;
        let strLigne=" \
        <tr> \
          <td colspan='5' style='background-color: burlywood;' onclick='$(\".c-"+arme.type.id()+"\").toggle()'><i class='"+arme.icon+"'><span style='font-weight: bold;'> "+arme.type+"</span></i></td> \
        </tr>";
        $("#t-armes").append(strLigne);    
      }

      let strLigne =
      "<tr class='c-"+arme.type.id()+"' style='display: none;'> \
        <td>"+arme.nom+"</i></td> \
        <td>"+arme.prix+"</td> \
        <td>"+arme.degat+"</td> \
        <td>"+arme.rupture+"</td> \
        <td>"+self.actionButton(arme)+"</td> \
      </tr>";
      $("#t-armes").append(strLigne);

      $("#btn-acheter-"+arme.nom.id()).on("click", function() {
        self.acheter(arme.nom);
      });
      $("#btn-marchander-"+arme.nom.id()).on("click", function() {
        self.marchander(arme.nom);
      });
      $("#btn-voler-"+arme.nom.id()).on("click", function() {
        self.voler(arme.nom);
      });
    });
  }

  acheter(nomArme) {
    var arme = this.armes.find(arme => arme.nom===nomArme);
    
    $(".modal-title").html("Acheter");
    $("#objet").html("<i class='"+arme.icon+"'> "+nomArme+"<hr>");
    $("#txt-marchand").html("C'est une lame de bonne qualité. C'est un prix d'ami que je vous fais!");
    $("#txt-comptences").empty();

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
    $(".modal-footer").append("<button id='btn-achat-"+arme.nom.id()+"' type='button' class='btn btn-primary' data-bs-dismiss='modal' data-bs-toggle='modal' data-bs-target='#result-modal'><i class='ra ra-gold-bar'> Acheter</button>");
    $(".modal-footer").append("<button id='' type='button' class='btn btn-danger' data-bs-dismiss='modal'><i class='ra ra-cancel'> Fermer</i></button>");

    $("#btn-achat-"+arme.nom.id()).on("click", function() {
      var fortune=pj.fortune;
    
      //prix = (prix==0 ? arme.prix : prix);
      if (fortune>=arme.prix) {
        $(".modal-title").html("Achat effectué");
        $("#txt-result").html("<span style='font-weight: bold;'>"+nomArme+"</span> vient d'être acheté pour "+arme.prix+" pièces d'or.");
        pj.fortune -= arme.prix;
        pj.armes.push(nomArme);
        $("#fortune").val(pj.fortune);
        localStorage.setItem("pj",JSON.stringify(pj));
        $("#eq-armes").append("<li><span style='font-weight: bold;'>"+arme.nom+"</span> ("+arme.degat+")</li>");
      } else {
        $(".modal-title").html("Achat non effectué");
        $("#txt-result").html("<span style='font-weight: bold;'>"+nomArme+"</span> est beaucoup trop cher pour vous!");
      }
    
      $(".modal-footer").empty();
      $(".modal-footer").append("<button type='button' class='btn btn-danger' data-bs-dismiss='modal'><li class='ra ra-cancel'> Fermer</i></button>");
    });
  }

  marchander(nomArme) {
    var arme = this.armes.find(arme => arme.nom===nomArme);

    $(".modal-title").html("Marchander");
    $("#objet").html("<i class='"+arme.icon+"'> "+nomArme+"<hr>");
    $("#txt-marchand").html("Attention je n'aime pas les arnaques. Cela a tendance à faire monter les prix!");
    $("#txt-comptences").empty();
  
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
  
    var charisme=+pj.charisme;
    if (pj.competences.includes("radin")) {
      $("#txt-comptences").html("Vous posséder la compétence \"Radin\". Vous aves un bonus de +4 au marchandage!");
      charisme += 4;
    } else if (pj.competences.includes("arnaque et carambouille")) {
      $("#txt-comptences").html("Vous posséder la compétence \"Arnaque et carambouille\". Vous aves un bonus de +4 au marchandage!");
      charisme += 4;
    }
    $("#txt-explication").html("Vous pouvez marchander en effectuant un jet de charisme.");
  
    $(".modal-footer").empty();
    $(".modal-footer").append("<p>Vous pouvez marchander en effectuant un jet de charisme <= "+charisme+".<p>");
    $(".modal-footer").append("<button id='btn-marachandage-"+arme.nom.id()+"' type='button' class='btn btn-primary' data-bs-dismiss='modal' data-bs-toggle='modal' data-bs-target='#result-modal'><i class='ra ra-crystal-ball'> Marchander</i></button>");
    $(".modal-footer").append("<button type='button' class='btn btn-danger' data-bs-dismiss='modal'><i class='ra ra-cancel'> Fermer</i></button>");

    var self=this;
    $("#btn-marachandage-"+arme.nom.id()).on("click", function() {
      //let arme = armes.find(arme => arme.nom===nomArme);

      $(".modal-footer").empty();
      $("#txt-result").empty();
      
      let result=Math.ceil(Math.random()*20);
      //result=19;
      if(result==1) {
        $(".modal-title").html("Marchandage effectué");
        $("#txt-tirage").html("Réussite critique du marchandage ("+result+" sur "+charisme+").");
        $("#txt-result").append("<p style='position: relative; top: 10px; left: -50px;'>Maintenant que vous le dite, il y avait bien une erreur sur le prix!</p>");
        $("#txt-result").append("<p style='position: relative; top: 10px; left: -50px;'>Du coup je vous fais <span style='font-weight: bold;'>"+nomArme+"</span> à moitié prix, soit "+Math.ceil(arme.prix/2)+" pièces d'or.</p>");
        arme.prix = arme.prix/2;
      } else if(result<=charisme) {
        $(".modal-title").html("Marchandage effectué");
        $("#txt-tirage").html("Réussite du marchandage ("+result+" sur "+charisme+").");
        $("#txt-result").append("<p style='position: relative; top: 10px; left: -50px;'>Bon c'est parce que c'est vous, je vous fais <span style='font-weight: bold;'>"+nomArme+"</span> pour "+Math.ceil(arme.prix*0.8)+" pièces d'or.</p>");
        arme.prix = arme.prix*0.8;
      } else if(result==20){
        $(".modal-title").html("Marchandage raté");
        $("#txt-tirage").html("Echec critique du marchandage ("+result+" sur "+charisme+").");
        $("#txt-result").append("<p style='position: relative; top: 10px; left: -50px;'>Au fait, il y a un groupe d'aventurier qui a mis une option sur cette arme au retour de leur excursion dans le donjon.</p>");
        $("#txt-result").append("<p style='position: relative; top: 10px; left: -50px;'><span style='font-weight: bold;'>Ca fait déjà une semaine qu'ils sont partis. Vous pouvez l'avoir quand même, mais ça sera le double du prix initial!</p>");
        arme.prix = arme.prix*2;
        self.updatePrix(arme);
      } else {
        $(".modal-title").html("Marchandage raté");
        $("#txt-tirage").html("Echec du marchandage ("+result+" sur "+charisme+").");
        $("#txt-result").append("<p style='position: relative; top: 10px; left: -50px;'>En fait je viens de me souvenir que <span style='font-weight: bold;'>"+nomArme+"</span> appartenait à Glud l'Ancien.</p>");
        $("#txt-result").append("<p style='position: relative; top: 10px; left: -50px;'>Du coup le prix augmente à "+Math.ceil(arme.prix*1.2)+" pièces d'or.</p>");
        arme.prix = arme.prix*1.2;
        
      }
      arme.prix = Math.ceil(arme.prix);
      self.updatePrix(arme);

      if (result<20) {
        $(".modal-footer").append("<button type='button' class='btn btn-success btn-achat' data-bs-dismiss='modal' data-bs-toggle='modal' data-bs-target='#result-modal'><i class='ra ra-gold-bar'> Acheter</i></button>");      
      }
      $(".modal-footer").append("<button type='button' class='btn btn-danger' data-bs-dismiss='modal'><i class='ra ra-cancel'> Fermer</i></button>");
      self.liste();

      $(".btn-achat").on("click", function() {
        var fortune=pj.fortune;
      
        //prix = (prix==0 ? arme.prix : prix);
        if (fortune>=arme.prix) {
          $(".modal-title").html("Achat effectué");
          $("#txt-result").html("<span style='font-weight: bold;'>"+nomArme+"</span> vient d'être acheté pour "+arme.prix+" pièces d'or.");
          pj.fortune -= arme.prix;
          pj.armes.push(nomArme);
          $("#fortune").val(pj.fortune);
          localStorage.setItem("pj",JSON.stringify(pj));
          $("#eq-armes").append("<li><span style='font-weight: bold;'>"+arme.nom+"</span> ("+arme.degat+")</li>");
        } else {
          $(".modal-title").html("Achat non effectué");
          $("#txt-result").html("<span style='font-weight: bold;'>"+nomArme+"</span> est beaucoup trop cher pour vous!");
        }
      
        $(".modal-footer").empty();
        $(".modal-footer").append("<button type='button' class='btn btn-danger' data-bs-dismiss='modal'><i class='ra ra-cancel'> Fermer</i></button>");
      });
  
    });
  }

  voler(nomArme) {
    var arme = this.armes.find(arme => arme.nom===nomArme);

    $(".modal-title").html("Voler");
    $("#objet").html("<i class='"+arme.icon+"'> "+nomArme+"<hr>");
    $("#txt-marchand").html("<span style='font-weight: bold;'>Attention</span> si l'envie vous prend de voler, j'ai des gardes à l'entrée du magasin!");
    $("#txt-comptences").empty();
  
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
  
    var adresse=+pj.adresse;
    if (pj.competences.includes("chouraver")) {
      $("#txt-comptences").html("Vous posséder la compétence \"Chouraver\". Vous aves un bonus de +4 au vol!");
      adresse += 4;
    }
  
    $(".modal-footer").empty();
    $(".modal-footer").append("<p>Vous pouvez voler en effectuant un jet d'adresse <= "+adresse+".<p>");
    $(".modal-footer").append("<button id='btn-vol-"+arme.nom.id()+"' type='button' class='btn btn-warning' data-bs-dismiss='modal' data-bs-toggle='modal' data-bs-target='#result-modal'><i class='ra ra-hood'></i> Voler</button>");
    $(".modal-footer").append("<button type='button' class='btn btn-danger' data-bs-dismiss='modal'<i class='ra ra-cancel'> Fermer</i></button>");

    var self=this;
    $("#btn-vol-"+arme.nom.id()).on("click", function() {
  
      $(".modal-footer").empty();
      $("#txt-result").empty();
    
      let result=Math.ceil(Math.random()*20);
      if(result==1) {
        $(".modal-title").html("Vol effectué");
        $("#txt-tirage").html("Réussite critique du vol ("+result+" sur "+adresse+").");
        $("#txt-result").append("<p style='position: relative; top: 10px; left: -50px;'>Vous aussi vous avez senti un courant d'air?</p>");
        $(".modal-footer").append("<button type='button' class='btn btn-danger' data-bs-dismiss='modal'><i class='ra ra-cancel'> Fermer</i></button>");
      } else if(result<=adresse) {
        $(".modal-title").html("Vol effectué");
        $("#txt-tirage").html("Réussite du vol ("+result+" sur "+adresse+").");
        $("#txt-result").append("<p style='position: relative; top: 10px; left: -50px;'>Tiens, j'aurais juré que <span style='font-weight: bold;'>"+nomArme+"</span> était posée ici tout à l'heure.</p>");
        $(".modal-footer").append("<button type='button' class='btn btn-danger' data-bs-dismiss='modal'><i class='ra ra-cancel'> Fermer</i></button>");
      } else if(result==20){
        $(".modal-title").html("Vol raté");
        $("#txt-tirage").html("Echec critique du vol ("+result+" sur "+adresse+").");
        $("#txt-result").append("<p style='position: relative; top: 10px; left: -50px;'>Zeus, Apollon attaquez ce voleur de bas étage!</p>");
        $("#txt-result").append("<p style='position: relative; top: 10px; left: -50px;'><span style='font-weight: bold;'>"+nomArme+"</span> ne fera pas parti de votre équipement!</p>");
        $(".modal-footer").append("<button type='button' class='btn  btn-fuir btn-warning' data-bs-dismiss='modal' onclick='' data-bs-toggle='modal' data-bs-target='#result-modal'><i class='ra ra-shoe-prints'> Fuir</i></button>");
        $(".modal-footer").append("<button type='button' class='btn btn-danger' data-bs-dismiss='modal' onclick='' data-bs-toggle='modal' data-bs-target='#result-modal'><i class='ra ra-crossed-swords'> Combattre</i></button>");
      } else {
        $(".modal-title").html("Vol raté");
        $("#txt-tirage").html("Echec du Vol ("+result+" sur "+adresse+").");
        $("#txt-result").append("<p style='position: relative; top: 10px; left: -50px;'>Dite donc mon ami... Vous n'essayerai pas de voler <span style='font-weight: bold;'>"+nomArme+"</span>?</p>");
        $("#txt-result").append("<p style='position: relative; top: 10px; left: -50px;'>J'ai des gardes qui pourraient vous en faire passer l'envie!</p>");
        $(".modal-footer").append("<button type='button' class='btn btn-primary' data-bs-primary='modal' onclick='' data-bs-toggle='modal' data-bs-target='#result-modal'><i class='ra ra-hand'> Reposer l'arme</i></button>");
        $(".modal-footer").append("<button type='button' class='btn  btn-fuir btn-warning' data-bs-dismiss='modal' onclick='' data-bs-toggle='modal' data-bs-target='#result-modal'><i class='ra ra-shoe-prints'> Fuir</i></button>");
        $(".modal-footer").append("<button type='button' class='btn btn-danger' data-bs-dismiss='modal' onclick='' data-bs-toggle='modal' data-bs-target='#result-modal'><i class='ra ra-crossed-swords'> Combattre</i></button>");
      }

      $(".btn-fuir").on("click", function() {
        blessure(2);
      });

    });

  }

  updatePrix(majArme) {
    this.armes.forEach(function(arme) {
      if(arme.nom==majArme.nom) {
        arme.prix=majArme.prix;
      }
    });

    this.save();
  }
}

function listeArmures() {
  strButton=
  "<div class='dropdown'> \
    <button type='button' class='btn btn-primary dropdown-toggle' data-bs-toggle='dropdown'> Action </button> \
    <ul class='dropdown-menu'> \
    <li><button type='button' class='btn' onclick='acheter(\"objet\")' data-bs-toggle='modal' data-bs-target='#action-modal'>Acheter</button> \
    <li><button type='button' class='btn' onclick='marchander(\"objet\")' data-bs-toggle='modal' data-bs-target='#action-modal'>Marchander</button> \
    <li><button type='button' class='btn' onclick='voler(\"objet\")' data-bs-toggle='modal' data-bs-target='#action-modal'>Voler</button> \
  </ul> \
  </div>";

  type="";
  armures.forEach(function(armure) {
    if (type != armure.type) {
      type=armure.type;
      strLigne=" \
      <tr> \
        <td colspan='5' style='background-color: burlywood;' onclick='$(\".c-"+armure.type.id()+"\").toggle()'><i class='"+armure.icon+"' style='color: black;'><span style='font-weight: bold;'> "+armure.type+"</span></i></td> \
      </tr>";
      $("#t-armures").append(strLigne);    
    }
    strLigne="<tr class='c-"+armure.type.id()+"' style='display: none;'>";
    strLigne +="<td>"+armure.nom+"</i></td>";
    strLigne +="<td>"+armure.prix+"</td>";
    strLigne +="<td>"+armure.pr+"</td>";
    strLigne +="<td>"+armure.rupture+"</td>";
    strLigne +="<td>"+strButton.replaceAll("objet",armure.nom)+"</td>";
    strLigne += "</tr>";
    $("#t-armures").append(strLigne);    
  });
}

function listeDivers() {
  strButton=
  "<div class='dropdown'> \
    <button type='button' class='btn btn-primary dropdown-toggle' data-bs-toggle='dropdown'> Action </button> \
    <ul class='dropdown-menu'> \
    <li><button type='button' class='btn' onclick='acheter(\"objet\")' data-bs-toggle='modal' data-bs-target='#action-modal'>Acheter</button> \
    <li><button type='button' class='btn' onclick='marchander(\"objet\")' data-bs-toggle='modal' data-bs-target='#action-modal'>Marchander</button> \
    <li><button type='button' class='btn' onclick='voler(\"objet\")' data-bs-toggle='modal' data-bs-target='#action-modal'>Voler</button> \
  </ul> \
  </div>";

  type="";
  divers.forEach(function(objet) {
    if (type != objet.type) {
      type=objet.type;
      strLigne=" \
      <tr> \
        <td colspan='5' style='background-color: burlywood;' onclick='$(\".c-"+objet.type.id()+"\").toggle()'><i class='"+objet.icon+"' style='color: black;'><span style='font-weight: bold;'> "+objet.type+"</span></i></td> \
      </tr>";
      $("#t-divers").append(strLigne);    
    }
    strLigne="<tr class='c-"+objet.type.id()+"' style='display: none;'>";
    strLigne +="<td>"+objet.nom+"</i></td>";
    strLigne +="<td>"+objet.prix+"</td>";
    strLigne +="<td>"+objet.poids+"</td>";
    strLigne +="<td>"+strButton.replaceAll("objet",objet.nom)+"</td>";
    strLigne += "</tr>";
    $("#t-divers").append(strLigne);    
  });
}

function resultMarchander(nomArme, vlCaract) {

}

function resultVoler(nomArme, vlCaract) {
  var arme = armes.find(arme => arme.nom===nomArme);
  
  $(".modal-footer").empty();
  $("#txt-result").empty();
  
  result=Math.ceil(Math.random()*20);
  if(result==1) {
    $(".modal-title").html("Vol effectué");
    $("#txt-tirage").html("Réussite critique du vol ("+result+" sur "+vlCaract+").");
    $("#txt-result").append("<p style='position: relative; top: 10px; left: -50px;'>Vous voulez autre chose?</p>");
    $(".modal-footer").append("<button type='button' class='btn btn-success' data-bs-dismiss='modal' onclick='resultAcheter(\""+arme.nom+"\",0)' data-bs-toggle='modal' data-bs-target='#result-modal'>Acheter</button>");
  } else if(result<=vlCaract) {
    $(".modal-title").html("Vol effectué");
    $("#txt-tirage").html("Réussite du vol ("+result+" sur "+vlCaract+").");
    $("#txt-result").append("<p style='position: relative; top: 10px; left: -50px;'>Tiens, j'aurais juré que <span style='font-weight: bold;'>"+nomArme+"</span> était posée ici tout à l'heure.</p>");
    //$(".modal-footer").append("<button type='button' class='btn btn-success' data-bs-dismiss='modal' onclick='resultAcheter(\""+arme.nom+"\",0)' data-bs-toggle='modal' data-bs-target='#result-modal'>Acheter</button>");
    /*pj.fortune -= arme.prix;
    pj.armes.push(nomArme);
    $("#fortune").val(pj.fortune);
    localStorage.setItem("pj",JSON.stringify(pj));*/
  } else if(result==20){
    $(".modal-title").html("Vol raté");
    $("#txt-tirage").html("Echec critique du vol ("+result+" sur "+vlCaract+").");
    $("#txt-result").append("<p style='position: relative; top: 10px; left: -50px;'>Zeus, Apollon attaquez ce voleur de bas étage!</p>");
    $("#txt-result").append("<p style='position: relative; top: 10px; left: -50px;'><span style='font-weight: bold;'>"+nomArme+"</span> ne fera pas parti de votre équipement!</p>");
    $(".modal-footer").append("<button type='button' class='btn btn-warning' data-bs-dismiss='modal' onclick='' data-bs-toggle='modal' data-bs-target='#result-modal'>Fuir</button>");
    $(".modal-footer").append("<button type='button' class='btn btn-danger' data-bs-dismiss='modal' onclick='' data-bs-toggle='modal' data-bs-target='#result-modal'>Combattre</button>");
  } else {
    $(".modal-title").html("Vol raté");
    $("#txt-tirage").html("Echec du Vol ("+result+" sur "+vlCaract+").");
    $("#txt-result").append("<p style='position: relative; top: 10px; left: -50px;'>Dite donc mon ami... Vous n'essayerai pas de voler <span style='font-weight: bold;'>"+nomArme+"</span>?</p>");
    $("#txt-result").append("<p style='position: relative; top: 10px; left: -50px;'>J'ai un garde qui pourrai vous en faire passer l'envie!</p>");
    $(".modal-footer").append("<button type='button' class='btn btn-primary' data-bs-primary='modal' onclick='' data-bs-toggle='modal' data-bs-target='#result-modal'>Reposer l'arme</button>");
    $(".modal-footer").append("<button type='button' class='btn btn-warning' data-bs-dismiss='modal' onclick='' data-bs-toggle='modal' data-bs-target='#result-modal'>Fuir</button>");
    $(".modal-footer").append("<button type='button' class='btn btn-danger' data-bs-dismiss='modal' onclick='' data-bs-toggle='modal' data-bs-target='#result-modal'>Combattre</button>");
  }


  $(".modal-footer").append("<button type='button' class='btn btn-danger' data-bs-dismiss='modal'>Fermer <li class='ra ra-cancel'></li></button>");
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