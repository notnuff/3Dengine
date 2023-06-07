import { Mesh } from './Mesh.js';

const Scene = {};

const fileInput = document.getElementById('input');

function handleObj(event) {
    const verticesPull = [];
    const trianglePull = [];

    const strType = {
        o: (str) => {
            this.name = str.split(' ')[1];
        },
        v: (str) => {
            const [x, y, z] = str
                .split(' ')
                .slice(1)
                .map(parseFloat);
            verticesPull.push([x, y, z]);
        },
        f: (str) => {
            const vertNum = str
                .split(' ')
                .slice(1)
                .map((vertexStr) => parseInt(vertexStr.split('//')) - 1);
            const vertices = vertNum.map((index) => verticesPull[index]);
            trianglePull.push(vertices);
        },
        default: () => {},
    };

    const objFile = event.target.result.split('\n');

    for (const str of objFile) {
        const typeLetter = str[0];
        const action = strType[typeLetter] || strType.default;
        action(str);
    }

    let objName;
    if (Scene[this.name]) {
        objName = this.name + (Object.keys(Scene).length + 1);
    } else {
        objName = this.name || `untitled.${Object.keys(Scene).length + 1}`;
    }
    Scene[objName] = new Mesh(trianglePull);
}

function handleFile() {
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.addEventListener('load', handleObj);
        reader.readAsText(file);
    }
}

fileInput.onchange = handleFile;

export { Scene };
