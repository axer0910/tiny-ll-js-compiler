import { error } from '../utils';
import { handleIdentifier } from './processor/handleIdentifier';
import { handleNumber } from './processor/handleNumber';
import { handleEqual, handlePunctuator, handleWhiteSpace } from './processor/handlePunctuator';
import { handleString } from './processor/handleString';
import { Token } from './types';

const handlers = [
  handleIdentifier, 
  handleNumber,
  handleWhiteSpace, 
  handlePunctuator, 
  handleEqual,
  handleString
];

export default function lexer(input: string) {
  console.log('input is', input)
  const tokens: Token[] = [];
  let cursor = 0;

  const utils = {
    peekChar: () => {
      if (cursor >= input.length) {
        error('lex', input[cursor]);
      }
      return input[cursor];
    },
    next: () => { cursor ++ },
    pushToken: (token: Token) => { tokens.push(token) },
  }

  while (cursor < input.length) {
    let currChar = input[cursor];
    let matched = false;
    for (const handler of handlers) {
      if (handler.test(currChar)) {
        handler.process(input, utils);
        matched = true;
        break;
      }
    }
    if (!matched) {
      error('lex', input[cursor]);
    }
  }
  return tokens;
}