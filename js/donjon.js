function write(id) {
    jsonParagraphe="paragraphes/p"+id+".json";
    $("#texte").empty();

    $.getJSON(jsonParagraphe, function(data, status) {
        console.info(data.texte.length);
        $.each(data.texte, function(i, texte) {
            var strParagraphe="<p>";
            console.info(texte);

            $.each(texte.paragraphe, function(i, ligne) {
                strParagraphe += ligne+" ";
            });

            $("#texte").append(strParagraphe+"</p>");
        });

        $("#action").empty();
        $.each(data.choix, function(i, choix){
            $("#action").append('<p> => Rendez-vous au paragraphe <a href="javascript:write('+choix.id+')">'+choix.id+'</a></p>');
        });
    });
}

write(1);
