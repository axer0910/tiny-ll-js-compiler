import { AstNode } from './../types';
import { CharMap } from "../../lexer/charMap";
import { isTokenEq } from "../../lexer/matchUtils";
import { Token } from "../../lexer/types";
import { leftBraceAstCreator } from './astCreator';

export function multiple(token: Token) {
  return {
    bnf: [],
    firstSet: [CharMap.Multiplication],
    astCreator() {
      return {
        opt: token.type,
        leftNode: {},
        rightNode: {},
      };
    }
  };
}

export function division(token: Token) {
  return {
    bnf: [],
    firstSet: [CharMap.Division],
    astCreator() {
      return {
        opt: token.type,
        leftNode: {},
        rightNode: {},
      };
    }
  };
}

export function Addition(token: Token) {
  return {
    bnf: [],
    firstSet: [CharMap.Addition],
    astCreator() {
      return {
        opt: token.type,
        leftNode: {},
        rightNode: {},
      };
    }
  };
}

export function assignment(token: Token) {
  return {
    bnf: [],
    firstSet: [CharMap.Assignment],
    astCreator() {
      return {
        opt: token.type,
        leftNode: {},
        rightNode: {},
      };
    }
  };
}

export function number(token: Token) {
  return {
    bnf: [],
    firstSet: [CharMap.Numeric],
    astCreator() {
      return {
        type: token.type,
        value: token.lexeme,
      };
    }
  };
}

export function string(token: Token) {
  return {
    bnf: [],
    firstSet: [CharMap.String],
    astCreator() {
      return {
        type: token.type,
        value: token.lexeme,
      };
    }
  };
}

export function terminator() {
  return {
    bnf: [],
    firstSet: [CharMap.Terminator],
  };
}


export function leftParentheses() {
  return {
    bnf: [],
    firstSet: [CharMap.LeftParen],
  };
}

export function rightParentheses() {
  return {
    bnf: [],
    firstSet: [CharMap.RightParen],
  };
}

export function leftBrace() {
  return {
    bnf: [],
    firstSet: [CharMap.LeftBrace],
    astCreator: leftBraceAstCreator
  };
}

export function rightBrace() {
  return {
    bnf: [],
    firstSet: [CharMap.RightBrace],
  };
}


export function identifier(token: Token) {
  return {
    bnf: [],
    firstSet: [CharMap.Identifier],
    astCreator() {
      return {
        type: 'identifier',
        value: token.lexeme,
      };
    }
  };
}
