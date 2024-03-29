driver = new Driver({
    allowClose: false,
});

function aideCreationPJ() {
    driver.defineSteps([
        {
            element: '#nom',
            popover: {
                title: 'Choisir son Nom',
                description: 'Le nom doit avoir au minimum 3 caractères.<br><br>  \
                <em>- Un nom c\'est important, il nous suit toute notre vie!</em><br><br> \
                <img id="imgPerso" class="card-img-top rounded-circle" src="img/pj.png" alt="Card image" style="width: 50px; height: 45px; position: relative; top: -10px"!>\
                <span style="position: relative; left: 10px;">Emile Grosçon, inventeur de la cédille.</span>',
                position: 'right'
            }
        },
        {
            element: '#desc-genre',
            popover: {
                title: 'Choisir son genre',
                description: 'Homme, Femme ou Hermaphrodite?',
                position: 'right'
            }
        },
        {
            element: '#g-adresse',
            popover: {
                title: 'Jet de D6 pour votre adresse',
                description: "La plupart des actions risquées entreprises par un héros nécessitent une épreuve d'adresse.",
                position: 'right'
            }
        },
        {
            element: '#g-charisme',
            popover: {
                title: 'Jet de D6 pour votre charisme',
                description: "Représente l'apparence du héros et son « aura », prestigieuse ou non...",
                position: 'right'
            }
        },
        {
            element: '#g-courage',
            popover: {
                title: 'Jet de D6 pour votre courage',
                description: "Détermine qui frappe le premier dans un combat.",
                position: 'right'
            }
        },
        {
            element: '#g-force',
            popover: {
                title: 'Jet de D6 pour votre force',
                description: "Permet notament de défoncer une porte, pas de la réparer",
                position: 'right'
            }
        },
        {
            element: '#g-intelligence',
            popover: {
                title: 'Jet de D6 pour votre intelligence',
                description: "Pour trouver son chemin dans un labyrinthe, entre autre...",
                position: 'right'
            }
        },
        {
            element: '#g-destin',
            popover: {
                title: 'Jet de D4 pour connaitre votre destin',
                description: "Avec des si, on ne serait pas mort...<br> \
                Marche aussi avec un point du destin!",
                position: 'right'
            }
        },
        {
            element: '#g-fortune',
            popover: {
                title: 'Jet de 2D6x10 pour votre fortune',
                description: "Héritez de votre fortune ou... méritez la un peu plus tard!",
                position: 'right'
            }
        },
        {
            element: '#origines',
            popover: {
                title: 'Choisir son origine',
                description: "L'origine de votre personnage est fonction des vos caractéristiques \
                et déterminera vos compétences naturelles.",
                position: 'top'
            }
        },
        {
            element: '#metiers',
            popover: {
                title: 'Choisir son métier',
                description: "Un métier vous permet d'acquérir de nouvelles compétences.",
                position: 'top'
            }
        }
    ]);
    driver.start();
}

function nouveauPJ() {
    $("#nom").val("");
    $("#genre").val("");
    $("#presentation").val("");

    $("#courage").val(7);
    $("#force").val(7);
    $("#intelligence").val(7);
    $("#adresse").val(7);
    $("#charisme").val(7);

    $("#origine").val("");
    $("#metier").val("");

    $("#destin").val(0);
    $("#fortune").val(0);

    //$("#attaque").val(8);
    //$("#parade").val(10);

    //$("#ea").val(0);
    //$("#ev").val(25);

    $("#niveau").val(1);
    $("#xp").val(0);

    $("#adresse").next().prop("disabled", false);
    $("#charisme").next().prop("disabled", false);
    $("#courage").next().prop("disabled", false);
    $("#force").next().prop("disabled", false);
    $("#intelligence").next().prop("disabled", false);

    $("#classes").empty();
    $("#classes").append('<h3 style="margin-left: 5px;">Origine et métier</h3>');
    $("#classes").hide();

}

function initGenre() {
    $("#femme").remove();
    $("#homme").remove();
    $("#genre").remove();
    $("#imgPerso").remove();

    strImgFemme = "<img id='homme' src='img/homme.svg'  width='32px' alt='Homme' title='Homme' onclick='setGenre(\"homme\")' style='margin-top: 5px; margin-left: -28px;'></img>";
    strImgHomme = "<img id='femme' src='img/femme.svg'  width='32px' alt='Femme' title='Femme' onclick='setGenre(\"femme\")' style='margin-top: 5px;margin-left: 5px;'></img>";
    strGenre = "<span id='genre' style='font-weight: bold; font-size: 18px; position: relative; top: 5px; left: 5px;'></span>";
    strImgPerso = "<img id='imgPerso' class='card-img-top rounded-circle' src='img/pj.png' alt='Card image' style='width: 100px; height: 90px; position: relative; left: -40px; top:10px'></img>";
    $("#desc-genre").append(strImgFemme);
    $("#desc-genre").append(strImgHomme);
    $("#desc-genre").append(strGenre);
    //$("#desc-genre").append(strImgPerso);
}

function verifNom() {
    var nom = $('#nom').val();
    $('#btn-valider').prop("disabled", true);
    if (nom.length >= 3) {
        $('#btn-valider').prop("disabled", false);
    }
}

function setGenre(genre) {
    if (genre == "homme") {
        $("#homme").attr("src", "img/homme.svg");
        $("#femme").attr("src", "img/femme-disabled.svg");
    } else {
        $("#homme").attr("src", "img/homme-disabled.svg");
        $("#femme").attr("src", "img/femme.svg");
    }
    pj.genre = genre;
    $('#btn-valider').prop("disabled", false);
    $("#genre").html(genre.capitalize());
}

function caractD6(caract) {
    result = 7 + Math.ceil(Math.random() * 6);
    $("#" + caract).val(result);
    $("#" + caract).next().prop("disabled", true);

    //verifOrigine();
    //verifMetier();
    var courage = +$("#courage").val();
    var force = +$("#force").val();
    var intelligence = +$("#intelligence").val();
    var adresse = +$("#adresse").val();
    var charisme = +$("#charisme").val();
    var rm = (courage + force + intelligence) / 3;
    $("#rm").val(Math.ceil(rm));

    if (courage > 7 && force > 7 && intelligence > 7 && adresse > 7 && charisme > 7) {
        $('#btn-valider').prop("disabled", false);
        listeOrigine();
    };    
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


function listeOrigine() {
    $("#origines").empty();
    $("#origines").show();
    $("#origines").append("<h3>Choix de l'origine</h3>");

    origines.forEach(function(origine) {
        let cardOrigine = new Classe("origine", origine);
        cardOrigine.appendCard();
    });
}

function listeMetier() {
    $("#metiers").empty();
    $("#metiers").show();
    $("#metiers").append("<h3>Choix du métier</h3>");

    metiers.forEach(function(metier) {
        let cardMetier = new Classe("metier", metier);
        cardMetier.appendCard();
    });

};

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

function savePJ() {
    pj.nom = $("#nom").val();
    pj.genre = $("#genre").html();
    pj.origine = $("#origine").val();
    pj.metier = $("#metier").val();
    pj.description = $("#presentation").val();

    pj.adresse =+ $("#adresse").val();
    pj.charisme = +$("#charisme").val();
    pj.courage = +$("#courage").val();
    pj.force = +$("#force").val();
    pj.intelligence = +$("#intelligence").val();

    pj.ev = +$("#ev").val();
    pj.ea = +$("#ea").val();
    pj.attaque = +$("#attaque").val();
    pj.parade = +$("#parade").val();
    pj.rm = +$("#rm").val();

    pj.fortune = +$("#fortune").val();
    pj.destin = +$("#destin").val();

    pj.xp=0;
    pj.niveau=1;

    pj.save();
}