import { node } from '../constants';
export const manhattenDistance = (node: node, finishNode: node) => {
    let x = Math.abs(node.row - finishNode.row);
    let y = Math.abs(node.col - finishNode.col);
    return x + y;
};
