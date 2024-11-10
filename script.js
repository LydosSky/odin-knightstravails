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

  function createVertexObject(pos) {
    return { explored: false, l: Infinity, pos };
  }

  function withinBoundaries(x, y) {
    return x < 8 && x >= 0 && y < 8 && y >= 0;
  }

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
    let numberOfSteps = 0;
    const explored = {};
    const lValue = {};
    explored[from] = true;
    lValue[from] = 0;
    const queue = [from];
    while (queue.length !== 0) {
      const vertex = queue.shift();

      for (let move of possibleMoves(vertex)) {
        if (!explored[move]) {
          explored[move] = true;
          lValue[move] = lValue[vertex] + 1;
          queue.push(move);
        }
      }
    }

    if (explored[to]) {
      numberOfSteps = lValue[to];
    }

    return numberOfSteps;
  }

  return breadthFirstSearch(from, to);
}

console.log(knightMoves([3, 3], [4, 3]));
