import { CharMapItem } from "../lexer/charMap";
import { Token } from "../lexer/types";

export interface Grammar {
  bnf: Symbol[];
  hasEpsilon?: boolean;
  firstSet: CharMapItem[];
  followSet: CharMapItem[];
  astCreator?: AstCreator;
  isStop?: boolean;
}

export type Symbol = (token: Token) => Grammar;

export type AstNode = any;

type AstCreator = (astArr: AstNode[]) => AstNode;
