String.prototype.id = function () {
    var str = this.valueOf();

    return str.replace(' ','-').toLowerCase();
};

String.prototype.capitalize = function () {
    var str = this.valueOf();

    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

var pj = {};

function caractD6(caract) {
    result=7+Math.ceil(Math.random()*6);
    $("#"+caract).val(result);
    $("#"+caract).next().prop("disabled",true);

    verifOrigine();
    verifMetier();
}

function destinD4() {
    result=Math.ceil(Math.random()*4)-1;
    $("#destin").val(result);
    $("#destin").next().prop("disabled",true);
}

function fortuneD6() {
    result=10*(Math.ceil(Math.random()*6)+Math.ceil(Math.random()*6));
    $("#fortune").val(result);
    $("#fortune").next().prop("disabled",true);
}


function setOrigine(choix) {
    isEnabled = $("#origine-"+choix.id()).hasClass('card-enabled');
    if (isEnabled) {
        $("#imgPerso").attr("src","img/"+choix+".png");
        $("#typePerso").html(choix);
        $("#metier").show();
        $("#origine").val(choix);
        //setCompetencesOrigine(choix);

        origines.forEach(function(origine) {
            if(choix==origine.nom) {
                $("#attaque").val(origine.attaque);
                $("#parade").val(origine.parade);
                $("#ev").val(origine.ev);
                $("#ea").val(origine.ea);
            }
        });

        listeOrigine();
        verifOrigine();
    }
}

function setMetier(pjMetier) {
    isEnabled = $("#metier-"+metier.id()).hasClass('card-enabled');
    if (isEnabled) {
        /*$("#imgPerso").attr("src","img/"+origine+".png");
        $("#typePerso").html(origine);
        $("#metier").show();*/
        $("#metier").val(pjMetier);
        //setCompetencesMetier(metier);
        var metier = metiers.find(i => i.nom===pjMetier);
        listeMetier();
        verifMetier();
    }
}

function verifOrigine() {
    var courage=$("#courage").val(),
    charisme=$("#charisme").val(),
    force=$("#force").val(),
    intelligence=$("#intelligence").val(),
    adresse=$("#adresse").val();
    var caracteristiques=["courage","charisme","force","intelligence","adresse"];

    origines.forEach(function(origine) {
        isEnabled=true;
        /*caracteristiques.forEach(function(caracteristique) {

        });*/
        if(courage<origine.courage.min) isEnabled=false;
        if(courage>origine.courage.max) isEnabled=false;
        if(force<origine.force.min) isEnabled=false;
        if(force>origine.force.max) isEnabled=false;
        if(intelligence<origine.intelligence.min) isEnabled=false;
        if(intelligence>origine.intelligence.max) isEnabled=false;
        if(adresse<origine.adresse.min) isEnabled=false;
        if(adresse>origine.adresse.max) isEnabled=false;
        if(charisme<origine.charisme.min) isEnabled=false;
        if(charisme>origine.charisme.max) isEnabled=false;

        $("#origine-"+origine.nom.id()+">button").prop("disabled",true);
        if (isEnabled) {
            $("#origine-"+origine.nom.id()).removeClass("card-disabled");
            $("#origine-"+origine.nom.id()).addClass("card-enabled");
            $("#origine-"+origine.nom.id()+">button").prop("disabled",false);
        }
    });
}

function verifMetier() {
    var courage=$("#courage").val(),
    charisme=$("#charisme").val(),
    force=$("#force").val(),
    intelligence=$("#intelligence").val(),
    adresse=$("#adresse").val();

    metiers.forEach(function(metier) {
        isEnabled=true;
        /*caracteristiques.forEach(function(caracteristique) {

        });*/
        if(courage<metier.courage.min) isEnabled=false;
        if(courage>metier.courage.max) isEnabled=false;
        if(force<metier.force.min) isEnabled=false;
        if(force>metier.force.max) isEnabled=false;
        if(intelligence<metier.intelligence.min) isEnabled=false;
        if(intelligence>metier.intelligence.max) isEnabled=false;
        if(adresse<metier.adresse.min) isEnabled=false;
        if(adresse>metier.adresse.max) isEnabled=false;
        if(charisme<metier.charisme.min) isEnabled=false;
        if(charisme>metier.charisme.max) isEnabled=false;

        if (isEnabled) {
            $("#metier-"+metier.nom.id()).removeClass("card-disabled");
            $("#metier-"+metier.nom.id()).addClass("card-enabled");
        }
    });
}

function savePJ() {
    pj.nom = $("#nomPerso").val();
    pj.origine = $("#origine").val();
    pj.metier = $("#metier").val();
    pj.description = $("#presentation").val();
    pj.courage = $("#courage").val();
    pj.charisme = $("#charisme").val();
    pj.intelligence = $("#intelligence").val();
    pj.force = $("#force").val();
    pj.adresse = $("#adresse").val();
    pj.ev = $("#ev").val();
    pj.ea = $("#ea").val();
    pj.attaque = $("#attaque").val();
    pj.parade = $("#parade").val();
    //pj.pr = $("#pr").val();
    pj.fortune = $("#fortune").val();
    pj.destin = $("#destin").val();

    if($("#Homme").attr("src")=="img/homme-disabled.svg") {
        pj.genre="Homme";
    } else {
        pj.genre="Femme";
    }

    localStorage.setItem("pj",JSON.stringify(pj));
    $("#nomPerso").prop("disabled",true);
}

function exportPJ() {
    pj = JSON.parse(localStorage.getItem("pj"));

    /*pj.nom=localStorage.getItem("nom");
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
    pj.parade=localStorage.getItem("parade");*/

    let dataStr = JSON.stringify(pj);
    let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

    let exportFileDefaultName = pj.nom+'.json';

    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

function initPerso() {
    pj = JSON.parse(localStorage.getItem("pj"));

    $("#nomPerso").val(pj.nom);
    $("#ea").val(pj.ea);
    $("#ev").val(pj.ev);
    $("#attaque").val(pj.attaque);
    $("#parade").val(pj.parade);
    $("#destin").val(pj.destin);
    $("#fortune").val(pj.fortune);
    $("#courage").val(pj.courage);
    $("#force").val(pj.force);
    $("#intelligence").val(pj.intelligence);
    $("#adresse").val(pj.adresse);
    $("#charisme").val(pj.charisme);
    $("#origine").val(pj.origine);
    $("#metier").val(pj.metier);

    setGenre(pj.genre);
    //$("#nomPerso").prop("disabled",true);
    listeOrigine();
    verifOrigine();
    setCompetencesOrigine(pj.origine);
    //setOrigine(pj.origine);
    listeMetier();
    verifMetier();
    setCompetencesMetier(pj.metier);
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
        var pj=JSON.parse(jsonPerso);
        localStorage.setItem("pj",jsonPerso);
        initPerso();
        console.info(pj);
    }; 
    fileReader.onerror = function() {
      alert(fileReader.error);
    }; 
});

function nouveauPJ(){
    $("#nomPerso").val("");
    $("#ea").val(0);
    $("#ev").val(25);
    $("#attaque").val(8);
    $("#parade").val(10);
    $("#destin").val(0);
    $("#fortune").val(0);
    $("#courage").val(7);
    $("#force").val(7);
    $("#intelligence").val(7);
    $("#adresse").val(7);
    $("#charisme").val(7);
    $("#origine").val("");
    $("#metier").val("");

    listeOrigine();
    listeMetier();

    //$("#nomPerso").prop("disabled",true);
}

function listeOrigine() {
    $("#origines").empty();

    var pjOrigine = $("#origine").val();
    if (pjOrigine == "") {
        $("#origines").append("<h3>Origines</h3>");
        origines.forEach(function(origine) {
            strConditions  = '';
            strConditions += origine.courage.min == 0 ? "" : "<span>Courage >= "+origine.courage.min+ "</span><br>";
            strConditions += origine.courage.max == 99 ? "" : "<span>Courage <= "+origine.courage.max+ "</span><br>";
            strConditions += origine.intelligence.min == 0 ? "" : "<span>Intelligence >= "+origine.intelligence.min+ "</span><br>";
            strConditions += origine.intelligence.max == 99 ? "" : "<span>Intelligence <= "+origine.intelligence.max+ "</span><br>";
            strConditions += origine.charisme.min == 0 ? "" : "<span>Charisme >= "+origine.charisme.min+ "</span><br>";
            strConditions += origine.charisme.max == 99 ? "" : "<span>Charisme <= "+origine.charisme.max+ "</span><br>";
            strConditions += origine.adresse.min == 0 ? "" : "<span>Adresse >= "+origine.adresse.min+ "</span><br>";
            strConditions += origine.adresse.max == 99 ? "" : "<span>Adresse <= "+origine.adresse.max+ "</span><br>";
            strConditions += origine.force.min == 0 ? "" : "<span>Force >= "+origine.force.min+ "</span><br>";
            strConditions += origine.force.max == 99 ? "" : "<span>Force <= "+origine.force.max+ "</span><br>";
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
    } else {
        $("#origines").append("<h3>Origine</h3>");
        var origine = origines.find(i => i.nom===pjOrigine);
        strOrigine =
        "<div class='col-12' style='margin-top: -8px;'> \
            <div id='origine-"+origine.nom.id()+"' class='card card-disabled' title='"+origine.nom+"'> \
                <img class='card-img-top rounded-circle' src='img/"+origine.nom+".png' alt='"+origine.nom+"'> \
                <p style='position: absolute; left: 70px; top: 10px;'><span style='font-weight: bold;'>"+origine.nom+": </span> "+origine.titre+"<br> \
            </div> \
        </div>";
        $("#origines").append(strOrigine);
    }
}

function setCompetencesOrigine(pjOrigine) {
    $("#c-origine>.row").empty();
    var origine = origines.find(i => i.nom===pjOrigine);

    $("#presentation").val(origine.presentation);
    origine.competences.naissance.forEach(function(currentCompetence) {
        var competence = competences.find(i => i.nom.toLowerCase()===currentCompetence.toLowerCase());

        if(competence.nom.toLowerCase()==currentCompetence.toLowerCase()) {
            var nom=capitalizeFirstLetter(competence.nom);
            strCompetence = 
            "<p style='margin-left: 10px; width: 95%;'> \
                    <span style='font-weight: bold'>"+nom+": </span> \
                    <span>"+competence.resume+"</span> \
            </p>";
            $("#origine-"+origine.nom.id()).append(strCompetence);
            $("#origine-"+origine.nom.id()).css("height", "unset");
        }
    });
}

function listeMetier() {
    $("#metiers").empty();

    var pjMetier= $("#metier").val();
    if (pjMetier == "") {
        $("#metiers").append("<h3>Metiers</h3>");
        metiers.forEach(function(metier) {
            strTitle  = metier.courage.min == 0 ? "" : "courage >= "+metier.courage.min+ " et ";
            strTitle += metier.courage.max == 99 ? "" : "courage <= "+metier.courage.max+ " et ";
            strTitle += metier.intelligence.min == 0 ? "" : "intelligence >= "+metier.intelligence.min+ " et ";
            strTitle += metier.intelligence.max == 99 ? "" : "intelligence <= "+metier.intelligence.max+ " et ";
            strTitle += metier.charisme.min == 0 ? "" : "charisme >= "+metier.charisme.min+ " et ";
            strTitle += metier.charisme.max == 99 ? "" : "charisme <= "+metier.charisme.max+ " et ";
            strTitle += metier.adresse.min == 0 ? "" : "adresse >= "+metier.adresse.min+ " et ";
            strTitle += metier.adresse.max == 99 ? "" : "adresse <= "+metier.adresse.max+ " et ";
            strTitle += metier.force.min == 0 ? "" : "force  >= "+metier.force.min+ " et ";
            strTitle += metier.force.max == 99 ? "" : "force <= "+metier.force.max+ " et ";
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
    } else {
        $("#metiers").append("<h3>Metier</h3>");
        var metier = metiers.find(i => i.nom===pjMetier);
        strMetier =
        "<div class='col-12' style='margin-top: -8px;'> \
            <div id='metier-"+metier.nom.id()+"' class='card card-disabled' title='"+metier.nom+"'> \
                <img class='card-img-top rounded-circle' src='img/"+metier.nom+".png' alt='"+metier.nom+"'> \
                <p style='position: absolute; left: 70px; top: 10px;'><span style='font-weight: bold;'>"+metier.nom+": </span> "+metier.titre+"<br> \
            </div> \
        </div>";
        $("#metiers").append(strMetier);
    }
}

function setCompetencesMetier(pjMetier) {
    $("#c-metier>.row").empty();
    var metier = metiers.find(i => i.nom===pjMetier);

    metier.competences.naissance.forEach(function(metierCompetence) {
        var competence = competences.find(i => i.nom.toLowerCase()===metierCompetence.toLowerCase());

        if(competence.nom.toLowerCase()==metierCompetence.toLowerCase()) {
            var nom=capitalizeFirstLetter(competence.nom);
            strCompetence = 
            "<p style='margin-left: 10px; width: 95%;'> \
                    <span style='font-weight: bold'>"+nom+": </span> \
                    <span>"+competence.resume+"</span> \
            </p>";
    
            $("#metier-"+metier.nom.id()).append(strCompetence);
            $("#metier-"+origine.nom.id()).css("height", "unset");
        }
    });
}

function setGenre(genre) {

    $("#Homme").attr("src","img/homme-disabled.svg");
    $("#Femme").attr("src","img/femme-disabled.svg");
    if(genre=="Femme") {
        $("#Femme").attr("src","img/femme.svg");
    } else {
        $("#Homme").attr("src","img/homme.svg");
    }
    $("#Homme").prop("disbaled",true);
    $("#Femme").prop("disbaled",true);
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