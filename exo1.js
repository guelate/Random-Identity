class Mvc {

    constructor(model,view,controller){
        this.m = model;
        this.v = view;
        this.c = controller;

        this.m.v = view;
        this.m.c = controller;

        this.v.m = model;
        this.v.c = controller;

        this.c.m = model;
        this.c.v = view;

        this.c.Lancement();
    }
}

class Info {

    constructor(){
        console.log("model");
        this.tab = [1];
    }

    Attribut(){

        return ["Nom","Prénom","Ville","Age","Mail","Emploi","Salaire"];
    }

    Option(){
        return ["Selectionner une option","Calculer la moyenne d'âge","Calculer le salaire moyen"];
    }

    User(){

        let age = (min,max) => {

            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        let salaire = (min,max) => {

            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        return [faker.name.lastName(),faker.name.firstName(),faker.address.city(),age(23,45),faker.internet.email(),faker.name.jobType(),salaire(1200,10000)];
        
    }

    Moyenne_age(){

        let tab = [];

        this.v.tabMA.forEach( e => {

            tab.push(e);
            
        })
        let moyenne = tab.reduce( (acc,val) => {return acc + val} , 0)/tab.length;
        return Math.floor(moyenne);
    }

    Moyenne_salaire(){
        let tab = [];
        
        this.v.tabMS.forEach( e => {
            
            tab.push(e);
        })
        let moyenne = tab.reduce( (acc,val) => {return acc + val} , 0)/tab.length;
        return Math.floor(moyenne);

    }

}


class Table {

    constructor(vue){
        console.log("view");
        this.vue = vue;
        this.table = document.createElement("table");
        this.ligne = document.createElement("tr");
        this.cellule = document.createElement("td");
        this.incrementation = 0;
        this.tabMA = []; // Moyenne Age 
        this.tabMS = []; // Moyenne Salaire 
        this.select = document.getElementById("selecteur");
        //this.option = document.createElement("option");
    }

    
    Table(x){

        const ligne_attribut = document.createElement("tr");
        x.forEach( e => {
            let cellule = document.createElement("th");
            cellule.textContent = e;
            ligne_attribut.appendChild(cellule);
        })
        this.table.appendChild(ligne_attribut);
        this.vue.appendChild(this.table);
    }

    Ligne(x,y){

        this.ligne = document.createElement("tr");
        x.forEach( e => {
            
            this.cellule = document.createElement("td");
                this.cellule.textContent = y[this.incrementation];

                
                if(y[this.incrementation] >= 18 && y[this.incrementation] <= 45){
                    this.tabMA.push(y[this.incrementation]);

                }
                else if (y[this.incrementation] >= 1200 && y[this.incrementation] <= 10000){
                    this.tabMS.push(y[this.incrementation]);
                }

                this.ligne.appendChild(this.cellule);
                this.incrementation += 1;
                if(this.incrementation > 6){
                    this.incrementation = 0;
                }
       
           
        })
        this.table.appendChild(this.ligne);
    }

    Analyse(x){
        
        x.forEach( e => {
            let option = document.createElement("option");
            option.value = e;
            option.textContent = e ;
            this.select.appendChild(option);
        })

        let moyenne = [this.m.Moyenne_age(),this.m.Moyenne_salaire()];

        this.select.addEventListener('change', () => {
            let index = selecteur.selectedIndex; // afficher pour voir le resultat ?
            let selectentrer = document.getElementById("entrer");
            selectentrer.value = moyenne[index-1];

        });
  
        this.vue.appendChild(this.select);
    }

}


class Controller {

    constructor(){
        console.log("controller");
        
    }

    Lancement(){
        
        
        this.v.Table(this.m.Attribut());

        for(let i = 0; i < 25 ; i++){
            
            this.v.Ligne(this.m.User(),this.m.User());
        }

        this.v.Analyse(this.m.Option());
    }
    
}    

/*
ligne 103-105: on n'aura afficher "model" , "view" , "controller" car on initialise les 3 classes .
*/

let un = new Info();
let deux = new Table(document.body);
let trois = new Controller();

let affiche = new Mvc(un,deux,trois);


// Nettoyer le code enlever les trucs inutile 
