import { Mesh } from './Mesh.js';

const Scene = {};

const fileInput = document.getElementById('input');

let fileCounter = 0;
function handleObj(event) {
    const verticesPull = [];
    const trianglePull = [];
    const strType = {
        o: (str) => this.name = str.split(' ')[1],
        v: (str) => verticesPull.push([str.split(' ')[1], str.split(' ')[2], str.split(' ')[3]]),
        f: (str) => {
            const vertNum = [
                str.split(' ')[1].split('//')[0] - 1,
                str.split(' ')[2].split('//')[0] - 1,
                str.split(' ')[3].split('//')[0] - 1
            ];
            trianglePull.push([verticesPull[vertNum[0]], verticesPull[vertNum[1]], verticesPull[vertNum[2]]]);
        },
    };
    let obj = event.target.result;
    obj = obj.split('\n');
    for (const str of obj) {
        const typeLetter = str[0];
        if (strType[typeLetter]) strType[typeLetter](str);
    }
    let objName;
    //todo normal objects adding
    if (Scene[this.name]) objName = this.name + fileCounter;
    else objName = this.name || `untitled.${fileCounter}`;
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
export {Scene};
