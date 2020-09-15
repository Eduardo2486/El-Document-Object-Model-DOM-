import {LitElement, css, html} from 'lit-element';

import "./lista/lista-component.js";
import "./panel/panel-component.js";

class Contenedor extends LitElement{
    
    static get properties(){
        return{
            personajes: {type:Array},
            mostrarPersonaje: {type:Object},
            nombresPersonajes: {type:Array}
        }
    }

    constructor(){
        super();
        this.personajes = [];
        this.nombresPersonajes = [];
        this.mostrarPersonaje = {};
    }

    static get styles(){
        return css`
        .contenedor{
            width:800px;
            margin:0 auto;
        }
        `;
    }

    async firstUpdated(){
        await fetch('https://swapi.dev/api/people/')
            .then(  res =>  res.json() )
            .then( async data => {
                this.personajes = data.results; 
                this.mostrarPersonaje = this.personajes[0];
                this.nombresPersonajes = data.results.map( personaje => personaje.name );
            } )
            .catch( err => this.personajes =  "Actualmente no se puede conectar a la API")
    }

    cambiaPersonaje(event){
        let personaje = this.personajes.filter(personaje => personaje.name === event.detail.nombre )
        this.mostrarPersonaje = personaje[0];
        
    }

    render(){
        return html`
            <div class="contenedor">
                <lista-component .personajes="${this.nombresPersonajes}" @cambiar-personaje="${this.cambiaPersonaje}"></lista-component>
                <panel-component .personaje="${this.mostrarPersonaje}"></panel-component>
            </div>
        `;
    }
}

customElements.define('contenedor-component', Contenedor);