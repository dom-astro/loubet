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
    var courage=+$("#courage").val();
    var force=+$("#force").val();
    var intelligence=+$("#intelligence").val();
    var adresse=+$("#adresse").val();
    var charisme=+$("#charisme").val();
    var rm = (courage+force+intelligence)/3;
    $("#rm").val(Math.ceil(rm));

    if (courage>7 && force>7 && intelligence>7 && adresse>7 && charisme>7) {
        $('#btn-valider').prop("disabled",false);
    }
}

function destinD4() {
    result=Math.ceil(Math.random()*4)-1;
    $("#destin").val(result);
    $("#destin").next().prop("disabled",true);
    $('#btn-valider').prop("disabled",false);
}

function fortuneD6() {
    result=10*(Math.ceil(Math.random()*6)+Math.ceil(Math.random()*6));
    $("#fortune").val(result);
    $("#fortune").next().prop("disabled",true);
    $('#btn-valider').prop("disabled",false);
}


function setOrigine(choix) {
    isEnabled = $("#origine-"+choix.id()).hasClass('card-enabled');
    if (isEnabled) {
        $("#imgPerso").attr("src","img/"+choix+".png");
        $("#typePerso").html(choix);
        $("#metier").show();
        $("#origine").val(choix);

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
        validation("origine");
    }
}

function setMetier(pjMetier) {
    isEnabled = $("#metier-"+pjMetier.id()).hasClass('card-enabled');
    if (isEnabled) {
        /*$("#imgPerso").attr("src","img/"+origine+".png");
        $("#typePerso").html(origine);
        $("#metier").show();*/
        $("#metier").val(pjMetier);
        //setCompetencesMetier(metier);
        var metier = metiers.find(i => i.nom===pjMetier);
        listeMetier();
        verifMetier();
        validation("metier");
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
    pj.genre = $("#genre").html();
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
    pj.rm = $("#rm").val();
    pj.fortune = $("#fortune").val();
    pj.destin = $("#destin").val();
    pj.xp=0;
    pj.niveau=1;

/*if($("#Homme").attr("src")=="img/homme-disabled.svg") {
        pj.genre="Homme";
    } else {
        pj.genre="Femme";
    }*/

    localStorage.setItem("pj",JSON.stringify(pj));
    $("#nomPerso").prop("disabled",true);
}

function exportPJ() {
    pj = JSON.parse(localStorage.getItem("pj"));

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
    $("#rm").val(pj.rm);
    $("#xp").val(pj.xp);
    $("#niveau").val(pj.niveau);

    setGenre(pj.genre.toLowerCase());
    //$("#nomPerso").prop("disabled",true);
    listeOrigine();
    verifOrigine();
    setCompetencesOrigine(pj.origine);
    //setOrigine(pj.origine);
    listeMetier();
    verifMetier();
    setCompetencesMetier(pj.metier);
}

function initGenre() {
    $("#femme").remove();
    $("#homme").remove();
    $("#genre").remove();
    $("#imgPerso").remove();

    strImgFemme = "<img id='homme' src='img/homme.svg'  width='32px' alt='Homme' title='Homme' onclick='setGenre(\"homme\")' style='margin-top: 5px; margin-left: -28px;'></img>";
    strImgHomme = "<img id='femme' src='img/femme.svg'  width='32px' alt='Femme' title='Femme' onclick='setGenre(\"femme\")' style='margin-top: 5px;margin-left: 5px;'></img>";
    strGenre = "<span id='genre' style='font-weight: bold; font-size: 18px; position: relative; top: 5px;'></span>";
    strImgPerso = "<img id='imgPerso' class='card-img-top rounded-circle' src='img/pj.png' alt='Card image' style='width: 100px; height: 90px; position: relative; left: -20px; top:10px'></img>";
    $("#desc-genre").append(strImgFemme);
    $("#desc-genre").append(strImgHomme);
    $("#desc-genre").append(strGenre);
    $("#desc-genre").append(strImgPerso);
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
    $("#presentation").val("");

    //listeOrigine();
    $("#origines").hide();
    //listeMetier();
    $("#metiers").hide();

    // Genre
    initGenre();

    $("#aide").show();
    aide("nom");
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
        setCompetencesOrigine(pjOrigine);
    }
}

function setCompetencesOrigine(pjOrigine) {
    $("#c-origine>.row").empty();
    var origine = origines.find(i => i.nom===pjOrigine);

    $("#presentation").val(origine.description);
    origine.competences.naissance.forEach(function(currentCompetence) {
        var competence = competences.find(i => i.nom.toLowerCase()===currentCompetence.toLowerCase());

        competence = (competence== undefined ? {nom: "none"} : competence);
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
            strConditions  = metier.courage.min == 0 ? "" : "courage >= "+metier.courage.min+ " et ";
            strConditions += metier.courage.max == 99 ? "" : "courage <= "+metier.courage.max+ " et ";
            strConditions += metier.intelligence.min == 0 ? "" : "intelligence >= "+metier.intelligence.min+ " et ";
            strConditions += metier.intelligence.max == 99 ? "" : "intelligence <= "+metier.intelligence.max+ " et ";
            strConditions += metier.charisme.min == 0 ? "" : "charisme >= "+metier.charisme.min+ " et ";
            strConditions += metier.charisme.max == 99 ? "" : "charisme <= "+metier.charisme.max+ " et ";
            strConditions += metier.adresse.min == 0 ? "" : "adresse >= "+metier.adresse.min+ " et ";
            strConditions += metier.adresse.max == 99 ? "" : "adresse <= "+metier.adresse.max+ " et ";
            strConditions += metier.force.min == 0 ? "" : "force  >= "+metier.force.min+ " et ";
            strConditions += metier.force.max == 99 ? "" : "force <= "+metier.force.max+ " et ";
            strConditions += ".";

            strConditions = (strConditions.length==1 ? "" : strConditions.replace(" et .","."));
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
        setCompetencesMetier(pjMetier);
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
            $("#metier-"+metier.nom.id()).css("height", "unset");
        }
    });
}

function enableGenre(genre, isEnabled) {
    $("#"+genre).attr("src","img/"+genre+"-disabled.svg");
    
    if(isEnabled) {
        $("#"+genre).attr("src","img/"+genre+".svg");
        //$("#"+genre).prop("disbaled", false);
    }

}

function setGenre(genre) {
    if(genre=="homme") {
        $("#homme").attr("src","img/homme.svg");
        $("#femme").attr("src","img/femme-disabled.svg");
    } else {
        $("#homme").attr("src","img/homme-disabled.svg");
        $("#femme").attr("src","img/femme.svg");
    }
    pj.genre=genre;
    $('#btn-valider').prop("disabled",false);
    $("#genre").html(genre.capitalize());
}

function descOrigine(choixOrigine) {

    var origine = origines.find(i => i.nom===choixOrigine);

//    origines.forEach(function(origine) {
//        if (choixOrigine==origine.nom) {
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
//        }
//    });
}

function descMetier(choixMetier) {
    var metier = metiers.find(i => i.nom===choixMetier);

//    metiers.forEach(function(metier) {
//        if (choixMetier==metier.nom) {
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
//        }
//    });
}

function aide(etape) {
    $("#aide-texte").empty();

    switch(etape) {
        case "nom":
            $("#aide-texte").append("<p class='aide'><span class='bold'>Première étape:</span> on choisit un nom.</p>")
            break;
        case "genre":
            $("#aide-texte").append("<p class='aide'><span class='bold'>Deuxième étape:</span> choisissez le genre de \
            votre personnage.</p>");
            break;
        case "caracteristique":
            $("#aide-texte").append("<p class='aide'><span class='bold'>Troisième étape:</span> obtenez vos caractéristiques \
            principales en tirant un d6.</p>");
            break;
        case "destin":
            $("#aide-texte").append("<p class='aide'><span class='bold'>Quatrième étape:</span> obtenez vos points du destin.</p>");
            break;
        case "fortune":
            $("#aide-texte").append("<p class='aide'><span class='bold'>Cinquième étape:</span> héritez de votre fortune.</p>");
            break;
        case "origine":
            $("#aide-texte").append("<p class='aide'><span class='bold'>Sixième étape:</span> choisissez votre origine.</p>");
            $("#origines").show();
            listeOrigine();
            verifOrigine();
            break;
        case "metier":
            $("#aide-texte").append("<p class='aide'><span class='bold'>Septième étape:</span> choisissez votre métier.</p>");
            $("#metiers").show();
            listeMetier();
            verifMetier();
            break;
    }
    $("#aide-texte").append("<button id='btn-valider' type='button' class='btn btn-success' style='float: right; margin-right: 20px;' \
    onclick='validation(\""+etape+"\")' disabled>Valider</button>")
}

function validation(etape) {
    switch(etape) {
        case "nom":
            var nom = $('#nomPerso').val();
            $('#nomPerso').prop("disbaled",true);
            if (nom.length>=3) {
                pj.nom=nom;
                aide("genre");
            }
            break;
        case "genre":
            $("#femme").remove();
            $("#homme").remove();
            strImg = "<img id='"+pj.genre+"' src='img/"+pj.genre+".svg'  width='32px' alt='"+pj.genre.capitalize()+"' \
            title='"+pj.genre.capitalize()+"' \
            style='margin-top: 5px; margin-left: -28px;'></img>";
            $("#genre").parent().prepend(strImg);
       
            aide("caracteristique");
            break;
        case "caracteristique":
            //$("adresse").attr("disabled","disabled");
            $("#adresse").prop("disabled",true);
            aide("destin");
            break;
        case "destin":
            aide("fortune");
            break;
        case "fortune":
            aide("origine");
            break;
        case "origine":
            aide("metier");
            break;
        case "metier":
            $("#aide").hide();
            break;
    }
}


function verifNom() {
    var nom = $('#nomPerso').val();
    $('#btn-valider').prop("disabled",true);
    if (nom.length>=3) {
        $('#btn-valider').prop("disabled",false);
    }
}