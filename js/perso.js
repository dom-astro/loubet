function caractD6(caract) {
    result=7+Math.ceil(Math.random()*6);
    $("#"+caract).val(result);
    $("#"+caract).next().prop("disabled",true);

    localStorage.setItem(caract,result);
    verifOrigine();
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
    verifOrigine();
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

function origine(origine) {
    isEnabled = $("#"+origine).hasClass('card-enabled');
    if (isEnabled) {
        $("#imgPerso").attr("src","img/"+origine+".png");
        $("#typePerso").html(origine);
        $("#metier").show();

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

function verifOrigine() {
    var courage=localStorage.getItem("courage"),
    charisme=localStorage.getItem("charisme"),
    force=localStorage.getItem("force"),
    intelligence=localStorage.getItem("intelligence"),
    adresse=localStorage.getItem("adresse");

    // Barbare
    if(force>=13 && courage>=12) {
        $("#Barbare").removeClass("card-disabled");
        $("#Barbare").addClass("card-enabled");
    } else {
        $("#Barbare").removeClass("card-enabled");
        $("#Barbare").addClass("card-disabled");
    }
    // Elfe
    if(charisme>=10 && adresse>=11) {
        $("#Elfe").removeClass("card-disabled");
        $("#Elfe").addClass("card-enabled");
    } else {
        $("#Elfe").removeClass("card-enabled");
        $("#Elfe").addClass("card-disabled");
    }
    // Magicienne
    if(intelligence>=12) {
        $("#Magicienne").removeClass("card-disabled");
        $("#Magicienne").addClass("card-enabled");
    } else {
        $("#Magicienne").removeClass("card-enabled");
        $("#Magicienne").addClass("card-disabled");
    }
    // Menestrel
    if(adresse>=11 && charisme>=12) {
        $("#Menestrel").removeClass("card-disabled");
        $("#Menestrel").addClass("card-enabled");
    } else {
        $("#Menestrel").removeClass("card-enabled");
        $("#Menestrel").addClass("card-disabled");
    }
    // Nain
    if(force>=12 && courage>=11) {
        $("#Nain").removeClass("card-disabled");
        $("#Nain").addClass("card-enabled");
    } else {
        $("#Nain").removeClass("card-enabled");
        $("#Nain").addClass("card-disabled");
    }
    // Ogre
    if(force>=13 && intelligence<=9 && adresse<=11 && charisme<=10) {
        $("#Ogre").removeClass("card-disabled");
        $("#Ogre").addClass("card-enabled");
    } else {
        $("#Ogre").removeClass("card-enabled");
        $("#Ogre").addClass("card-disabled");
    }
    // Ranger
    if(adresse>=10 && charisme>=10) {
        $("#Ranger").removeClass("card-disabled");
        $("#Ranger").addClass("card-enabled");
    } else {
        $("#Ranger").removeClass("card-enabled");
        $("#Ranger").addClass("card-disabled");
    }
    // Voleur
    if(adresse>=12) {
        $("#Voleur").removeClass("card-disabled");
        $("#Voleur").addClass("card-enabled");
    } else {
        $("#Voleur").removeClass("card-enabled");
        $("#Voleur").addClass("card-disabled");
    }
}

function setAttaque() {

}