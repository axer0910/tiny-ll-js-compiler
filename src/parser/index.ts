import lexer from '../lexer/index';
import { error } from '../utils';
import { Sentences, Block } from './grammar';
import { AstNode, Grammar, Symbol } from './types';
import { CharMap } from '../lexer/charMap';
import { isTokenEq } from '../lexer/matchUtils';

export default function parser(input: string) {
    let index = 0;
    const tokens = lexer(input);
    console.log('lexer tokens', tokens);
    const stack: Symbol[] = [Block, Sentences];
    const astArray: AstNode[] = [];

    function isEof() {
      return index >= tokens.length;
    }

    function match(gram: Grammar) {
      return gram.firstSet.some(token => {
        if (token.type === CharMap.Eof.type) return isEof();
        return isTokenEq(tokens[index], token)
      });
    }

    function followMatch(gram: Grammar) {
        return gram.hasEpsilon && gram.followSet.some(token => {
          if (token.type === CharMap.Eof.type) return isEof();
          return isTokenEq(tokens[index], token)
        });
    }

    function isTerminal(gram: Grammar) {
        return !gram.bnf || !gram.bnf.length;
    }

    function isStop(gram: Grammar) {
        return !!gram.isStop;
    }

    function processTerminal(gram: Grammar) {
        const { astCreator } = gram;
        if(astCreator) {
            const node = astCreator(astArray);
            node && astArray.push(node);
        }
    }
    
    while(stack.length) {
        // console.log('stack now', stack);
        // console.log('ast arr now', astArray);
        const topItem = stack[0](tokens[index]); // 栈顶
        if(isStop(topItem)) {
          topItem.astCreator!(astArray); // 遇到stop，将astStack转换为树结构
          stack.splice(0, 1); // 弹出ExpStop
        }else if(match(topItem)) {
          // 当前token match一个符号
          // 出栈一个终结符
          // 入栈多个当前终结符中的bnf
          stack.splice(0, 1, ...topItem.bnf);
          if(isTerminal(topItem)) {
            // 如果当前栈顶是终结符
            processTerminal(topItem);  // astStack中push一个astCreator运行后的对象
            index++;
          }
        } else if(followMatch(topItem)) {
            stack.splice(0, 1);
        } else {
          // 语法错误（比如左右括号不匹配）
            console.log('curr err bnfs', stack);
            console.log('curr astArray ', astArray);
            console.log('curr err token ', tokens[index]);
            
            error('syntax', tokens[index] && tokens[index].lexeme);
        }
    }
    return astArray;
};
