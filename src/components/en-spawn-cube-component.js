class EnSpawnCubeComponent extends HTMLElement{
    cube_index = 0;
    constructor(){
        super();
        this.init();
    }
    init(){
        const shadow = this.attachShadow({mode: 'open'});
        const div = document.createElement('div');
        div.setAttribute('class', 'center');
        const button = document.createElement('button');
        const text = document.createTextNode('Spawn Cube')
        button.addEventListener('click', this.spawnCube);
        button.appendChild(text);
        div.appendChild(button);
        const style = document.createElement('style');
        style.textContent = `
                                .center {
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    height: 400px;
                                    border: 3px solid blue;
                                }
                                .center button {
                                    font-size: 48px;
                                }

                                `;
        shadow.appendChild(style);
        shadow.appendChild(div);

    }


}
export const EsSpawnCube = customElements.define('es-spawn-cube', EnSpawnCubeComponent)