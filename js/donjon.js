function write(id) {
    jsonParagraphe=loubet[id-1];
    $("#texte").empty();
    var strParagraphe='<div id="paragraphe">'+id+'</div>';
    $("#texte").append(strParagraphe);
    $("#texte").append("<br><br>");

    jsonParagraphe.paragraphe.forEach(function(data) {

        strParagraphe="<p>"+formatParagraphe(data.ligne)+"</p>";

        /*paragraphe.forEach(function(ligne) {
            strParagraphe += " " +ligne;
        })
        strParagraphe +="</p>";*/
        $("#texte").append(strParagraphe);
    });
}


function formatParagraphe(ligne) {
    var strLigne="<p>";
    let pos=ligne.indexOf("paragraphe")+11;
    let action=ligne.substring(pos);
    let id=action.split(" ")[0];

    if(ligne.indexOf("paragraphe")>=0) {
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
    switch(event.target.innerHTML) {
        case "Barbare":
            desc="Le Barbare est le stéréotype du tas de muscle sans cervelle. Il est bourrin, susceptible et pas très intelligent il est du genre à taper d'abord et à discuter ensuite.";
            break;
        case "Elfe":
            desc="L'Elfe est naïve et stupide et représente le stéréotype des blondes. Elle ne fait attention à rien et n'aucune culture sur les donjons ou sur tout type d'aventures";
            break;
        case "Magicienne":
            desc="La Magicienne est pratiquement la seule personne intelligente de la compagnie. C'est une véritable bibliothèque humaine, passionnée par les livres. En revanche elle a un mauvais sens de l'orientation.";
            break;
        case "Menestrel":
            desc="C'est un musicien et poète préférant le chant des cigalles au bruit des ogres.";
            break;
        case "Nain":
            desc="Le Nain est le stéréotype du radin, il est grincheux, égoïste, et souvent méchant avec les autres. Il est un grand amateur d'humour gras, de boissons alcoolisées et de combats.";
            break;
        case "Ogre":
            desc="L'Ogre est une créature très simple d'esprit, mais surtout un gros morfal adorant manger tout et n'importe quoi, c'est également un grand sensible, amateur de musique.";
            break;
        case "Ranger":
            desc="Le Ranger est un leader lâche et incompétent mais fier.";
            break;
        case "Voleur":
            desc="Le Voleur est un personnage très lâche, beaucoup plus que le Ranger, essayant plus que tout d'éviter de se battre et de fuir.";
            break;
    }

    $("#typePerso").text(event.target.innerHTML);
    $("#imgPerso").attr("src", "img/"+event.target.innerHTML+".png");
    $("#descPerso").text(desc);
    
});

write(1);