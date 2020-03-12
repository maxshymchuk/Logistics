import { PathfinderInput } from "../../models/locations.models";

export function pathfinder(params: PathfinderInput) {
  let { numVertices, startVertex, endVertex, edges } = params;

  const path: number[] = [];

  let done = new Array<boolean>(numVertices).fill(false);
  done[startVertex] = true;
  let pathLengths = new Array<number>(numVertices);
  let predecessors = new Array<number>(numVertices);
  for (let i = 0; i < numVertices; i++) {
    pathLengths[i] = edges[startVertex][i];
    if (edges[startVertex][i] != Infinity) {
      predecessors[i] = startVertex;
    }
  }
  pathLengths[startVertex] = 0;
  for (let i = 0; i < numVertices - 1; i++) {
    let closest = -1;
    let closestDistance = Infinity;
    for (let j = 0; j < numVertices; j++) {
      if (!done[j] && pathLengths[j] < closestDistance) {
        closestDistance = pathLengths[j];
        closest = j;
      }
    }
    done[closest] = true;
    for (let j = 0; j < numVertices; j++) {
      if (!done[j]) {
        let possiblyCloserDistance = pathLengths[closest] + edges[closest][j];
        if (possiblyCloserDistance < pathLengths[j]) {
          pathLengths[j] = possiblyCloserDistance;
          predecessors[j] = closest;
        }
      }
    }
  }
  while (endVertex != startVertex) {
    path.unshift(endVertex);
    endVertex = predecessors[endVertex];
  }
  path.unshift(startVertex);

  return path;
}
