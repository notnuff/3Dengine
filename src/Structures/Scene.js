import { Mesh } from './Mesh.js';

function Scene(...meshes) {
    meshes.forEach(mesh => this[mesh] = mesh);
}

export { Scene };
