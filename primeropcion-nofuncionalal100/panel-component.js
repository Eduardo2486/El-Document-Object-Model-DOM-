import {LitElement, css, html} from 'lit-element';

import './panel-list-component.js';
import './panel-detail-component.js';

class PanelComponent extends LitElement{
    static get properties(){
        return {
            personaje:{type:Object},
            personajeInfo: {type: Array},
            actualElemento: {type:String}
        }
    }
    constructor(){
        super();
        this.personaje = {};
        this.personajeInfo = [];
        this.menuElementos = ['personal', 'homeworld', 'species', 'vehicles', 'starships'];
        this.actualElemento = "personal";
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
        div{
            top: -16px;
            position: relative;
        }
        `;
    }

    firstUpdated(){
        this.cambiarInformacion({detail:{info:'personal'}});
    }

    eliminarkeys(keys){
        if(this.personajeInfo.length < 2){
            keys.forEach( (item) => {
                delete this.personajeInfo[0][item];
            });
        }else{
            for(let i = 0 ; i < this.personajeInfo.length ; i++){
                Object.entries(this.personajeInfo[i]).forEach(() => {
                    keys.forEach( (item) => {
                        delete this.personajeInfo[i][item];
                    });
                });
            }
        }
        console.log(this.personajeInfo);
    }

    async llamarapi(url){
        let response = await fetch(url);
        let data = await response.json();
        return data;
    }

    async cambiarInformacion(event){
        if(event.detail.info === 'personal'){
            let temporalPersonaje = {};
            Object.keys(this.personaje).forEach( key =>{
                if(!['homeworld', 'species', 'vehicles', 'starships'].includes(key)){
                    temporalPersonaje[key] = this.personaje[key]
                }
            });
            this.personajeInfo = [temporalPersonaje];
            this.eliminarkeys(["films","created","edited","url"])
        }else{
            let apis = this.personaje[event.detail.info];
            if(typeof apis === 'string'){
                let call = await this.llamarapi(apis);
                this.personajeInfo = [call];
            }else{
                if(apis.length > 0){
                    let call = [];
                    for(let i in apis){
                        call.push(await this.llamarapi(apis[i]));
                    }
                    this.personajeInfo = call;
                }else{
                    this.personajeInfo = [{"lo sentimos": "no hay informacion sobre eso"}]
                }
            }
            this.eliminarkeys(["residents","films","created","edited", "url","people","pilots"])
        }
        this.actualElemento = event.detail.info;
    }

    render(){
        return html`
            <div>
                <panel-list-component .elementos="${this.menuElementos}" @cambiar-informacion="${this.cambiarInformacion}" .enlaceactivo="${this.actualElemento}"></panel-list-component>
                <panel-detail-component .personajeInfo="${this.personajeInfo}"></panel-detail-component>
            </div>
        `;
    }
}

customElements.define('panel-component', PanelComponent);