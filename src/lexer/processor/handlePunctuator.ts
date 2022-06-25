import { error } from "../../utils";
import { CharMap, punctuatorTokenMap } from "../charMap";
import { isWhiteSpace } from "../matchUtils";
import { TokenTypes } from "../tokenTypes";
import { LexerUtils } from "../types";

export const handleWhiteSpace = {
  test: (char: string) => {
    // console.log('is white space')
    return isWhiteSpace(char);
  },
  process: (input: string, utils: LexerUtils) => {
    const { next, peekChar } = utils;
    while (isWhiteSpace(peekChar())) {
      next();
    }
  }
}

// 处理单个长度的标点符合
export const handlePunctuator = {
  test: (currChar: string) => {
    return punctuatorTokenMap.has(currChar);
  },
  process: (input: string, utils: LexerUtils) => {
    const { next, pushToken, peekChar } = utils;
    const currChar = peekChar();
    const { type, value } = punctuatorTokenMap.get(currChar)!;
    pushToken({
      type,
      lexeme: value!,
    });
    next();
  }
}

export const handleEqual = {
  test: (currChar: string) => {
    return /^={1,3}|!=|!==$/.test(currChar)
  },
  process: (input: string, utils: LexerUtils) => {
    let buff = '';
    let type!: TokenTypes;
    const { next, pushToken, peekChar } = utils;
    let currChar = peekChar();
    while (currChar === '=') {
      buff += '=';
      switch (buff) {
        case '=': {
          type = CharMap.Assignment.type;
          break;
        }
        case '==':
          type = CharMap.Equal.type;
          break;
        case '===':
          type = CharMap.StringEqual.type;
          break;
        default:
          error(`unexpected equal token ${buff}`);
      }
      next();
      currChar = peekChar();
    }
    if (buff.length > 3) {
      error(`unexpected equal token: ${buff}`);
    }
    pushToken({
      type,
      lexeme: buff,
    });
  }
}