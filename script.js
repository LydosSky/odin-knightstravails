// Find shortest path from to to
function knightMoves(from, to) {
  const knightMove = [
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
  ];

  function withinBoundaries(x, y) {
    return x < 8 && x >= 0 && y < 8 && y >= 0;
  }
  // Create possiblemove of the from vertex
  // abiding movement rules of knight and board
  function possibleMoves(from) {
    const moves = [];
    const [fromX, fromY] = from;

    for (let [dx, dy] of knightMove) {
      const newX = fromX + dx;
      const newY = fromY + dy;
      if (withinBoundaries(newX, newY)) {
        moves.push([newX, newY]);
      }
    }

    return moves;
  }

  function breadthFirstSearch(from, to) {
    const distances = {};
    const prevVertex = {};
    const queue = [];
    distances[from] = 0;

    queue.push(from);

    while (queue.length !== 0) {
      const currentVertex = queue.shift();

      if (currentVertex[0] === to[0] && currentVertex[1] === to[1]) break;
      const moves = possibleMoves(currentVertex);
      moves.forEach((move) => (distances[move] = Infinity));

      for (let move of moves) {
        if (distances[move] === Infinity) {
          distances[move] = distances[currentVertex] + 1;
          prevVertex[move] = currentVertex;
          queue.push(move);
        }
      }
    }

    if (distances[to] === Infinity) return "Node is not reachable";

    // Reset from node
    distances[from] = 0;
    prevVertex[from] = null;

    const path = [];
    let current = to;
    while (current !== null) {
      path.push(current);
      current = prevVertex[current];
    }

    const steps = distances[to];
    return { path, steps };
  }

  const result = breadthFirstSearch(from, to);
  if (typeof result === "string") {
    console.log(result);
  }

  const { path, steps } = result;
  function printEndResult(path, steps) {
    console.log(`You made it in ${steps} moves, Here's your path: `);
    while (path.length !== 0) {
      console.log(path.pop());
    }
  }

  printEndResult(path, steps);
}

knightMoves([3, 3], [3, 6]);
