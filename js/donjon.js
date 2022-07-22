function write(id) {
    jsonParagraphe=loubet[id-1];
    $("#texte").empty();
    var strParagraphe='<div id="paragraphe">'+id+'</div>';
    $("#texte").append(strParagraphe);
    $("#texte").append("<br><br>");

    jsonParagraphe.paragraphe.forEach(function(data) {

        strParagraphe="<p>"+formatParagraphe(data.ligne)+"</p>";

        $("#texte").append(strParagraphe);
    });

    localStorage.setItem("paragraphe",id);
}


function formatParagraphe(ligne) {
    var strLigne="<p>";
    let pos=ligne.indexOf("paragraphe")+11;
    let action=ligne.substring(pos);
    let id=action.split(" ")[0];

    if(!isNaN(id)) {
        ligne=ligne.replace(id,'<a href="javascript:write('+id+')">'+id+'</a>');
        ligne=capitalizeFirstLetter(ligne);
    }

    return ligne;
}

function goTo() {
    write($("#numParagraphe").val());
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

$('.listPerso').click(function(event) {
    var desc="";
    var perso=event.target.innerHTML;
    var ev=0;

    localStorage.setItem("perso",perso);
    switch(perso) {
        case "Barbare":
            desc="Le Barbare est le stéréotype du tas de muscle sans cervelle.";
            ev=35;
            break;
        case "Elfe":
            desc="L'Elfe est naïve et stupide et représente le stéréotype des blondes.";
            ev=25;
            break;
        case "Magicienne":
            desc="La Magicienne est intelligente mais avec un mauvais sens de l'orientation.";
            ev=30;
            break;
        case "Menestrel":
            desc="Musicien poète qui préfère le chant des cigalles au bruit des os cassés.";
            ev=35;
            break;
        case "Nain":
            desc="Le Nain est le stéréotype du radin grincheux égoïste qui et le plus souvent méchant avec les autres.";
            ev=35;
            break;
        case "Ogre":
            desc="L'Ogre est une créature très simple d'esprit adorant manger tout et n'importe quoi comme la musique et ceux qui la joue, parfois.";
            ev45;
            break;
        case "Ranger":
            desc="Le Ranger est un leader lâche et incompétent mais fier.";
            ev=30;
            break;
        case "Voleur":
            desc="Le Voleur est un personnage très lâche essayant plus que tout d'éviter de se battre et de fuir.";
            ev=30;
            break;
    }

    $("#typePerso").text(perso);
    $("#imgPerso").attr("src", "img/"+perso+".png");
    $("#ev").val(ev);
    localStorage.setItem("ev",ev);
    localStorage.setItem("perso",perso);

    //$("#descPerso").text(desc);
    
});

function caractD6(caract) {
    result=7+Math.ceil(Math.random()*6);
    $("#"+caract).val(result);
    $("#"+caract).next().prop("disabled",true);

    localStorage.setItem(caract,result);
    verifIsToSave();
}

function destinD4() {
    result=Math.ceil(Math.random()*4)-1;
    $("#destin").val(result);
    $("#destin").next().prop("disabled",true);

    localStorage.setItem("destin",result);
    verifIsToSave();
}

function savePJ() {
    $("#choixPerso").hide();
    localStorage.setItem("nom",$("#nomPerso").val());
    $("#nomPerso").prop("disabled",true);
    localStorage.setItem("ea",$("#ea").val());
    localStorage.setItem("attaque",$("#attaque").val());
    localStorage.setItem("parade",$("#parade").val());
    localStorage.setItem("destin",$("#destin").val());

    write(1);
}

function verifIsToSave() {
    var isToSave=true;
    $(".caract-btn").each(function(data) {
        isToSave = isToSave && $(this).prop("disabled");
    });

    if($("#nomPerso").val().length<3) {
        isToSave=false;
    }

    if(isToSave) {
        $(".btn-svg").removeAttr("disabled");
    }
}

function initDonjon() {
    var id = localStorage.getItem('paragraphe');

    if(id>0) 
    {
        $("#choixPerso").hide();
        $(".btn-svg").hide();
        $(".caract-btn").text("D20");

        let perso=localStorage.getItem("perso");

        $("#nomPerso").val(localStorage.getItem("nom"));
        $("#typePerso").text(perso);
        $("#imgPerso").attr("src", "img/"+perso+".png");
    
        $("#courage").val(localStorage.getItem("courage"));
        $("#force").val(localStorage.getItem("force"));
        $("#intelligence").val(localStorage.getItem("intelligence"));
        $("#charisme").val(localStorage.getItem("charisme"));
        $("#adresse").val(localStorage.getItem("adresse"));
        $("#attaque").val(localStorage.getItem("attaque"));
        $("#parade").val(localStorage.getItem("parade"));
        $("#ev").val(localStorage.getItem("ev"));
        $("#ea").val(localStorage.getItem("ea"));
        $("#destin").val(localStorage.getItem("destin"));
        write(id);
    }
}

initDonjon();