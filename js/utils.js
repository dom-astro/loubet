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
        this.pj.nom=$("#nom").val();
        this.pj.genre=$("#genre").val();
        this.pj.origine=$("#origine").val();
        this.pj.metier=$("#metier").val();
        this.pj.competences=[];

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

        this.pj.armes=[];
        this.pj.armures=[];
        this.pj.divers=[];
    }

    // Getters & Setters
    get nom() { return this.pj.nom; }
    set nom(value) { this.pj.nom=value; }

    get genre() { return this.pj.genre; }
    set genre(value) { this.pj.genre=value; }

    get adresse() {
        let adresse = this.pj.caracts.find(caract => caract.nom=="adresse");    
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

    get origine() { return this.pj.origine; }
    set origine(value) { this.pj.origine=value; }

    get metier() { return this.pj.metier; }
    set metier(value) { this.pj.metier=value; }

    get competences() { return this.pj.competences; }
    set comptences(value) { this.pj.competences.push(value); }

    get ev() { return this.pj.ev; }
    set ev(value) { this.pj.ev=value; }

    get ea() { return this.pj.ea; }
    set ea(value) { this.pj.ea=value; }

    get attaque() { return this.pj.attaque; }
    set attaque(value) { this.pj.attaque=value; }

    get parade() { return this.pj.parade; }
    set parade(value) { this.pj.parade=value; }

    get xp() { return this.pj.xp; }
    set xp(value) { this.pj.xp=value; }

    get niveau() { return this.pj.niveau; }
    set niveau(value) { this.pj.niveau=value; }

    get armes() { return this.pj.armes; }
    set armes(value) { this.pj.armes.push(value); }

    get armures() { return this.pj.armures; }
    set armures(value) { this.pj.armures.push(value); }

    get divers() { return this.pj.divers; }
    set divers(value) { this.pj.divers.push(value); }

    save() {      
        let origine= origines.find(origine => origine.nom===this.pj.origine);
        let metier= metiers.find(metier => metier.nom===this.pj.metier);
        this.pj.competences=origine.competences.naissance;
        this.pj.competences.concat(metier.competences.naissance);
        localStorage.setItem("pj",JSON.stringify(this.pj));
        this.load();
    }
    
    load() {
        if ("pj" in localStorage) {
            this.pj=JSON.parse(localStorage.getItem("pj"));

            $("#nom").val(this.nom);
            $("#genre").val(this.genre);
            $("#origine").val(this.origine);
            $("#metier").val(this.metier);

            $("#adresse").val(this.adresse);
            $("#charisme").val(this.charisme);
            $("#courage").val(this.courage);
            $("#force").val(this.force);
            $("#intelligence").val(this.intelligence);

            $("#destin").val(this.destin);
            $("#fortune").val(this.fortune);
            $("#ev").val(this.ev);
            $("#ea").val(this.ea);
            $("#attaque").val(this.attaque);
            $("#parade").val(this.parade);

            $("#niveau").val(this.pj.niveau);
            $("#xp").val(this.pj.xp);
        } else {
            alert("Pas de pj sélectionné !");
        }
    }

    addCompetence(competence) {
        this.pj.competences.push(competence);
    }

    toJSON() {
        return this.pj;
    }

    loadArmes() {
        $("#eq-armes").empty();
        if ("pj" in localStorage) {
            this.pj.armes.forEach(function(nomArme) {
                var arme = armes.find(arme => arme.nom===nomArme);
                $("#eq-armes").append("<li><span style='font-weight: bold;'>"+arme.nom+"</span> (Dégât: "+arme.degat+")</li>");
            });
        }
    }

    loadArmures() {
        $("#eq-armures").empty();
        if ("pj" in localStorage) {
            this.pj.armures.forEach(function(nomArmure) {
                var armure = armures.find(armure => armure.nom===nomArmure);
                $("#eq-armures").append("<li><span style='font-weight: bold;'>"+armure.nom+"</span> (Protection: "+armure.pr+")</li>");
            });
        }
    }

    loadDivers() {
        $("#eq-divers").empty();
        if ("pj" in localStorage) {
            this.pj.divers.forEach(function(nomDiver) {
                var diver = divers.find(diver => diver.nom===nomDiver);
                $("#eq-divers").append("<li><span style='font-weight: bold;'>"+diver.nom+"</span> (Poids: "+diver.poids+")</li>");
            });
        }
    }

}

// Classe Origine / Metier
class Classe extends PJ {
    constructor(typeClasse, classe) {
        super();
        
        this.typeClasse = typeClasse;
        this.classe = classe;
    }

    appendCard() {
        let strConditions = this.attributCaract("adresse");
        strConditions += this.attributCaract("charisme");
        strConditions += this.attributCaract("courage");
        strConditions += this.attributCaract("force");
        strConditions += this.attributCaract("intelligence");

        let strClasse = " \
            <div class='col-4' style='margin-top: -8px;'> \
                <div id='"+this.typeClasse+"-"+this.classe.nom.id()+"' class='card card-disabled card-"+this.typeClasse+"' title='"+this.classe.nom+"'> \
                    <img class='card-img-top rounded-circle' src='img/"+this.classe.nom+".png' alt='"+this.classe.nom+"'> \
                    <p style='position: absolute; left: 70px; top: 10px; font-weight: bold;'>"+this.classe.nom+"<br> \
                    <span style='font-weight: normal; font-size: 10px; text-align: center;'>"+this.classe.titre+"</span></p> \
                    <div style='font-size: 12px; position: relative; left: 10px; top: 10px;'>"+strConditions+"</div> \
                    <button type='button' class='btn btn-info btn-classe' data-bs-toggle='modal' data-bs-target='#choix-modal'>Voir</button> \
                </div> \
            </div>";

            $("#"+this.typeClasse+"s").append(strClasse);
            this.verif();

            var self=this;
            $("#"+this.typeClasse+"-"+this.classe.nom.id()+">button").on("click", function() {
                $(".modal-title").html(self.classe.nom+": "+self.classe.titre.toLowerCase());
                $("#modal-img").attr("src","img/"+self.classe.nom+".png");
                $("#modal-description").html(self.classe.description);

                var strComptences="";
                competences.forEach(function(competence) {
                    self.classe.competences.naissance.forEach(function(competenceClasse) {
                        if(competence.nom.toLowerCase()==competenceClasse) {
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
                $(".modal-footer").append("<button id='btn-choisir' type='button' class='btn btn-success' data-bs-dismiss='modal'>Choisir</button>");
                $(".modal-footer").append("<button type='button' class='btn btn-danger' data-bs-dismiss='modal'>Femer</button>");

                $("#btn-choisir").on("click", function() {
                    $("#"+self.typeClasse).val(self.classe.nom);
                    $("#"+self.typeClasse+"s").hide();
                    $("#classes").show();

                    let strHTML  = '<div class="col-5 card card-'+self.typeClasse+'" style="height: 220px;" title="'+self.classe.nom.capitalize()+'">';
                        strHTML += $("#"+self.typeClasse+"-"+self.classe.nom.id()).html()+"</div>";
                    $("#classes").append(strHTML);
                    $(".card-"+self.typeClasse+">div").empty();
                    $(".card-"+self.typeClasse+">div").addClass("row");
                    $(".card-"+self.typeClasse+">div").append("<h6>Compétences</h6>");
                    //$("#"+self.typeClasse+"-"+self.classe.nom.id()).show();
                    //$("#"+self.typeClasse+"s>h3").html(self.typeClasse.capitalize());
                    competences.forEach(function(competence) {
                        self.classe.competences.naissance.forEach(function(competenceClasse) {
                            if(competence.nom.toLowerCase()==competenceClasse.toLowerCase()) {
                                $(".card-"+self.typeClasse+">div").append("<div class='col-5'>- "+competence.nom.capitalize()+"</div>" )
                            }
                        });
                    });           
                    $("#attaque").val(+$("#attaque").val()+self.classe.attaque);
                    $("#parade").val(+$("#parade").val()+self.classe.parade);
                    $("#ev").val(+$("#ev").val()+self.classe.ev);
                    $("#ea").val(+$("#ea").val()+self.classe.ea);

                    if(self.typeClasse=="origine") {
                        listeMetier();
                    }
                });
            });
    }
    
    attributCaract(nomCaract) {
        let caract=this.classe[nomCaract];
        var str = caract.min == 0 ? "" : "<span>"+nomCaract.capitalize()+" >= "+caract.min+ "</span><br>";
        str += caract.max == 99 ? "" : "<span>"+nomCaract.capitalize()+" <= "+caract.max+ "</span><br>";

        return str;
    }


    removeCard() {
        $("#"+this.typeClasse+"-"+this.classe.nom.id()).prev().remove();
    }

    verif() {
        let isEnabled=true;

        isEnabled = this.validCaract("adresse") && isEnabled;
        isEnabled = this.validCaract("charisme") && isEnabled;
        isEnabled = this.validCaract("courage") && isEnabled;
        isEnabled = this.validCaract("force") && isEnabled;
        isEnabled = this.validCaract("intelligence") && isEnabled;

        if (isEnabled) {
            $("#"+this.typeClasse+"-"+this.classe.nom.id()).removeClass("card-disabled");
            $("#"+this.typeClasse+"-"+this.classe.nom.id()).addClass("card-enabled");
            $("#"+this.typeClasse+"-"+this.classe.nom.id()+">button").prop("disabled",false);
        } else {
            $("#"+this.typeClasse+"-"+this.classe.nom.id()).addClass("card-disabled");
            $("#"+this.typeClasse+"-"+this.classe.nom.id()).removeClass("card-enabled");
            $("#"+this.typeClasse+"-"+this.classe.nom.id()+">button").prop("disabled",true);
        }
    }

    validCaract(nomCaract) {
        let isValid=true;
        let caractPJ = this.pj.caracts.find(caract => caract.nom==nomCaract);  
        let caractClasse = this.classe[nomCaract];

        isValid = isValid == (caractPJ.valeur<caractClasse.min);
        isValid = isValid == (caractPJ.valeur>caractClasse.max);

        return isValid;
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