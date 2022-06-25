import { CharMap, keywordTokenMap } from "../charMap";
import { isIdentifierChar, isNumericChar } from "../matchUtils";
import { LexerUtils, Token } from "../types";

export const handleIdentifier = {
  test: (char: string) => {
    return isIdentifierChar(char);
  },
  process: (input: string, utils: LexerUtils) => {
    let buff = '';
    const { next, pushToken, peekChar } = utils;
    // 处理字母
    while (isIdentifierChar(peekChar())) {
      buff += peekChar();
      next();
    }
    // 匹配的标识符是关键词
    const keywordToken = keywordTokenMap.get(buff);
    // console.log('is keywordToken', keywordToken);
    if (keywordToken) {
      pushToken(keywordToken);
    } else {
      // 匹配的标识符作为变量
      pushToken({
        type: CharMap.Identifier.type,
        lexeme: buff,
      });
    }
  }
}

