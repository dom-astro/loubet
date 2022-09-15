class Armures {
  constructor(armures) {
    if ("armures" in localStorage) {
      this.armures = JSON.parse(localStorage.getItem("armures"));;
    } else {      
      this.armures = armures;
      this.save();
    }
  }

  save() {
    localStorage.setItem("armures", JSON.stringify(this.armures));
  }

  actionButton(armure) {
    let strButton=
    "<div class='dropdown'> \
      <button type='button' class='btn btn-primary dropdown-toggle' data-bs-toggle='dropdown'> Action </button> \
      <ul class='dropdown-menu'> \
        <li><button id='btn-acheter-"+armure.nom.id()+"' type='button' class='btn' data-bs-toggle='modal' data-bs-target='#action-modal'>Acheter</button> \
        <li><button id='btn-marchander-"+armure.nom.id()+"' type='button' class='btn' data-bs-toggle='modal' data-bs-target='#action-modal'>Marchander</button> \
        <li><button id='btn-voler-"+armure.nom.id()+"' type='button' class='btn' data-bs-toggle='modal' data-bs-target='#action-modal'>Voler</button> \
      </ul> \
    </div>";

    return strButton;
  }

  liste() {

    let type="";
    let self=this;
    $("#t-armures").empty();
    this.armures.forEach(function(armure) {
      if (type != armure.type) {
        type=armure.type;
        let strLigne=" \
        <tr> \
          <td colspan='5' style='background-color: burlywood;' onclick='$(\".c-"+armure.type.id()+"\").toggle()'><i class='"+armure.icon+"'><span style='font-weight: bold;'> "+armure.type+"</span></i></td> \
        </tr>";
        $("#t-armures").append(strLigne);    
      }

      let strLigne =
      "<tr class='c-"+armure.type.id()+"' style='display: none;'> \
        <td>"+armure.nom+"</i></td> \
        <td>"+armure.prix+"</td> \
        <td>"+armure.pr+"</td> \
        <td>"+armure.rupture+"</td> \
        <td>"+self.actionButton(armure)+"</td> \
      </tr>";
      $("#t-armures").append(strLigne);

      $("#btn-acheter-"+armure.nom.id()).on("click", function() {
        self.acheter(armure.nom);
      });
      $("#btn-marchander-"+armure.nom.id()).on("click", function() {
        self.marchander(armure.nom);
      });
      $("#btn-voler-"+armure.nom.id()).on("click", function() {
        self.voler(armure.nom);
      });
    });
  }

  acheter(nomArmure) {
    var armure = this.armures.find(armure => armure.nom===nomArmure);
    
    $(".modal-title").html("Acheter");
    $("#objet").html("<i class='"+armure.icon+"'> "+nomArmure+"<hr>");
    $("#txt-marchand").html("C'est une lame de bonne qualité. C'est un prix d'ami que je vous fais!");
    $("#txt-comptences").empty();

    $("#caract").empty();
    $("#caract").append("<li class='list-group-item'><span style='font-weight: bold;'>Dégâts:</span> "+armure.pr+"</li>");
    $("#caract").append("<li class='list-group-item'><span style='font-weight: bold;'>Prix:</span> "+armure.prix+" pièces d'or</li>");
    $("#caract").append("<li class='list-group-item'><span style='font-weight: bold;'>Rupture:</span> "+armure.rupture+"</li>");
    
    $("#bonus").empty();
    $("#malus").empty();
    setBonusMalus(armure,"attaque");
    setBonusMalus(armure,"parade");
    setBonusMalus(armure,"adresse");
    setBonusMalus(armure,"courage");
    setBonusMalus(armure,"charisme");
    setBonusMalus(armure,"force");
    setBonusMalus(armure,"intelligence");
    
    $(".modal-footer").empty();
    $(".modal-footer").append("<button id='btn-achat-"+armure.nom.id()+"' type='button' class='btn btn-primary' data-bs-dismiss='modal' data-bs-toggle='modal' data-bs-target='#result-modal'><i class='ra ra-gold-bar'> Acheter</button>");
    $(".modal-footer").append("<button id='' type='button' class='btn btn-danger' data-bs-dismiss='modal'><i class='ra ra-cancel'> Fermer</i></button>");

    $("#btn-achat-"+armure.nom.id()).on("click", function() {
      var fortune=pj.fortune;
    
      //prix = (prix==0 ? armure.prix : prix);
      if (fortune>=armure.prix) {
        $(".modal-title").html("Achat effectué");
        $("#txt-result").html("<span style='font-weight: bold;'>"+nomArmure+"</span> vient d'être acheté pour "+armure.prix+" pièces d'or.");
        pj.fortune -= armure.prix;
        pj.armures.push(nomArmure);
        $("#fortune").val(pj.fortune);
        localStorage.setItem("pj",JSON.stringify(pj));
        $("#eq-armures").append("<li><span style='font-weight: bold;'>"+armure.nom+"</span> ("+armure.degat+")</li>");
      } else {
        $(".modal-title").html("Achat non effectué");
        $("#txt-result").html("<span style='font-weight: bold;'>"+nomArmure+"</span> est beaucoup trop cher pour vous!");
      }
    
      $(".modal-footer").empty();
      $(".modal-footer").append("<button type='button' class='btn btn-danger' data-bs-dismiss='modal'><li class='ra ra-cancel'> Fermer</i></button>");
    });
  }

  marchander(nomArmure) {
    var armure = this.armures.find(armure => armure.nom===nomArmure);

    $(".modal-title").html("Marchander");
    $("#objet").html("<i class='"+armure.icon+"'> "+nomArmure+"<hr>");
    $("#txt-marchand").html("Attention je n'aime pas les arnaques. Cela a tendance à faire monter les prix!");
    $("#txt-comptences").empty();
  
    $("#caract").empty();
    $("#caract").append("<li class='list-group-item'><span style='font-weight: bold;'>Dégâts:</span> "+armure.degat+"</li>");
    $("#caract").append("<li class='list-group-item'><span style='font-weight: bold;'>Prix:</span> "+armure.prix+" pièces d'or</li>");
    $("#caract").append("<li class='list-group-item'><span style='font-weight: bold;'>Rupture:</span> "+armure.rupture+"</li>");
  
    $("#bonus").empty();
    $("#malus").empty();
    setBonusMalus(armure,"attaque");
    setBonusMalus(armure,"parade");
    setBonusMalus(armure,"adresse");
    setBonusMalus(armure,"courage");
    setBonusMalus(armure,"charisme");
    setBonusMalus(armure,"force");
    setBonusMalus(armure,"intelligence");
  
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
    $(".modal-footer").append("<button id='btn-marachandage-"+armure.nom.id()+"' type='button' class='btn btn-primary' data-bs-dismiss='modal' data-bs-toggle='modal' data-bs-target='#result-modal'><i class='ra ra-crystal-ball'> Marchander</i></button>");
    $(".modal-footer").append("<button type='button' class='btn btn-danger' data-bs-dismiss='modal'><i class='ra ra-cancel'> Fermer</i></button>");

    var self=this;
    $("#btn-marachandage-"+armure.nom.id()).on("click", function() {
      //let armure = armures.find(armure => armure.nom===nomArmure);

      $(".modal-footer").empty();
      $("#txt-result").empty();
      
      let result=Math.ceil(Math.random()*20);
      //result=19;
      if(result==1) {
        $(".modal-title").html("Marchandage effectué");
        $("#txt-tirage").html("Réussite critique du marchandage ("+result+" sur "+charisme+").");
        $("#txt-result").append("<p style='position: relative; top: 10px; left: -50px;'>Maintenant que vous le dite, il y avait bien une erreur sur le prix!</p>");
        $("#txt-result").append("<p style='position: relative; top: 10px; left: -50px;'>Du coup je vous fais <span style='font-weight: bold;'>"+nomArmure+"</span> à moitié prix, soit "+Math.ceil(armure.prix/2)+" pièces d'or.</p>");
        armure.prix = armure.prix/2;
      } else if(result<=charisme) {
        $(".modal-title").html("Marchandage effectué");
        $("#txt-tirage").html("Réussite du marchandage ("+result+" sur "+charisme+").");
        $("#txt-result").append("<p style='position: relative; top: 10px; left: -50px;'>Bon c'est parce que c'est vous, je vous fais <span style='font-weight: bold;'>"+nomArmure+"</span> pour "+Math.ceil(armure.prix*0.8)+" pièces d'or.</p>");
        armure.prix = armure.prix*0.8;
      } else if(result==20){
        $(".modal-title").html("Marchandage raté");
        $("#txt-tirage").html("Echec critique du marchandage ("+result+" sur "+charisme+").");
        $("#txt-result").append("<p style='position: relative; top: 10px; left: -50px;'>Au fait, il y a un groupe d'aventurier qui a mis une option sur cette armure au retour de leur excursion dans le donjon.</p>");
        $("#txt-result").append("<p style='position: relative; top: 10px; left: -50px;'><span style='font-weight: bold;'>Ca fait déjà une semaine qu'ils sont partis. Vous pouvez l'avoir quand même, mais ça sera le double du prix initial!</p>");
        armure.prix = armure.prix*2;
        self.updatePrix(armure);
      } else {
        $(".modal-title").html("Marchandage raté");
        $("#txt-tirage").html("Echec du marchandage ("+result+" sur "+charisme+").");
        $("#txt-result").append("<p style='position: relative; top: 10px; left: -50px;'>En fait je viens de me souvenir que <span style='font-weight: bold;'>"+nomArmure+"</span> appartenait à Glud l'Ancien.</p>");
        $("#txt-result").append("<p style='position: relative; top: 10px; left: -50px;'>Du coup le prix augmente à "+Math.ceil(armure.prix*1.2)+" pièces d'or.</p>");
        armure.prix = armure.prix*1.2;
        
      }
      armure.prix = Math.ceil(armure.prix);
      self.updatePrix(armure);

      if (result<20) {
        $(".modal-footer").append("<button type='button' class='btn btn-success btn-achat' data-bs-dismiss='modal' data-bs-toggle='modal' data-bs-target='#result-modal'><i class='ra ra-gold-bar'> Acheter</i></button>");      
      }
      $(".modal-footer").append("<button type='button' class='btn btn-danger' data-bs-dismiss='modal'><i class='ra ra-cancel'> Fermer</i></button>");
      self.liste();

      $(".btn-achat").on("click", function() {
        var fortune=pj.fortune;
      
        //prix = (prix==0 ? armure.prix : prix);
        if (fortune>=armure.prix) {
          $(".modal-title").html("Achat effectué");
          $("#txt-result").html("<span style='font-weight: bold;'>"+nomArmure+"</span> vient d'être acheté pour "+armure.prix+" pièces d'or.");
          pj.fortune -= armure.prix;
          pj.armures.push(nomArmure);
          $("#fortune").val(pj.fortune);
          localStorage.setItem("pj",JSON.stringify(pj));
          $("#eq-armures").append("<li><span style='font-weight: bold;'>"+armure.nom+"</span> ("+armure.degat+")</li>");
        } else {
          $(".modal-title").html("Achat non effectué");
          $("#txt-result").html("<span style='font-weight: bold;'>"+nomArmure+"</span> est beaucoup trop cher pour vous!");
        }
      
        $(".modal-footer").empty();
        $(".modal-footer").append("<button type='button' class='btn btn-danger' data-bs-dismiss='modal'><i class='ra ra-cancel'> Fermer</i></button>");
      });
  
    });
  }

  voler(nomArmure) {
    var armure = this.armures.find(armure => armure.nom===nomArmure);

    $(".modal-title").html("Voler");
    $("#objet").html("<i class='"+armure.icon+"'> "+nomArmure+"<hr>");
    $("#txt-marchand").html("<span style='font-weight: bold;'>Attention</span> si l'envie vous prend de voler, j'ai des gardes à l'entrée du magasin!");
    $("#txt-comptences").empty();
  
    $("#caract").empty();
    $("#caract").append("<li class='list-group-item'><span style='font-weight: bold;'>Dégâts:</span> "+armure.degat+"</li>");
    $("#caract").append("<li class='list-group-item'><span style='font-weight: bold;'>Prix:</span> "+armure.prix+" pièces d'or</li>");
    $("#caract").append("<li class='list-group-item'><span style='font-weight: bold;'>Rupture:</span> "+armure.rupture+"</li>");
  
    $("#bonus").empty();
    $("#malus").empty();
    setBonusMalus(armure,"attaque");
    setBonusMalus(armure,"parade");
    setBonusMalus(armure,"adresse");
    setBonusMalus(armure,"courage");
    setBonusMalus(armure,"charisme");
    setBonusMalus(armure,"force");
    setBonusMalus(armure,"intelligence");
  
    var adresse=+pj.adresse;
    if (pj.competences.includes("chouraver")) {
      $("#txt-comptences").html("Vous posséder la compétence \"Chouraver\". Vous aves un bonus de +4 au vol!");
      adresse += 4;
    }
  
    $(".modal-footer").empty();
    $(".modal-footer").append("<p>Vous pouvez voler en effectuant un jet d'adresse <= "+adresse+".<p>");
    $(".modal-footer").append("<button id='btn-vol-"+armure.nom.id()+"' type='button' class='btn btn-warning' data-bs-dismiss='modal' data-bs-toggle='modal' data-bs-target='#result-modal'><i class='ra ra-hood'></i> Voler</button>");
    $(".modal-footer").append("<button type='button' class='btn btn-danger' data-bs-dismiss='modal'<i class='ra ra-cancel'> Fermer</i></button>");

    var self=this;
    $("#btn-vol-"+armure.nom.id()).on("click", function() {
  
      $(".modal-footer").empty();
      $("#txt-result").empty();
    
      let result=Math.ceil(Math.random()*20);
      result=19;
      if(result==1) {
        $(".modal-title").html("Vol effectué");
        $("#txt-tirage").html("Réussite critique du vol ("+result+" sur "+adresse+").");
        $("#txt-result").append("<p style='position: relative; top: 10px; left: -50px;'>Vous aussi vous avez senti un courant d'air?</p>");
        $(".modal-footer").append("<button type='button' class='btn btn-danger' data-bs-dismiss='modal'><i class='ra ra-cancel'> Fermer</i></button>");
      } else if(result<=adresse) {
        $(".modal-title").html("Vol effectué");
        $("#txt-tirage").html("Réussite du vol ("+result+" sur "+adresse+").");
        $("#txt-result").append("<p style='position: relative; top: 10px; left: -50px;'>Tiens, j'aurais juré que <span style='font-weight: bold;'>"+nomArmure+"</span> était posée ici tout à l'heure.</p>");
        $(".modal-footer").append("<button type='button' class='btn btn-danger' data-bs-dismiss='modal'><i class='ra ra-cancel'> Fermer</i></button>");
      } else if(result==20){
        $(".modal-title").html("Vol raté");
        $("#txt-tirage").html("Echec critique du vol ("+result+" sur "+adresse+").");
        $("#txt-result").append("<p style='position: relative; top: 10px; left: -50px;'>Zeus, Apollon attaquez ce voleur de bas étage!</p>");
        $("#txt-result").append("<p style='position: relative; top: 10px; left: -50px;'><span style='font-weight: bold;'>"+nomArmure+"</span> ne fera pas parti de votre équipement!</p>");
        $(".modal-footer").append("<button type='button' class='btn  btn-fuir btn-warning' data-bs-dismiss='modal' onclick='' data-bs-toggle='modal' data-bs-target='#result-modal'><i class='ra ra-shoe-prints'> Fuir</i></button>");
        $(".modal-footer").append("<button type='button' class='btn btn-danger' data-bs-dismiss='modal' onclick='' data-bs-toggle='modal' data-bs-target='#result-modal'><i class='ra ra-crossed-swords'> Combattre</i></button>");
      } else {
        $(".modal-title").html("Vol raté");
        $("#txt-tirage").html("Echec du Vol ("+result+" sur "+adresse+").");
        $("#txt-result").append("<p style='position: relative; top: 10px; left: -50px;'>Dite donc mon ami... Vous n'essayerai pas de voler <span style='font-weight: bold;'>"+nomArmure+"</span>?</p>");
        $("#txt-result").append("<p style='position: relative; top: 10px; left: -50px;'>J'ai des gardes qui pourraient vous en faire passer l'envie!</p>");
        $(".modal-footer").append("<button type='button' class='btn btn-primary' data-bs-primary='modal' onclick='' data-bs-toggle='modal' data-bs-target='#result-modal'><i class='ra ra-hand'> Reposer l'armure</i></button>");
        $(".modal-footer").append("<button type='button' class='btn  btn-fuir btn-warning' data-bs-dismiss='modal' onclick='' data-bs-toggle='modal' data-bs-target='#result-modal'><i class='ra ra-shoe-prints'> Fuir</i></button>");
        $(".modal-footer").append("<button type='button' class='btn btn-danger' data-bs-dismiss='modal' onclick='' data-bs-toggle='modal' data-bs-target='#result-modal'><i class='ra ra-crossed-swords'> Combattre</i></button>");
      }

      $(".btn-fuir").on("click", function() {
        blessure(2);
      });

    });

  }

  updatePrix(majArmure) {
    this.armures.forEach(function(armure) {
      if(armure.nom==majArmure.nom) {
        armure.prix=majArmure.prix;
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

function resultMarchander(nomArmure, vlCaract) {

}

function resultVoler(nomArmure, vlCaract) {
  var armure = armures.find(armure => armure.nom===nomArmure);
  
  $(".modal-footer").empty();
  $("#txt-result").empty();
  
  result=Math.ceil(Math.random()*20);
  if(result==1) {
    $(".modal-title").html("Vol effectué");
    $("#txt-tirage").html("Réussite critique du vol ("+result+" sur "+vlCaract+").");
    $("#txt-result").append("<p style='position: relative; top: 10px; left: -50px;'>Vous voulez autre chose?</p>");
    $(".modal-footer").append("<button type='button' class='btn btn-success' data-bs-dismiss='modal' onclick='resultAcheter(\""+armure.nom+"\",0)' data-bs-toggle='modal' data-bs-target='#result-modal'>Acheter</button>");
  } else if(result<=vlCaract) {
    $(".modal-title").html("Vol effectué");
    $("#txt-tirage").html("Réussite du vol ("+result+" sur "+vlCaract+").");
    $("#txt-result").append("<p style='position: relative; top: 10px; left: -50px;'>Tiens, j'aurais juré que <span style='font-weight: bold;'>"+nomArmure+"</span> était posée ici tout à l'heure.</p>");
    //$(".modal-footer").append("<button type='button' class='btn btn-success' data-bs-dismiss='modal' onclick='resultAcheter(\""+armure.nom+"\",0)' data-bs-toggle='modal' data-bs-target='#result-modal'>Acheter</button>");
    /*pj.fortune -= armure.prix;
    pj.armures.push(nomArmure);
    $("#fortune").val(pj.fortune);
    localStorage.setItem("pj",JSON.stringify(pj));*/
  } else if(result==20){
    $(".modal-title").html("Vol raté");
    $("#txt-tirage").html("Echec critique du vol ("+result+" sur "+vlCaract+").");
    $("#txt-result").append("<p style='position: relative; top: 10px; left: -50px;'>Zeus, Apollon attaquez ce voleur de bas étage!</p>");
    $("#txt-result").append("<p style='position: relative; top: 10px; left: -50px;'><span style='font-weight: bold;'>"+nomArmure+"</span> ne fera pas parti de votre équipement!</p>");
    $(".modal-footer").append("<button type='button' class='btn btn-warning' data-bs-dismiss='modal' onclick='' data-bs-toggle='modal' data-bs-target='#result-modal'>Fuir</button>");
    $(".modal-footer").append("<button type='button' class='btn btn-danger' data-bs-dismiss='modal' onclick='' data-bs-toggle='modal' data-bs-target='#result-modal'>Combattre</button>");
  } else {
    $(".modal-title").html("Vol raté");
    $("#txt-tirage").html("Echec du Vol ("+result+" sur "+vlCaract+").");
    $("#txt-result").append("<p style='position: relative; top: 10px; left: -50px;'>Dite donc mon ami... Vous n'essayerai pas de voler <span style='font-weight: bold;'>"+nomArmure+"</span>?</p>");
    $("#txt-result").append("<p style='position: relative; top: 10px; left: -50px;'>J'ai un garde qui pourrai vous en faire passer l'envie!</p>");
    $(".modal-footer").append("<button type='button' class='btn btn-primary' data-bs-primary='modal' onclick='' data-bs-toggle='modal' data-bs-target='#result-modal'>Reposer l'armure</button>");
    $(".modal-footer").append("<button type='button' class='btn btn-warning' data-bs-dismiss='modal' onclick='' data-bs-toggle='modal' data-bs-target='#result-modal'>Fuir</button>");
    $(".modal-footer").append("<button type='button' class='btn btn-danger' data-bs-dismiss='modal' onclick='' data-bs-toggle='modal' data-bs-target='#result-modal'>Combattre</button>");
  }


  $(".modal-footer").append("<button type='button' class='btn btn-danger' data-bs-dismiss='modal'>Fermer <li class='ra ra-cancel'></li></button>");
}

function setBonusMalus(armure,caract) {
  if (armure[caract]>0) {
    $("#bonus").append("<li class='list-group-item'><span style='font-weight: bold;'>"+caract.capitalize()+":</span> "+armure[caract]+"</li>");
  }
  if (armure[caract]<0) {
    $("#malus").append("<li class='list-group-item'><span style='font-weight: bold;'>"+caract.capitalize()+":</span> "+armure[caract]+"</li>");
  }
}

/*function acheter(nomArmure) {
  $("#equiepent").append("<li class='list-group-item'><span style='font-weight: bold;'>"+nomArmure+"</span></li>");

  var armure = armures.find(armure => armure.nom===nomArmure);

  var fortune=$("#fortune").val();
  fortune -= armure.prix;
  $("#fortune").val(fortune);
  if(!pj.hasOwnProperty(armures)) {
    pj.armures = [];
  }
  pj.armures.push(nomArmure);
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