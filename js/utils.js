// Ajout de la méthode replaceAll au type string
String.prototype.replaceAll = function(find, replace) {
    var str = this.valueOf();
    return str.replace(new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), replace);
}

// Ajout de la méthode id au type string
String.prototype.id = function () {
    var str = this.valueOf();
    return str.replaceAll(' ','-').toLowerCase();
};

// Ajout de la méthode capitalize au type string
String.prototype.capitalize = function () {
    var str = this.valueOf();
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Ajout de la méthode capitalize au type string
String.prototype.atttributCaract = function (nomCaract) {
    var caract = this.valueOf();

    var str = caract.min == 0 ? "" : "<span>"+nomCaract.capitalize()+" >= "+caract.min+ "</span><br>";
    str += caract.max == 99 ? "" : "<span>"+nomCaract.capitalize()+" <= "+caract.max+ "</span><br>";

    return str;
}

// Ajout de la méthode validCaract au type number
Number.prototype.validCaract = function(caract) {
    let isValid=true;
    let valCaract=this.valueOf();

    isValid = isValid == (valCaract<caract.min);
    isValid = isValid == (valCaract>caract.max);

    return isValid;
};

class PJ {
    constructor() {
        this.pj = {};
        this.bob=$("#nom").val();
        this.pj.nom=$("#nom").val();
        this.pj.genre=$("#genre").val();

        this.pj.adresse=+$("#adresse").val();
        this.pj.courage=+$("#courage").val();
        this.pj.charisme=+$("#charisme").val();
        this.pj.force=+$("#force").val();
        this.pj.intelligence=+$("#intelligence").val();

        this.pj.destin=+$("#destin").val();
        this.pj.fortune=+$("#fortune").val();
        this.pj.attaque=+$("#attaque").val();
        this.pj.parade=+$("#parade").val();
        this.pj.niveau=+$("#niveau").val();
        this.pj.xp=+$("#xp").val();
    }

    // Getters & Setters
    get nom() { return this.pj.nom; }
    set nom(value) { this.pj.nom=value; }

    get genre() { return this.pj.genre; }
    set genre(value) { this.pj.genre=value; }

    get adresse() { return this.pj.adresse; }
    set adresse(value) { this.pj.adresse=value; }

    get courage() { return this.pj.courage; }
    set courage(value) { this.pj.courage=value; }

    get charisme() { return this.pj.charisme; }
    set charisme(value) { this.pj.charisme=value; }

    get force() { return this.pj.force; }
    set force(value) { this.pj.force=value; }

    get intelligence() { return this.pj.intelligence; }
    set intelligence(value) { this.pj.intelligence=value; }

    get destin() { return this.pj.destin; }
    set destin(value) { this.pj.destin=value; }

    get fortune() { return this.pj.fortune; }
    set fortune(value) { this.pj.fortune=value; }

    appendCard() {
    }

    toJSON() {
        return this.pj;
    }
}

// Class Origine
class Origine extends PJ {
    constructor(nomOrigine) {
        super();
        
        this.orgine=origines.find(origine => origine.nom===nomOrigine);
    }

    appendCard() {
        strConditions  = origine.courage.atttributCaract("courage");
        strConditions += origine.intelligence.atttributCaract("intelligence");
        strConditions += origine.charisme.atttributCaract("charisme");
        strConditions += origine.adresse.atttributCaract("adresse");
        strConditions += origine.force.atttributCaract("force");

        strOrigine = " \
            <div class='col-4' style='margin-top: -8px;'> \
                <div id='origine-"+this.origine.nom.id()+"' class='card card-disabled' title='"+this.origine.nom+"'> \
                    <img class='card-img-top rounded-circle' src='img/"+this.origine.nom+".png' alt='"+this.origine.nom+"'> \
                    <p style='position: absolute; left: 70px; top: 10px; font-weight: bold;'>"+this.origine.nom+"<br> \
                    <span style='font-weight: normal; font-size: 10px; text-align: center;'>"+this.origine.titre+"</span></p> \
                    <div style='font-size: 12px; position: relative; left: 10px; top: 10px;'>"+strConditions+"</div> \
                    <button type='button' class='btn btn-info btn-origine' onclick='descOrigine(\""+this.origine.nom+"\")' data-bs-toggle='modal' data-bs-target='#choix-modal'>Voir</button> \
                </div> \
            </div>";

            $("#origines").append(strOrigine);

    
            $("#origine-"+origine.nom.id()+">button").prop("disabled",true);
            if (isEnabled) {
                $("#origine-"+origine.nom.id()).removeClass("card-disabled");
                $("#origine-"+origine.nom.id()).addClass("card-enabled");
                $("#origine-"+origine.nom.id()+">button").prop("disabled",false);
            }
    
    }

    removeCard() {
        $("#origine-"+this.origine.nom.id()).prev().remove();
    }

    verif() {
        isEnabled=true;

        isEnabled = this.adresse.validCaract(origine.adresse)==isEnabled;
        isEnabled = this.charisme.validCaract(origine.charisme)==isEnabled;
        isEnabled = this.courage.validCaract(origine.courage)==isEnabled;
        isEnabled = this.force.validCaract(origine.force)==isEnabled;
        isEnabled = this.intelligence.validCaract(origine.intelligence)==isEnabled;

        if (isEnabled) {
            $("#origine-"+origine.nom.id()).removeClass("card-disabled");
            $("#origine-"+origine.nom.id()).addClass("card-enabled");
            $("#origine-"+origine.nom.id()+">button").prop("disabled",false);
        } else {
            $("#origine-"+origine.nom.id()).addClass("card-disabled");
            $("#origine-"+origine.nom.id()).removeClass("card-enabled");
            $("#origine-"+origine.nom.id()+">button").prop("disabled",true);
        }
    }

}

// Class Metier
class Metier extends PJ {
    constructor(nomMetier) {
        super();

        this.metier=metiers.find(metier => metier.nom===nomMetier);    
    }

    appendCard() {
        strConditions  = "";
        strConditions += metier.courage.min == 0 ? "" : "<span>Courage >= "+metier.courage.min+ "</span><br>";
        strConditions += metier.courage.max == 99 ? "" : "<span>Courage <= "+metier.courage.max+ "</span><br>";
        strConditions += metier.intelligence.min == 0 ? "" : "<span>Intelligence >= "+metier.intelligence.min+ "</span><br>";
        strConditions += metier.intelligence.max == 99 ? "" : "<span>Intelligence <= "+metier.intelligence.max+ "</span><br>";
        strConditions += metier.charisme.min == 0 ? "" : "<span>Charisme >= "+metier.charisme.min+ "</span><br>";
        strConditions += metier.charisme.max == 99 ? "" : "<span>Charisme <= "+metier.charisme.max+ "</span><br>";
        strConditions += metier.adresse.min == 0 ? "" : "<span>Adresse >= "+metier.adresse.min+ "</span><br>";
        strConditions += metier.adresse.max == 99 ? "" : "<span>Adresse <= "+metier.adresse.max+ "</span><br>";
        strConditions += metier.force.min == 0 ? "" : "<span>Force >= "+metier.force.min+ "</span><br>";
        strConditions += metier.force.max == 99 ? "" : "<span>Force <= "+metier.force.max+ "</span><br>";
        strConditions += "</ul>";

        strmetier = " \
            <div class='col-4' style='margin-top: -8px;'> \
                <div id='metier-"+this.metier.nom.id()+"' class='card card-disabled' title='"+this.metier.nom+"'> \
                    <img class='card-img-top rounded-circle' src='img/"+this.metier.nom+".png' alt='"+this.metier.nom+"'> \
                    <p style='position: absolute; left: 70px; top: 10px; font-weight: bold;'>"+this.metier.nom+"<br> \
                    <span style='font-weight: normal; font-size: 10px; text-align: center;'>"+this.metier.titre+"</span></p> \
                    <div style='font-size: 12px; position: relative; left: 10px; top: 10px;'>"+strConditions+"</div> \
                    <button type='button' class='btn btn-info btn-metier' onclick='descmetier(\""+this.metier.nom+"\")' data-bs-toggle='modal' data-bs-target='#choix-modal'>Voir</button> \
                </div> \
            </div>";

            $("#metiers").append(strmetier);

    
            $("#metier-"+metier.nom.id()+">button").prop("disabled",true);
            if (isEnabled) {
                $("#metier-"+metier.nom.id()).removeClass("card-disabled");
                $("#metier-"+metier.nom.id()).addClass("card-enabled");
                $("#metier-"+metier.nom.id()+">button").prop("disabled",false);
            }
    
    }

    removeCard() {
        $("#metier-"+this.metier.nom.id()).prev().remove();
    }

    verif() {
        isEnabled=true;

        isEnabled = this.courage.validCaract(metier.adresse)==isEnabled;
        isEnabled = this.courage.validCaract(metier.charisme)==isEnabled;
        isEnabled = this.courage.validCaract(metier.courage)==isEnabled;
        isEnabled = this.courage.validCaract(metier.force)==isEnabled;
        isEnabled = this.courage.validCaract(metier.intelligence)==isEnabled;

        if (isEnabled) {
            $("#metier-"+metier.nom.id()).removeClass("card-disabled");
            $("#metier-"+metier.nom.id()).addClass("card-enabled");
            $("#metier-"+metier.nom.id()+">button").prop("disabled",false);
        } else {
            $("#metier-"+metier.nom.id()).addClass("card-disabled");
            $("#metier-"+metier.nom.id()).removeClass("card-enabled");
            $("#metier-"+metier.nom.id()+">button").prop("disabled",true);
        }
    }

}

class Competences {
    constructor(nomCompetence) {
        this.competence=competences.find(competence => competence.nom===nomCompetence);
        this.courage=$("#courage").val();
        this.charisme=$("#charisme").val();
        this.force=$("#force").val();
        this.intelligence=$("#intelligence").val();
        this.adresse=$("#adresse").val();
    
    }
   
}