import { keywordTokenMap, punctuatorTokenMap, CharMap, CharMapItem } from "./charMap";
import { Token } from "./types";

export const isCharMatch = (str: string, charMapItem: CharMapItem) => {
  if (!charMapItem) return false;
  const { type, value, test: reg } = charMapItem;
  if (reg && reg.test(str)) {
    return true;
  }
  return value === str;
}
// 比较stack里面type对不上
export const isTokenEq = (token: Token, charMapItem: CharMapItem) => {
  // 一个token实例是否和tokenType相等
  return token && token.type === charMapItem.type;
}

export const isNumericChar = (str: string) => {
  return isCharMatch(str, CharMap.Numeric);
}

export const isIdentifierChar = (str: string) => {
  return isCharMatch(str, CharMap.Identifier);
}

export const isWhiteSpace = (str: string) => {
  return isCharMatch(str, CharMap.Whitespace);
}
export const isKeyword = (str: string) => {
  return keywordTokenMap.has(str);
}