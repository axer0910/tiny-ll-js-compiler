import { CharMap } from '../../lexer/charMap';
import { Addition, assignment, division, identifier, leftBrace, leftParentheses, multiple, number, rightBrace, rightParentheses, string, terminator } from './terminators';
import { Token } from '../../lexer/types';
import { BraceStop, ExpStop } from './astCreator';
import { isTokenEq } from '../../lexer/matchUtils';

// todo
// match block { }
// match if else
// match function param
// match return
// match array
// match object
// match getter

// 花括号可以用一个stack来表示


// export function Condition() {
//   return {
//     bnf: [],
//     hasEpsilon: true,
//     firstSet: [
//       CharMap.LeftBrace
//     ],
//     followSet: [
//       CharMap.Identifier,
//       CharMap.LeftBrace
//     ]
//   };
// }

/**
 * Block -> leftBrace Block Sentences rightBrace | 空
 */
export function Block() {
  return {
    bnf: [
      leftBrace,
      Block, Sentences,
      rightBrace, 
      BraceStop
    ],
    hasEpsilon: true,
    firstSet: [
      CharMap.LeftBrace
    ],
    followSet: [
      CharMap.Identifier
    ]
  };
}

/**
 * Sentences -> Sentence Terminator Sentences | 空
 */
export function Sentences() {
  return {
    bnf: [Block, Sentence, terminator, Sentences],
    hasEpsilon: true,
    firstSet: [
      CharMap.LeftBrace,
      CharMap.Identifier,
    ],
    followSet: [CharMap.RightBrace, CharMap.Eof]
  };
}

/**
 * Sentence -> AddExp
 */
export function Sentence() {
  return {
    bnf: [Assignment],
    firstSet: [CharMap.Identifier, CharMap.LeftBrace],
  };
}


function Assignment() {
  return {
    bnf: [identifier, assignment, AddExp, ExpStop],
    firstSet: [CharMap.Identifier],
  };
}


/**
 * add -> + | -
 */
function add(token: Token) {
  const bnf = isTokenEq(token, CharMap.Addition) 
    ? [Addition] 
    : [Subtract];
  return {
    bnf,
    firstSet: [CharMap.Addition, CharMap.Subtract],
  };
}

/**
 * mul -> * | /
 */
function mul(token: Token) {
  const bnf = isTokenEq(token, CharMap.Multiplication) 
    ? [multiple] 
    : [division];
  return {
    bnf,
    firstSet: [CharMap.Multiplication, CharMap.Division],
  };
}

function Subtract(token: Token) {
  return {
    bnf: [],
    firstSet: [CharMap.Subtract],
    astCreator() {
      return {
        opt: token.type,
        leftNode: {},
        rightNode: {},
      };
    }
  };
}

/**
 * AddExp -> MulExp AddExp1
 * // 只有TOKEN_TYPES.Identifier, CharMap.LeftBrace开头，才能应用AddExp处理bnf
 * // MulExp可以匹配字母，乘法（可略过）左括号
 * // addExp1可匹配加法，左括号，。。。，或者略过 （）空括号
 */
function AddExp() {
  return {
    bnf: [MulExp, AddExp1],
    firstSet: [
      CharMap.Numeric,
      CharMap.Identifier,
      CharMap.LeftParen,
      CharMap.String
    ],
  };
}

/**
 * AddExp1 -> add MulExp AddExp1 | epsilon（空）
 */
function AddExp1() {
  return {
    bnf: [add, MulExp, ExpStop, AddExp1],
    firstSet: [CharMap.Addition, CharMap.Subtract],
    hasEpsilon: true,
    followSet: [
      CharMap.RightParen,
      CharMap.String,
      CharMap.Terminator
    ],
  }
}

/**
 * MulExp -> Exp MulExp1
 */
function MulExp() {
  return {
    bnf: [Exp, MulExp1],
    firstSet: [
      CharMap.Numeric,
      CharMap.Identifier,
      CharMap.String,
      CharMap.LeftParen,
    ]
  };
}

/**
 * MulExp1 -> mul Exp MulExp1 | epsilon（空）
 */
function MulExp1() {
  return {
    bnf: [mul, Exp, ExpStop, MulExp1],
    firstSet: [CharMap.Multiplication, CharMap.Division],
    hasEpsilon: true,
    followSet: [
      CharMap.Addition,
      CharMap.Subtract,
      CharMap.RightParen,
      CharMap.String,
      CharMap.Terminator,
    ],
  };
}

/**
 * Exp -> identifier | Numeric | string | (AddExp)
 */
function Exp(token: Token) {
  let bnf;
  if (isTokenEq(token, CharMap.Identifier)) {
    bnf = [identifier];
  } else if (isTokenEq(token, CharMap.Numeric)) {
    bnf = [number];
  } else if (isTokenEq(token, CharMap.String)) {
    bnf = [string];
  } else {
    bnf = [
      leftParentheses,
      AddExp,
      rightParentheses
    ];
  }
  return {
    bnf,
    firstSet: [
      CharMap.String,
      CharMap.Numeric,
      CharMap.Identifier,
      CharMap.LeftParen
    ],
  };
}

