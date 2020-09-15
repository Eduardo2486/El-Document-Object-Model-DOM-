import {LitElement, css, html} from 'lit-element';
import {until} from 'lit-html/directives/until.js';
import './panel-lista-component.js'
import './panel-detalle-component.js';

class PanelComponent extends LitElement{
    static get properties(){
        return {
            personaje: {type:Object},
            actualElemento: {type:String},
            homeworld: {type:Array},
            species: {type:Array},
            vehicles: {type:Array},
            starships: {type:Array}
        }
    }
    constructor(){
        super();
        this.personaje = {};
        this.menuElementos = ['personal', 'homeworld', 'species', 'vehicles', 'starships'];
        this.actualElemento = 'personal';
        this.homeworld = [];
        this.species = [];
        this.vehicles = [];
        this.starships = [];
        
    }

    static get styles(){
        return css`
        :host{
            display:inline-block;
            width:600px;
            position: relative;
            float:right;
            background-color: #f99b1e;
        }
        ul{
            margin: 0 60px;
            padding: 0;
            font-family:Arial;
        }
        li{
            overflow:hidden;
            font-size:1.5em;
            margin:10px 5px ;
        }
        .left{
            float:left;
        }
        .right{
            float:right;
        }
        `;
    }

    updated(){
        this.cambiarInformacion({detail:{info:this.actualElemento}});
    }

    connectedCallback() {
        super.connectedCallback();
        this.getApi();
    }
    getApi(url) {
        return new Promise((res, rej) => {
            fetch(url)
            .then(data => data.json())
            .then((json) => {
                res(json);
            })
            .catch((error) => {rej(error)});
        })
    }
    async cambiarInformacion(event){
        console.log("CALLED");
        if(  this.personaje[event.detail.info] !== undefined && event.detail.info === 'homeworld' ){
            let data = [];
            data.push(await this.getApi(this.personaje['homeworld']));
            if( event.detail.info === 'homeworld' && this.homeworld.length === 0 ){
                this.homeworld = data;
            }else{
                this.homeworld.splice(0, this.homeworld.length);
            }
        }else if(this.personaje[ event.detail.info] !== undefined){
            let apis = this.personaje[event.detail.info];
            if(apis.length > 0){
                let call = [];
                for(let i in apis){
                    call.push(await this.getApi(apis[i]));
                }
                if( event.detail.info === 'vehicles' && this.vehicles.length === 0 ){
                    this.vehicles = call;
                }
                if( event.detail.info === 'starships' && this.starships.length === 0 ){
                    this.starships = call;
                }
                if( event.detail.info === 'species' && this.species.length === 0 ){
                    this.species = call;
                }
            }else{
                let message = {"Lo sentimos":"No hay informacion sobre eso"};
                if( event.detail.info === 'vehicles' && this.vehicles.length === 0 ){
                    this.vehicles.push(message);
                }else{
                    this.vehicles.splice(0, this.vehicles.length);
                }
                if( event.detail.info === 'starships' && this.starships.length === 0 ){
                    this.starships.push(message);
                }else {
                    this.starships.splice(0, this.starships.length);
                }
                if( event.detail.info === 'species' && this.species.length === 0 ){
                    this.species.push(message);
                }else{
                    this.species.splice(0, this.species.length);
                }
            }
        }
        
        this.actualElemento = event.detail.info;
    }

    renderObjecto(){
        let htmlTemplate = [];
        if(this.personaje['name'] !== undefined && this.actualElemento === 'personal'){
            Object.entries(this.personaje).forEach(([key,value]) => {
                if(!['homeworld', 'species', 'vehicles', 'starships', 'films', 'created', 'edited', 'url'].includes(key)){
                    htmlTemplate.push(html`<li><span class="left">${key}</span> <span class="right">${value}</span></li>`);
                }
            });
        }else if(
            this.personaje['vehicles'] !== undefined || 
            this.personaje['starships'] !== undefined || 
            this.personaje['species'] !== undefined || 
            this.personaje['homeworld'] !== undefined ){
            if(this.actualElemento === 'homeworld'){
                this.homeworld.forEach(element => {
                    Object.entries(element).forEach(([key,value]) => {
                        if(!['films', 'created', 'edited', 'url', 'residents', 'people'].includes(key)){
                            htmlTemplate.push(html`<li><span class="left">${key}</span> <span class="right">${value}</span></li>`);
                        }
                    });
                });
            }else if(this.actualElemento === 'vehicles'){
                this.vehicles.forEach(element => {
                    Object.entries(element).forEach(([key,value]) => {
                        if(!['films', 'created', 'edited', 'url', 'pilots', 'people'].includes(key)){
                            htmlTemplate.push(html`<li><span class="left">${key}</span> <span class="right">${value}</span></li>`);
                        }
                    });
                    htmlTemplate.push(html`<li>----------------------------------------------------------</li>`);
                });
            }else if(this.actualElemento === 'starships'){
                this.starships.forEach(element => {
                    Object.entries(element).forEach(([key,value]) => {
                        if(!['films', 'created', 'edited', 'url', 'pilots'].includes(key)){
                            htmlTemplate.push(html`<li><span class="left">${key}</span> <span class="right">${value}</span></li>`);
                        }
                    });
                    htmlTemplate.push(html`<li>----------------------------------------------------------</li>`);
                });
            }else if(this.actualElemento === 'species'){
                this.species.forEach(element => {
                    Object.entries(element).forEach(([key,value]) => {
                        if(!['films', 'created', 'edited', 'url', 'people'].includes(key)){
                            htmlTemplate.push(html`<li><span class="left">${key}</span> <span class="right">${value}</span></li>`);
                        }
                    });
                    htmlTemplate.push(html`<li>----------------------------------------------------------</li>`);
                });
            }
        }
        return htmlTemplate;
    }

    render(){
        return html`
            <div>
                <panel-lista-component .elementos="${this.menuElementos}" .enlaceactivo="${this.actualElemento}" @cambiar-informacion="${this.cambiarInformacion}"></panel-lista-component>
                <ul>
                ${this.renderObjecto()}
                </ul>
            </div>
        `;
    }
}
// let temporalPersonaje = {};
// Object.keys(this.personaje).forEach( key =>{
//     if(!['homeworld', 'species', 'vehicles', 'starships'].includes(key)){
//         temporalPersonaje[key] = this.personaje[key]
//     }
// });
// this.personajeInfo = [temporalPersonaje];
// this.eliminarkeys(["films","created","edited","url"])
{/* <panel-detalle-component .personaje="${this.personajeInfo}"></panel-detalle-component> */}

customElements.define('panel-component', PanelComponent);