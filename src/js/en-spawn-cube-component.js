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
    randomSpherePoint = ()=>{
        var u = Math.random();
        var v = Math.random();
        var theta = 2 * Math.PI * u;
        var phi = Math.acos(2 * v - 1);
        var x = Math.sin(phi) * Math.cos(theta);
        var y = Math.sin(phi) * Math.sin(theta);
        var z = Math.cos(phi);
        return [x, y, z];
    }
    spawnCube =() =>{
        var rpos = this.randomSpherePoint();
        var radius = Math.random() * 2;
        rpos = rpos.map(v => v * radius);

        var id = 'cube_' + this.cube_index++; 

        window.vuplex.postMessage(
            {
                action: 'create-primitive',
                id: id,
                primitive: 'cube',
                position: { x: rpos[0], y: rpos[1], z: rpos[2] },
                rotation: { x: 45, y: 0, z: 0 },
                scale: { x: 0.5, y: 0.5, z: 0.5}
            }
        );

    }

}
export const EsSpawnCube = customElements.define('en-spawn-cube', EnSpawnCubeComponent)