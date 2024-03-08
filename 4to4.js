(function($) {
    $.fn.puissance4 = function(options) {
        let parametres = $.extend({
            joueur1: "PNOIR",
            joueur2: "PPURPLE",
            nbRangees: 6,
            nbColonnes: 7,
            longueurGagnante: 4
        }, options);

        let joueurActuel = parametres.joueur1;
        let tableau = [];
        let colonnes = Array(parametres.nbColonnes).fill(parametres.nbRangees - 1);
        let finPartie = false;

        function initialiserTableau() {
            tableau = [];
            colonnes = Array(parametres.nbColonnes).fill(parametres.nbRangees - 1);

            for (let r = 0; r < parametres.nbRangees; r++) {
                let ligne = [];
                for (let c = 0; c < parametres.nbColonnes; c++) {
                    ligne.push(' ');
                }
                tableau.push(ligne);
            }
        }

        function afficherTableau() {
            let $tableau = $("<div>").attr("id", "bords");
            for (let r = 0; r < parametres.nbRangees; r++) {
                let $rangee = $("<div>").addClass("rangee");
                for (let c = 0; c < parametres.nbColonnes; c++) {
                    let $carreau = $("<div>").addClass("carreau").attr("data-rangee", r).attr("data-colonne", c);
                    $rangee.append($carreau);
                }
                $tableau.append($rangee);
            }
            this.append($tableau);
        }

        function placerPion() {
            if (finPartie) return;

            let colonne = $(this).data("colonne");
            let rangee = colonnes[colonne];
            if (rangee < 0) return;

            tableau[rangee][colonne] = joueurActuel;

            let $carreau = $(".carreau[data-rangee='" + rangee + "'][data-colonne='" + colonne + "']");
            let positionDepart = {
                bottom: -$carreau.height() * rangee
            };
            $carreau.css(positionDepart);

            $carreau.addClass(joueurActuel === parametres.joueur1 ? "pion-noir" : "pion-violet")
                .animate({
                    bottom: 0
                }, 400, function() {
                    if (verifierGagnant(rangee, colonne)) {
                        finPartie = true;
                        let gagnant = joueurActuel === parametres.joueur1 ? "Le joueur noir" : "Le joueur violet";
                        $(".status").text(gagnant + " a gagné !");
                    } else {
                        joueurActuel = joueurActuel === parametres.joueur1 ? parametres.joueur2 : parametres.joueur1;
                        colonnes[colonne]--;
                    }
                });
        }

        function verifierGagnant(rangee, colonne) {
            let directions = [[1, 0], [0, 1], [1, 1], [1, -1]];

            for (let [dr, dc] of directions) {
                let count = 1;
                count += compterDirection(rangee, colonne, dr, dc);
                count += compterDirection(rangee, colonne, -dr, -dc);
                if (count >= parametres.longueurGagnante) return true;
            }

            return false;
        }

        function compterDirection(rangee, colonne, dr, dc) {
            let r = rangee + dr;
            let c = colonne + dc;
            let count = 0;

            while (r >= 0 && r < parametres.nbRangees && c >= 0 && c < parametres.nbColonnes && tableau[r][c] === joueurActuel) {
                count++;
                r += dr;
                c += dc;
            }

            return count;
        }

        function reinitialiserPartie() {
            $("#bords").empty();
            $(".status").text("");
            initialiserTableau();
            afficherTableau.call(this);
            joueurActuel = parametres.joueur1;
            finPartie = false;
        }

        initialiserTableau();
        afficherTableau.call(this);

        $(document).on("click", ".carreau", placerPion);
        $(this).on("click", ".reset-button", reinitialiserPartie);

        return this;
    };
})(jQuery);
