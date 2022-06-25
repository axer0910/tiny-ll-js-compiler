import { CharMap } from './charMap';
import { TokenTypes } from './tokenTypes';

// lexer匹配出的token对象
export interface Token {
  type: TokenTypes;
  lexeme: string;
}

export interface LexerUtils {
  peekChar: () => string;
  next: () => void;
  pushToken: (token: Token) => void;
}