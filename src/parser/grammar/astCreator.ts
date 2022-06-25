import { AstNode } from './../types';

type Processor = (astArray: AstNode[]) => any;

function createStop(processor: Processor) {
  return () => ({
    isStop: true,
    astCreator(astArray: AstNode[]) {
      return processor(astArray);
    }
  });
}

// 在合适的位置放置Stop构建AST
// 当astArray长度为3时，取下标1为根节点，下标0与2作为左右节点
export const ExpStop = createStop((astArray: AstNode[]) => {
  const centerIndex = astArray.length - 2;
  astArray.splice(centerIndex - 1, 3, {
    ...astArray[centerIndex],
    leftNode: astArray[centerIndex - 1],
    rightNode: astArray[centerIndex + 1],
  })
});

const braceStartPosStack: number[] = [];

// 构建block语句区块数组
export const BraceStop = createStop((astArray) => {
  const startStackPos = braceStartPosStack.pop()!;
  console.log('startStackPos', startStackPos, astArray);
  astArray.splice(startStackPos, astArray.length - startStackPos, {
    opt: 'block_body',
    value: astArray.slice(startStackPos, astArray.length)
  });
});

export const leftBraceAstCreator = (astArray: AstNode[]) => {
  braceStartPosStack.push(astArray.length);
}
