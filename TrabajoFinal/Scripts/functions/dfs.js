export function dfs(start, end, visitCallback) {
    const stack = [start];//Pila para los nodos
    const visited = new Set();//Nodos visitados
    const parentMap = new Map();//Ruta
    visited.add(start);//Nodo de inicio añadido a nodos visitados

    while (stack.length > 0) {
        const node = stack.pop();//Nodo al tope de la pila

        if (visitCallback) visitCallback(node);//Se verifica que no sea nula 
        //Siempre que pase por nodo se ejecutara visitCallBack, lo usamos para pintr los nodos
        if (node === end) {//Si el nodo de fin es igual al de inicio es pq se encontro la ruta
            const path = [];
            let currentNode = end;
            while (currentNode !== start) {//Recontruye la ruta
                path.push(currentNode);
                currentNode = parentMap.get(currentNode);
            }
            path.push(start);//Se añaden los nodos
            path.reverse();//Se imprime al reves para que este en orden 
            return path;
        }

        node.getNeighbors().forEach(neighbor => {//Iteracion de los vecinos del nodo
            if (!visited.has(neighbor) && neighbor.transitable !== false) {//Si el vecino es transitable y no ha sido 
                //Visitado
                stack.push(neighbor);//Añade el vecino
                visited.add(neighbor);//Se lo marca como visitado
                parentMap.set(neighbor, node);//El nodo actua es el ppadre del siguiente 
            }
        });
    }
//Si no se encuentra ruta se retorna un arreglo vacio
    return [];
}
