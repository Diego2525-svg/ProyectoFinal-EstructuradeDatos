export function bfs(start, end, visitCallback) {
    const queue = [start];//Cola de nodos
    const visited = new Set();//Nodos visitados
    const parentMap = new Map();//Mapa con la ruta

    visited.add(start);//El nodo de inicio se añade a los nodos visitados

    while (queue.length > 0) {//
        const node = queue.shift();

        if (visitCallback) visitCallback(node);//Se verifica que no sea nula 
        //Siempre que pase por nodo se ejecutara visitCallBack, lo usamos para pintr los nodos

        if (node === end) {//Si se cumple esta condicion se encontro el camino
            const path = [];//Ruta
            let currentNode = end;//Nodo actual= final de la ruta
            while (currentNode !== start) {
                path.push(currentNode);//Se añaden los nodos
                currentNode = parentMap.get(currentNode);
            }
            //Se añaden los nodos y se los pone en orden
            path.push(start);
            path.reverse();//Se ordena
            //Se retorna
            return path;
        }

        node.getNeighbors().forEach(neighbor => {
            if (!visited.has(neighbor) && neighbor.transitable !== false) {//Si el vecino no fue visitado y es transitable
                queue.push(neighbor);//los pone en la cola
                visited.add(neighbor);
                parentMap.set(neighbor, node);//Rastrea el camino
            }
        });
    }
//Si no hay ruta se retorna un arreglo vacio
    return [];
}
