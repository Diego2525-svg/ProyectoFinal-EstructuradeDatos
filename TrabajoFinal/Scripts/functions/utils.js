//Pintar el camino correcto de amarillo
export function paintPath(path, startNode, endNode, delay) {
    if (delay) {
        let i = 0;
        const intervalId = setInterval(() => {//Funcion que se ejecutara varias veces
            //Se usa una funcion flecha pq es una fucnion sencillla y no es un objeto, si no una accion
            if (i < path.length) {
                const node = path[i];
                if (node !== startNode && node !== endNode) {
                    node.element.style.backgroundColor = 'yellow';
                }
                i++;
            } else {
                clearInterval(intervalId);//Se elimina el intervalo y la funcion acaba 
            }
        }, 100);
    } else {
        path.forEach(node => {
            if (node !== startNode && node !== endNode) {
                node.element.style.backgroundColor = 'yellow';
            }
        });
    }
}
//Pintar de gris cada nodo que es visitado
export function paintVisited(visitedNodes, startNode, endNode, callback) {
    let i = 0;
    const intervalId = setInterval(() => {
        if (i < visitedNodes.length) {
            const node = visitedNodes[i];
            if (node !== startNode && node !== endNode) {
                node.element.style.backgroundColor = 'gray';
            }
            i++;
        } else {
            clearInterval(intervalId);
            if (callback) callback();
        }
    }, 200);
}
//Reset de la tavk 
export function clearTableColors() {
    const table = document.getElementById('generatedTable');
    if (!table) return;
    for (let i = 0; i < table.rows.length; i++) {
        for (let j = 0; j < table.rows[i].cells.length; j++) {
            const cell = table.rows[i].cells[j];
            if (cell.style.backgroundColor !== 'red' && cell !== startNode.element && cell !== endNode.element) {
                cell.style.backgroundColor = '';
            }
        }
    }
}
