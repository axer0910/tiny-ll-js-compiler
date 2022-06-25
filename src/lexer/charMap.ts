import { TokenTypes } from './tokenTypes';

export interface CharMapItem {
  type: TokenTypes;
  value?: string;
  test?: RegExp;
}

// todo 名字再想想
export const ComplexCharMap: {[key: string]: CharMapItem} = {
  Identifier: {
    type: TokenTypes.Identifier,
    test: /^[a-zA-Z_$][a-zA-Z0-9_$]*$/,
  },
  Numeric: {
    type: TokenTypes.Numeric,
    test: /[0-9]/,
  },
  Whitespace: {
    type: TokenTypes.Whitespace,
    test: /^\s+$/,
  },
  // todo 特殊的匹配逻辑，考虑封装函数？
  String: {
    type: TokenTypes.String
  },
  Assignment: {
    type: TokenTypes.Assignment
  },
  Equal: {
    type: TokenTypes.Equal,
  },
  StringEqual: {
    type: TokenTypes.StrictEqual,
  },
  Eof: {
    type: TokenTypes.Eof,
  }
}

export const PunctuatorCharMap: {[key: string]: CharMapItem} = {
  Addition: {
    type: TokenTypes.Addition,
    value: '+',
  },
  Subtract: {
    type: TokenTypes.Subtract,
    value: '-',
  },
  Multiplication: {
    type: TokenTypes.Multiplication,
    value: '*',
  },
  Division: {
    type: TokenTypes.Division,
    value: '/',
  },
  LeftParen: {
    type: TokenTypes.LeftParen,
    value: '(',
  },
  RightParen: {
    type: TokenTypes.RightParen,
    value: ')',
  },
  LeftBrace: {
  type: TokenTypes.LeftBrace,
    value: '{',
  },
  RightBrace: {
    type: TokenTypes.RightBrace,
    value: '}',
  },
  Terminator: {
    type: TokenTypes.Terminator,
    value: ';',
  },
  Comma: {
    type: TokenTypes.Comma,
    value: ',',
  },
  LeftBracket: {
    type: TokenTypes.LeftBracket,
    value: '[',
  },
  RightBracket: {
    type: TokenTypes.RightBracket,
    value: ']',
  },
  
}

export const KeywordsMap: {[key: string]: CharMapItem} = {
  If: {
    type: TokenTypes.If,
    value: 'if',
  },
  Else: {
    type: TokenTypes.Else,
    value: 'else',
  },
  While: {
    type: TokenTypes.While,
    value: 'while',
  },
  For: {
    type: TokenTypes.For,
    value: 'for',
  },
  Return: {
    type: TokenTypes.Return,
    value: 'return',
  },
  Function: {
    type: TokenTypes.Function,
    value: 'function',
  },
  Var: {
    type: TokenTypes.Var,
    value: 'var',
  },
  True: {
    type: TokenTypes.True,
    value: 'true',
  },
  False: {
    type: TokenTypes.False,
    value: 'false',
  },
  Null: {
    type: TokenTypes.Null,
    value: 'null',
  },
  Undefined: {
    type: TokenTypes.Undefined,
    value: 'undefined',
  },
  NaN: {
    type: TokenTypes.Nan,
    value: 'NaN',
  },
  Infinity: {
    type: TokenTypes.Infinity,
    value: 'Infinity',
  },
  This: {
    type: TokenTypes.This,
    value: 'this',
  },
  New: {
    type: TokenTypes.New,
    value: 'new',
  },
  In: {
    type: TokenTypes.In,
    value: 'in',
  },
  instanceof: {
    type: TokenTypes.Instanceof,
    value: 'instanceof',
  },
  typeof: {
    type: TokenTypes.Typeof,
    value: 'typeof',
  },
  delete: {
    type: TokenTypes.Delete,
    value: 'delete',
  },
}

export const CharMap = {
  ...ComplexCharMap,
  ...PunctuatorCharMap,
}

export const punctuatorTokenMap: Map<string, CharMapItem> = new Map();

Object.keys(PunctuatorCharMap).forEach((key: string) => {
  punctuatorTokenMap.set(PunctuatorCharMap[key].value!, PunctuatorCharMap[key]) 
});

export const keywordTokenMap = new Map();
Object.keys(KeywordsMap).forEach(key => {
  keywordTokenMap.set(KeywordsMap[key].value, KeywordsMap[key]) 
});
