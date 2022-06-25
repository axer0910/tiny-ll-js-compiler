import { error } from "../../utils";
import { CharMap } from "../charMap";
import { LexerUtils } from "../types";
 
export const handleString = {
  test: (currChar: string) => {
    return currChar === "'";
  },
  process: (input: string, utils: LexerUtils) => {
    let buff = '';
    const { next, pushToken, peekChar } = utils;
    next();
    let currChar = peekChar();
    do {
      buff += currChar;
      next();
      currChar = peekChar();
    } while(currChar !== "'");
    pushToken({
      type: CharMap.String.type,
      lexeme: buff,
    });
    next();
  }
}