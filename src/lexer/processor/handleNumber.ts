import { CharMap } from "../charMap";
import { isNumericChar } from "../matchUtils";
import { LexerUtils, Token } from "../types";

export const handleNumber = {
  test: (char: string) => {
    return isNumericChar(char);
  },
  process: (input: string, utils: LexerUtils) => {
    let buff = '';
    const { pushToken, next, peekChar } = utils;
    while (isNumericChar(peekChar())) {
      buff += peekChar();
      next();
    }
    pushToken({
      type: CharMap.Numeric.type,
      lexeme: buff,
    });
  }
}

