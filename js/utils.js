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

class PJ {
    constructor() {
        this.pj = {};
        this.bob=$("#nom").val();
        this.pj.nom=$("#nom").val();
        this.pj.genre=$("#genre").val();

        this.pj.caracts=[];
        this.pj.caracts.push({"nom": "adresse", "valeur": +$("#adresse").val()});
        this.pj.caracts.push({"nom": "charisme", "valeur": +$("#charisme").val()});
        this.pj.caracts.push({"nom": "courage", "valeur": +$("#courage").val()});
        this.pj.caracts.push({"nom": "force", "valeur": +$("#force").val()});
        this.pj.caracts.push({"nom": "intelligence", "valeur": +$("#intelligence").val()});

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

    get adresse() {
        let index = this.pj.caracts.find(caract => caract.nom=="adresse");    
        return adresse.valeur;
    }
    set adresse(value) {
        let index = this.pj.caracts.findIndex(caract => caract.nom=="adresse");
        this.pj.caracts[index].valeur=value;
    }

    get charisme() {
        let charisme = this.pj.caracts.find(caract => caract.nom=="charisme");    
        return charisme.valeur;
    }
    set charisme(value) {
        let index = this.pj.caracts.findIndex(caract => caract.nom=="charisme");
        this.pj.caracts[index].valeur=value;
    }

    get courage() {
        let courage = this.pj.caracts.find(caract => caract.nom=="courage");    
        return courage.valeur;
    }
    set courage(value) {
        let index = this.pj.caracts.findIndex(caract => caract.nom=="courage");
        this.pj.caracts[index].valeur=value;
    }

    get force() {
        let force = this.pj.caracts.find(caract => caract.nom=="force");    
        return force.valeur;
    }
    set force(value) {
        let index = this.pj.caracts.findIndex(caract => caract.nom=="force");
        this.pj.caracts[index].valeur=value;
    }

    get intelligence() {
        let intelligence = this.pj.caracts.find(caract => caract.nom=="intelligence");    
        return intelligence.valeur;
    }
    set intelligence(value) {
        let index = this.pj.caracts.findIndex(caract => caract.nom=="intelligence");
        this.pj.caracts[index].valeur=value;
    }

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
    constructor(origine) {
        super();
        
        this.origine=origine;
    }

    appendCard() {
        let strConditions = this.attributCaract("adresse");
        strConditions += this.attributCaract("charisme");
        strConditions += this.attributCaract("courage");
        strConditions += this.attributCaract("force");
        strConditions += this.attributCaract("intelligence");

        let strOrigine = " \
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
            this.verif();

            /*$("#origine-"+origine.nom.id()+">button").prop("disabled",true);
            if (isEnabled) {
                $("#origine-"+origine.nom.id()).removeClass("card-disabled");
                $("#origine-"+origine.nom.id()).addClass("card-enabled");
                $("#origine-"+origine.nom.id()+">button").prop("disabled",false);
            }*/    
    }
    
    attributCaract(nomCaract) {
        let caract=this.origine[nomCaract];
        var str = caract.min == 0 ? "" : "<span>"+nomCaract.capitalize()+" >= "+caract.min+ "</span><br>";
        str += caract.max == 99 ? "" : "<span>"+nomCaract.capitalize()+" <= "+caract.max+ "</span><br>";

        return str;
    }


    removeCard() {
        $("#origine-"+this.origine.nom.id()).prev().remove();
    }

    verif() {
        let isEnabled=true;

        isEnabled = this.validCaract("adresse") && isEnabled;
        isEnabled = this.validCaract("charisme") && isEnabled;
        isEnabled = this.validCaract("courage") && isEnabled;
        isEnabled = this.validCaract("force") && isEnabled;
        isEnabled = this.validCaract("intelligence") && isEnabled;

        if (isEnabled) {
            $("#origine-"+this.origine.nom.id()).removeClass("card-disabled");
            $("#origine-"+this.origine.nom.id()).addClass("card-enabled");
            $("#origine-"+this.origine.nom.id()+">button").prop("disabled",false);
        } else {
            $("#origine-"+this.origine.nom.id()).addClass("card-disabled");
            $("#origine-"+this.origine.nom.id()).removeClass("card-enabled");
            $("#origine-"+this.origine.nom.id()+">button").prop("disabled",true);
        }
    }

    validCaract(nomCaract) {
        let isValid=true;
        let caractPJ = this.pj.caracts.find(caract => caract.nom==nomCaract);  
        let caractOrigine = this.origine[nomCaract];

        isValid = isValid == (caractPJ.valeur<caractOrigine.min);
        isValid = isValid == (caractPJ.valeur>caractOrigine.max);

        return isValid;
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