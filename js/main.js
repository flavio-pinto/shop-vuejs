/**
 * COMPONENTI GLOBALI
 */
Vue.component('Product', { //i parametri sono il nome del componente e le sue opzioni
    template: ` 
        <div class="product">
            <div class="product-image">
                <img v-bind:src="image" v-bind:alt="title"> <!-- usiamo v-bind: (in alternativa bastano anche i soli duepunti) per bindare l'immagine con vue decisa nel computed apposito -->
            </div>

            <div class="product-info">
                <h1>{{title}}</h1> <!-- andiamo a richiamare il computed title. IMPORTANTE: all'interno delle graffe ci va quella che è una espressione js, quindi oltre a mettere le variabili ad esempio possiamo fare anche concatenazioni -->
                <p v-show="onSale" class="on-sale">On Sale!</p> <!-- v-show permette di far controllare la visibilità o meno di un elemento in base a un valore se è true o false -->
                <span class="price">{{price.toFixed(2) + '€'}}</span>
                <p v-if="!soldOut">In Stock</p> <!-- v-if, v-elseif e v-else(riga di sotto) permettono di fare un if -->
                <p v-else="!soldOut">Out of Stock</p> 
                <!-- la differenza tra v-show e v-if è che il primo resta nel dom ma vue crea un display none per nascondere, mentre v-if crea una copia shadow del dom e permette di non ricaricare tutto, capisce che quel pezzo di markup è cambiato e cambia solo quello. V-show si usa in elementi di interazione, mentre il v-if si usa quando non c'è bisogno di decisioni, e si sceglie tra un markup oppure un altro -->
                
                <div class="details">
                    <h4>Details</h4>
                    <ul>
                        <!-- ATTENZIONE, IL LOOP NON VA FATTO NELL'ul PADRE, MA NEL li! -->
                        <li v-for="detail in details"> <!-- ricorda un po' il for in o il for of -->
                            {{detail}}
                        </li> 
                    </ul>
                </div>

                <div class="variants">
                    <h4>Variants</h4>
                    <!-- per bindare lo stile passiamo un oggetto javascript, scriviamo la proprietà in camel case ma viene tradotta in proprietà css.-->
                    <!-- con v-on invece gestiamo un evento, in questo caso un click, e stabiliamo il nome della funzione da utilizzare (presa da methods). Si può usare anche @ al posto di v-on -->
                    <!-- mettiamo tra parentesi variant e come secondo parametro prenderà come valore l'index di posizione dell'elemento nell'array. Index che va inserito anche quando richiamiamo il metodo updateProduct -->
                    <!-- v-bind:key (vedi anche documentazione) serve a usare un valore (in questo caso l'id) univoco per ogni row, e serve a tenere traccia di quegli update nella reattività, come se fosse un indice, e in questo caso l'id è un valore che nei database è univoco! -->
                    <div v-for="(variant, index) in variants"  
                        v-bind:key="variant.id"
                        class="color-box"
                        v-bind:style="{backgroundColor: variant.color}" 
                        v-on:click="updateProduct(index)"
                    > 
                    </div>
                </div>
            </div>
        </div>
    `, //occhio alle virgolette, sono quelle diverse, per le literal strings!
    data() { // questo è in ES6, sarebbe un po' come scrivere data: function() {} etc...
        return {
            product: 'Bevanda Colorata',
            brand: 'Italsucchi',
            //image: './img/prod-blue.jpg',
            selectedVariant: 0,
            onSale: true,
            //soldOut: true,
            price: 10.00,
            details: ['33cl.', 'Glass bottle', 'Alcohol free'],
            variants: [
                {
                    id: 2234,
                    color: '#66a7b9',
                    image: './img/prod-blue.jpg',
                    quantity: 10,
                    label: 'Blue'
                },
                {
                    id: 2235,
                    color: '#83aa51',
                    image: './img/prod-green.jpg',
                    quantity: 0,
                    label: 'Green'
                }
            ]
        }
    },
    computed: { //computed sono metodi che osservano valore di uno dei dati definiti, e ogni volta che il dato cambia, performa le operazioni che noi definiamo. MAI METTERE UNO STESSO NOME IN DATA E IN COMPUTED, ALTRIMENTI NON CAPISCE QUALE UTILIZZARE
        title() { // in questo caso vogliamo fare il compound del valore product e del valore brand
            return this.product + ' - ' + this.brand; //bisogna mettere this, perché altrimenti cercherà una variabile product o brand, che non c'è!
        },
        image() {
            return this.variants[this.selectedVariant].image; // tra le quadre(che usiamo perché il valore sarà dinamico) ci serve l'index per beccare la posizione esatta dell'elemento, e poi accediamo all'immagine
        },
        soldOut() {
            const quantity = this.variants[this.selectedVariant].quantity;
            
            return quantity > 0 ? false : true;
        }
    },
    methods: {
        updateProduct(index) {
            this.selectedVariant = index;
        }
    }
}); 

/**************
 * ISTANZA VUE*
 *************/
const app = new Vue({
    el: '#app', //chiede a Vue di cercare l'id app nel DOM
    data: {
        
    }
});

<!--  -->