String.prototype.id = function () {
    var str = this.valueOf();

    return str.replace(' ','-').toLowerCase();
};

String.prototype.capitalize = function () {
    var str = this.valueOf();

    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function caractD6(caract) {
    result=7+Math.ceil(Math.random()*6);
    $("#"+caract).val(result);
    $("#"+caract).next().prop("disabled",true);

    localStorage.setItem(caract,result);
    verifOrigine();
    verifMetier();
}

function destinD4() {
    result=Math.ceil(Math.random()*4)-1;
    $("#destin").val(result);
    $("#destin").next().prop("disabled",true);

    localStorage.setItem("destin",result);
}

function fortuneD6() {
    result=10*(Math.ceil(Math.random()*6)+Math.ceil(Math.random()*6));
    $("#po").val(result);
    $("#po").next().prop("disabled",true);

    localStorage.setItem("po",result);
}


function setOrigine(origine) {
    isEnabled = $("#origine-"+origine.id()).hasClass('card-enabled');
    if (isEnabled) {
        $("#imgPerso").attr("src","img/"+origine+".png");
        $("#typePerso").html(origine);
        $("#metier").show();
        $("#origine").val(origine);
        setCompetencesOrigine(origine);

        switch(origine) {
            case "Barbare":
                $("#attaque").val(9);
                $("#parade").val(9);
                $("#ev").val(35);
                $("#ea").val(0);
                break;
            case "Nain":
                $("#attaque").val(8);
                $("#parade").val(10);
                $("#ev").val(35);
                $("#ea").val(0);
                break;
            case "Elfe":
                $("#attaque").val(8);
                $("#parade").val(10);
                $("#ev").val(28);
                $("#ea").val(0);
                break;
            case "Ogre":
                $("#attaque").val(9);
                $("#parade").val(9);
                $("#ev").val(45);
                $("#ea").val(0);
                break;
            case "Magicienne":
                $("#attaque").val(8);
                $("#parade").val(10);
                $("#ev").val(20);
                $("#ea").val(30);
                break;
            default:
                $("#attaque").val(8);
                $("#parade").val(10);
                $("#ev").val(30);
                $("#ea").val(0);
        }
        localStorage.setItem("origine",origine);
    }
}

function setMetier(metier) {
    isEnabled = $("#metier-"+metier.id()).hasClass('card-enabled');
    if (isEnabled) {
        /*$("#imgPerso").attr("src","img/"+origine+".png");
        $("#typePerso").html(origine);
        $("#metier").show();*/
        $("#metier").val(metier);
        setCompetencesMetier(metier);

        switch(origine) {
            case "Barbare":
                $("#attaque").val(9);
                $("#parade").val(9);
                $("#ev").val(35);
                $("#ea").val(0);
                break;
            case "Nain":
                $("#attaque").val(8);
                $("#parade").val(10);
                $("#ev").val(35);
                $("#ea").val(0);
                break;
            case "Elfe":
                $("#attaque").val(8);
                $("#parade").val(10);
                $("#ev").val(28);
                $("#ea").val(0);
                break;
            case "Ogre":
                $("#attaque").val(9);
                $("#parade").val(9);
                $("#ev").val(45);
                $("#ea").val(0);
                break;
            case "Magicienne":
                $("#attaque").val(8);
                $("#parade").val(10);
                $("#ev").val(20);
                $("#ea").val(30);
                break;
            default:
                $("#attaque").val(8);
                $("#parade").val(10);
                $("#ev").val(30);
                $("#ea").val(0);
        }
        localStorage.setItem("metier",metier);
    }
}

function verifOrigine() {
    var courage=localStorage.getItem("courage"),
    charisme=localStorage.getItem("charisme"),
    force=localStorage.getItem("force"),
    intelligence=localStorage.getItem("intelligence"),
    adresse=localStorage.getItem("adresse");
    var caracteristiques=["courage","charisme","force","intelligence","adresse"];

    origines.forEach(function(origine) {
        isEnabled=true;
        /*caracteristiques.forEach(function(caracteristique) {

        });*/
        if(courage<(origine.courage.min == "Non" ? 0 : origine.courage.min)) isEnabled=false;
        if(courage>(origine.courage.max == "Non" ? 99 : origine.courage.max)) isEnabled=false;
        if(force<(origine.force.min == "Non" ? 0 : origine.force.min)) isEnabled=false;
        if(force>(origine.force.max == "Non" ? 99 : origine.force.max)) isEnabled=false;
        if(intelligence<(origine.intelligence.min == "Non" ? 0 : origine.intelligence.min)) isEnabled=false;
        if(intelligence>(origine.intelligence.max == "Non" ? 99 : origine.intelligence.max)) isEnabled=false;
        if(adresse<(origine.adresse.min == "Non" ? 0 : origine.adresse.min)) isEnabled=false;
        if(adresse>(origine.adresse.max == "Non" ? 99 : origine.adresse.max)) isEnabled=false;
        if(charisme<(origine.charisme.min == "Non" ? 0 : origine.charisme.min)) isEnabled=false;
        if(charisme>(origine.charisme.max == "Non" ? 99 : origine.charisme.max)) isEnabled=false;

        $("#origine-"+origine.nom.id()+">button").prop("disabled",true);
        if (isEnabled) {
            $("#origine-"+origine.nom.id()).removeClass("card-disabled");
            $("#origine-"+origine.nom.id()).addClass("card-enabled");
            $("#origine-"+origine.nom.id()+">button").prop("disabled",false);
        }
    });
}

function verifMetier() {
    var courage=localStorage.getItem("courage"),
    charisme=localStorage.getItem("charisme"),
    force=localStorage.getItem("force"),
    intelligence=localStorage.getItem("intelligence"),
    adresse=localStorage.getItem("adresse");

    metiers.forEach(function(metier) {
        isEnabled=true;
        /*caracteristiques.forEach(function(caracteristique) {

        });*/
        if(courage<(metier.courage.min == "Non" ? 0 : metier.courage.min)) isEnabled=false;
        if(courage>(metier.courage.max == "Non" ? 99 : metier.courage.max)) isEnabled=false;
        if(force<(metier.force.min == "Non" ? 0 : metier.force.min)) isEnabled=false;
        if(force>(metier.force.max == "Non" ? 99 : metier.force.max)) isEnabled=false;
        if(intelligence<(metier.intelligence.min == "Non" ? 0 : metier.intelligence.min)) isEnabled=false;
        if(intelligence>(metier.intelligence.max == "Non" ? 99 : metier.intelligence.max)) isEnabled=false;
        if(adresse<(metier.adresse.min == "Non" ? 0 : metier.adresse.min)) isEnabled=false;
        if(adresse>(metier.adresse.max == "Non" ? 99 : metier.adresse.max)) isEnabled=false;
        if(charisme<(metier.charisme.min == "Non" ? 0 : metier.charisme.min)) isEnabled=false;
        if(charisme>(metier.charisme.max == "Non" ? 99 : metier.charisme.max)) isEnabled=false;

        if (isEnabled) {
            $("#metier-"+metier.nom.id()).removeClass("card-disabled");
            $("#metier-"+metier.nom.id()).addClass("card-enabled");
        }
    });
}

function savePJ() {
    localStorage.setItem("nom",$("#nomPerso").val());
    localStorage.setItem("ea",$("#ea").val());
    localStorage.setItem("ev",$("#ev").val());
    localStorage.setItem("attaque",$("#attaque").val());
    localStorage.setItem("parade",$("#parade").val());
    localStorage.setItem("destin",$("#destin").val());

    $("#nomPerso").prop("disabled",true);
}

function exportPJ() {
    var pj = {};

    pj.nom=localStorage.getItem("nom");
    pj.origine=localStorage.getItem("origine");
    pj.metier=localStorage.getItem("metier");
    pj.courage=localStorage.getItem("courage");
    pj.charisme=localStorage.getItem("charisme");
    pj.force=localStorage.getItem("force");
    pj.intelligence=localStorage.getItem("intelligence");
    pj.adresse=localStorage.getItem("adresse");
    pj.ea=localStorage.getItem("ea");
    pj.ev=localStorage.getItem("ev");
    pj.destin=localStorage.getItem("destin");
    pj.po=localStorage.getItem("po");
    pj.attaque=localStorage.getItem("attaque");
    pj.parade=localStorage.getItem("parade");

    let dataStr = JSON.stringify(pj);
    let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

    let exportFileDefaultName = pj.nom+'.json';

    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

function initPerso() {
    $("#nomPerso").val(localStorage.getItem("nom"));
    $("#ea").val(localStorage.getItem("ea"));
    $("#ev").val(localStorage.getItem("ev"));
    $("#attaque").val(localStorage.getItem("attaque"));
    $("#parade").val(localStorage.getItem("parade"));
    $("#destin").val(localStorage.getItem("destin"));
    $("#po").val(localStorage.getItem("po"));
    $("#courage").val(localStorage.getItem("courage"));
    $("#force").val(localStorage.getItem("force"));
    $("#intelligence").val(localStorage.getItem("intelligence"));
    $("#adresse").val(localStorage.getItem("adresse"));
    $("#charisme").val(localStorage.getItem("charisme"));
    $("#origine").val(localStorage.getItem("origine"));
    $("#metier").val(localStorage.getItem("metier"));

    setGenre(localStorage.getItem("genre"));
    //$("#nomPerso").prop("disabled",true);
    setCompetencesOrigine(localStorage.getItem("origine"));
    setCompetencesMetier(localStorage.getItem("metier"));
    verifOrigine();
    setOrigine(localStorage.getItem("origine"));
    verifMetier();
}

function chargePJ() {
    $("#jsonFile").click();
 }


$('#jsonFile').on('change', function () {
    var file = $('#jsonFile').prop('files')[0];
    var fileReader = new FileReader(); 
    fileReader.readAsText(file); 
    fileReader.onload = function() {
        var jsonPerso = fileReader.result;
        console.info(JSON.parse(jsonPerso));
    }; 
    fileReader.onerror = function() {
      alert(fileReader.error);
    }; 
});

function resetPJ(){
    $("#nomPerso").val("");
    $("#ea").val(0);
    $("#ev").val(25);
    $("#attaque").val(8);
    $("#parade").val(10);
    $("#destin").val(0);
    $("#po").val(0);
    $("#courage").val(7);
    $("#force").val(7);
    $("#intelligence").val(7);
    $("#adresse").val(7);
    $("#charisme").val(7);
    $("#origine").val("");
    $("#metier").val("");

    //$("#nomPerso").prop("disabled",true);
}

function listeOrigine() {
    origines.forEach(function(origine) {
        strConditions  = '';
        strConditions += origine.courage.min == "Non" ? "" : "<span>Courage >= "+origine.courage.min+ "</span><br>";
        strConditions += origine.courage.max == "Non" ? "" : "<span>Courage <= "+origine.courage.max+ "</span><br>";
        strConditions += origine.intelligence.min == "Non" ? "" : "<span>Intelligence >= "+origine.intelligence.min+ "</span><br>";
        strConditions += origine.intelligence.max == "Non" ? "" : "<span>Intelligence <= "+origine.intelligence.max+ "</span><br>";
        strConditions += origine.charisme.min == "Non" ? "" : "<span>Charisme >= "+origine.charisme.min+ "</span><br>";
        strConditions += origine.charisme.max == "Non" ? "" : "<span>Charisme <= "+origine.charisme.max+ "</span><br>";
        strConditions += origine.adresse.min == "Non" ? "" : "<span>Adresse >= "+origine.adresse.min+ "</span><br>";
        strConditions += origine.adresse.max == "Non" ? "" : "<span>Adresse <= "+origine.adresse.max+ "</span><br>";
        strConditions += origine.force.min == "Non" ? "" : "<span>Force >= "+origine.force.min+ "</span><br>";
        strConditions += origine.force.max == "Non" ? "" : "<span>Force <= "+origine.force.max+ "</span><br>";
        strConditions += "</ul>";

        //strTitle = (strTitle.length==1 ? "" : strTitle.replace(" et .","."));
        strOrigine =
        "<div class='col-4' style='margin-top: -8px;'> \
            <div id='origine-"+origine.nom.id()+"' class='card card-disabled' title='"+origine.nom+"'> \
                <img class='card-img-top rounded-circle' src='img/"+origine.nom+".png' alt='"+origine.nom+"'> \
                <p style='position: absolute; left: 70px; top: 10px; font-weight: bold;'>"+origine.nom+"<br> \
                <span style='font-weight: normal; font-size: 10px; text-align: center;'>"+origine.titre+"</span></p> \
                <div style='font-size: 12px; position: relative; left: 10px; top: 10px;'>"+strConditions+"</div> \
                <button type='button' class='btn btn-info btn-origine' onclick='descOrigine(\""+origine.nom+"\")' data-bs-toggle='modal' data-bs-target='#choix-modal'>Voir</button> \
            </div> \
         </div>";

         $("#origines").append(strOrigine);
    });
}

function setCompetencesOrigine(choixOrigine) {
    $("#c-origine>.row").empty();
    origines.forEach(function(origine) {
        if(origine.nom==choixOrigine) {
            $("#presentation").val(origine.presentation);
            origine.competences.naissance.forEach(function(currentCompetence) {
                competences.forEach(function(competence) {
                    if(competence.nom.toLowerCase()==currentCompetence.toLowerCase()) {
                        var nom=capitalizeFirstLetter(competence.nom);
                        strCompetence = 
                        "<div class='col-4'> \
                            <div class='form-check' style='margin-left: 10px;''> \
                                <input class='form-check-input' type='checkbox' id='"+nom+"' checked disabled> \
                                <label class='form-check-label' title='"+competence.description+"'>"+nom+"</label> \
                            </div> \
                        </div>";
            
                        $("#c-origine>.row").append(strCompetence);
                    }
                });
    });
        }
    })
}

function listeMetier() {
    metiers.forEach(function(metier) {
        strTitle  = metier.courage.min == "Non" ? "" : "courage >= "+metier.courage.min+ " et ";
        strTitle += metier.courage.max == "Non" ? "" : "courage <= "+metier.courage.max+ " et ";
        strTitle += metier.intelligence.min == "Non" ? "" : "intelligence >= "+metier.intelligence.min+ " et ";
        strTitle += metier.intelligence.max == "Non" ? "" : "intelligence <= "+metier.intelligence.max+ " et ";
        strTitle += metier.charisme.min == "Non" ? "" : "charisme >= "+metier.charisme.min+ " et ";
        strTitle += metier.charisme.max == "Non" ? "" : "charisme <= "+metier.charisme.max+ " et ";
        strTitle += metier.adresse.min == "Non" ? "" : "adresse >= "+metier.adresse.min+ " et ";
        strTitle += metier.adresse.max == "Non" ? "" : "adresse <= "+metier.adresse.max+ " et ";
        strTitle += metier.force.min == "Non" ? "" : "force  >= "+metier.force.min+ " et ";
        strTitle += metier.force.max == "Non" ? "" : "force <= "+metier.force.max+ " et ";
        strTitle += ".";

        strTitle = (strTitle.length==1 ? "" : strTitle.replace(" et .","."));
        strMetier =
        "<div class='col-4' style='margin-top: -8px;'> \
            <div id='metier-"+metier.nom.id()+"' class='card card-disabled' title='"+metier.nom+"'> \
                <img class='card-img-top rounded-circle' src='img/"+metier.nom+".png' alt='"+metier.nom+"'> \
                <p style='position: absolute; left: 70px; top: 10px; font-weight: bold;'>"+metier.nom+"<br> \
                <span style='font-weight: normal; font-size: 10px; text-align: center;'>"+metier.titre+"</span></p> \
                <div style='font-size: 12px; position: relative; left: 10px; top: 10px;'>"+strConditions+"</div> \
                <button type='button' class='btn btn-info btn-origine' onclick='descMetier(\""+metier.nom+"\")' data-bs-toggle='modal' data-bs-target='#choix-modal'>Voir</button> \
            </div> \
         </div>";

         $("#metiers").append(strMetier);
    });
}

function setCompetencesMetier(choixMetier) {
    $("#c-metier>.row").empty();
    metiers.forEach(function(metier) {
        if(metier.nom==choixMetier) {
            metier.competences.naissance.forEach(function(currentCompetence) {
                competences.forEach(function(competence) {
                    if(competence.nom.toLowerCase()==currentCompetence.toLowerCase()) {
                        var nom=capitalizeFirstLetter(competence.nom);
                        strCompetence = 
                        "<div class='col-4'> \
                            <div class='form-check' style='margin-left: 10px;''> \
                                <input class='form-check-input' type='checkbox' id='"+nom+"' checked disabled> \
                                <label class='form-check-label' title='"+competence.description+"'>"+nom+"</label> \
                            </div> \
                        </div>";
            
                        $("#c-metier>.row").append(strCompetence);
                    }
                });
    });
        }
    })
}

function setGenre(genre) {
    localStorage.setItem("genre",genre);

    $("#Homme").attr("src","img/homme-disabled.svg");
    $("#Femme").attr("src","img/femme-disabled.svg");
    if(genre=="Femme") {
        $("#Femme").attr("src","img/femme.svg");
    } else {
        $("#Homme").attr("src","img/homme.svg");
    }
}

function descOrigine(choixOrigine) {

    origines.forEach(function(origine) {
        if (choixOrigine==origine.nom) {
            $(".modal-title").html(origine.nom+": "+origine.titre.toLowerCase());
            $("#modal-img").attr("src","img/"+origine.nom+".png");
            $("#modal-description").html(origine.description);
            var strComptences="";
            competences.forEach(function(competence) {
                origine.competences.naissance.forEach(function(competenceOrigine) {
                    if(competence.nom.toLowerCase()==competenceOrigine) {
                        strComptences += 
                        "<div class='row'> \
                            <div class='col-6' style='border-bottom: 1px solid black;'> \
                                <span style='font-weight: bold;'>"+competence.nom.capitalize()+"</span>: "+competence.description+" \
                            </div> \
                            <div class='col-6' style='border-bottom: 1px solid black;'> \
                                <span style='font-weight: bold;'>Utilisation:</span> "+competence.utilisation+"<br> \
                                <span style='font-weight: bold;'>Requis:</span> "+(competence.requis==undefined ? "" : competence.requis)+"<br> \
                                <span style='font-weight: bold;'>Caractéristiques:</span> "+competence.caracteristiques+"<br> \
                            </div> \
                        </div>";
                    }
                });
            });
            $("#modal-competences").html(strComptences);
            $(".modal-footer").empty();
            $(".modal-footer").append("<button type='button' class='btn btn-success' data-bs-dismiss='modal' onclick='setOrigine(\""+choixOrigine+"\")'>Choisir</button>");
            $(".modal-footer").append("<button type='button' class='btn btn-danger' data-bs-dismiss='modal'>Femer</button>");
        }
    });
}

function descMetier(choixMetier) {

    metiers.forEach(function(metier) {
        if (choixMetier==metier.nom) {
            $(".modal-title").html(metier.nom);
            $("#modal-img").attr("src","img/"+metier.nom+".png");
            $("#modal-description").html(metier.description);
            var strComptences="";
            competences.forEach(function(competence) {
                metier.competences.naissance.forEach(function(competenceMetier) {
                    if(competence.nom.toLowerCase()==competenceMetier.toLowerCase()) {
                        strComptences += 
                        "<div class='row'> \
                            <div class='col-6' style='border-bottom: 1px solid black;'> \
                                <span style='font-weight: bold;'>"+competence.nom.capitalize()+"</span>: "+competence.description+" \
                            </div> \
                            <div class='col-6' style='border-bottom: 1px solid black;'> \
                                <span style='font-weight: bold;'>Utilisation:</span> "+competence.utilisation+"<br> \
                                <span style='font-weight: bold;'>Requis:</span> "+(competence.requis==undefined ? "" : competence.requis)+"<br> \
                                <span style='font-weight: bold;'>Caractéristiques:</span> "+competence.caracteristiques+"<br> \
                            </div> \
                        </div>";
                    }
                });
            });
            $("#modal-competences").html(strComptences);
            $(".modal-footer").empty();
            $(".modal-footer").append("<button type='button' class='btn btn-success' data-bs-dismiss='modal' onclick='setMetier(\""+choixMetier+"\")'>Choisir</button>");
            $(".modal-footer").append("<button type='button' class='btn btn-danger' data-bs-dismiss='modal'>Femer</button>");
        }
    });
}