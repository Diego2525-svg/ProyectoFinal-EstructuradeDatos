/*export function cache(startNode, endNode, rows, columns) {
    // Inicializar distancias y caminos anteriores
    const dist = {};
    const prev = {};
    const queue = [];
    const path = [];

    const start = startNode.value;
    const end = endNode.value;

    // Inicializar distancias a infinito y caminos anteriores a null
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            const nodeValue = `${i}-${j}`;
            dist[nodeValue] = Infinity;
            prev[nodeValue] = null;
        }
    }

    // Configurar distancia inicial del nodo de inicio
    dist[start] = 0;
    queue.push(start);

    while (queue.length > 0) {
        const current = queue.shift();
        const [currentRow, currentCol] = current.split('-').map(Number);

        if (current === end) break;

        // Definir vecinos del nodo actual
        const neighbors = [
            `${currentRow - 1}-${currentCol}`, // arriba
            `${currentRow + 1}-${currentCol}`, // abajo
            `${currentRow}-${currentCol - 1}`, // izquierda
            `${currentRow}-${currentCol + 1}`  // derecha
        ];

        // Explorar vecinos
        for (const neighbor of neighbors) {
            const [r, c] = neighbor.split('-').map(Number);
            if (r >= 0 && r < rows && c >= 0 && c < columns) {
                if (dist[neighbor] === undefined || dist[neighbor] === Infinity) {
                    dist[neighbor] = dist[current] + 1;
                    prev[neighbor] = current;
                    queue.push(neighbor);
                }
            }
        }
    }

    // Reconstruir el camino desde el nodo final
    let step = end;
    while (step !== null) {
        path.unshift(step);
        step = prev[step];
    }

    return path.map(coord => coord.split('-').map(Number));
}
    no funciono por ser muy complejo
*/ 
export function cache(start, end, visitCallback) {
    const visited = new Set();//Nodos visitados
    const parentMap = new Map();//Busqueda de nodos padres
    const memo = new Map();//Cache

    function recurse(node) {
        if (visitCallback) visitCallback(node);
        if (node === end) {
            const path = [];
            let currentNode = end;
            while (currentNode !== start) {
                path.push(currentNode);
                currentNode = parentMap.get(currentNode);
            }
            path.push(start);
            path.reverse();
            return path;
        }

        if (memo.has(node)) {//Si el nodo esta en cache
            return memo.get(node);//Obtiene el nodo
        }

        visited.add(node);//Definimos el nodo como visitado

        for (const neighbor of node.getNeighbors()) {//Iteracion de los vecinos del nodo 
            if (!visited.has(neighbor) && neighbor.transitable !== false) {//Verificacion si es transitable y tiene vecinos
                parentMap.set(neighbor, node);//Se lo añade y se busca el siguiete
                const path = recurse(neighbor);
                if (path.length > 0) {
                    memo.set(node, path);//S pone el nodo y su ruta en el cache
                    return path;
                }
            }
        }

        memo.set(node, []);//Memoriza
        return [];//Si no hay ruta se retorna un array vacio
    }

    return recurse(start);//Inicio 
}
