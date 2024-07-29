export function recursivity(start, end, visitCallback) {
    const visited = new Set();
    const parentMap = new Map();

    function recurse(node) {
        if (visitCallback) visitCallback(node);
        if (node === end) {//Caso base
            //Si el nodo de inicio es igual al de final
            const path = [];
            let currentNode = end;
            while (currentNode !== start) {//reconsrutye el camino
                path.push(currentNode);
                currentNode = parentMap.get(currentNode);
            }
            path.push(start);
            path.reverse();//Pone en orden el camino
            return path;
        }

        visited.add(node);//El nodo es marcado como visitado

        for (const neighbor of node.getNeighbors()) {
            if (!visited.has(neighbor) && neighbor.transitable !== false) {//Se verifica que el nodo ntenga vecino
                //Y sea trasitable
                parentMap.set(neighbor, node);//Se añade el nodo y se define el siguiente
                const path = recurse(neighbor);//LLama a la funcion de manera recursiva
                if (path.length > 0) {
                    return path;
                }
            }
        }

        return [];//Si no hay camino se retorna un camino vacio
    }

    return recurse(start);//Inicio busqueda recursiva
}
