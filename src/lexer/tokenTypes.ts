// todo 把type改写枚举

export const enum TokenTypes {
  Addition = 'addition',
  Subtract = 'subtract',
  Multiplication = 'multiplication',
  Division = 'division',
  LeftParen = 'leftParen',
  RightParen = 'rightParen',
  LeftBrace = 'leftBrace',
  RightBrace = 'rightBrace',
  LeftBracket = 'leftBracket',
  RightBracket = 'rightBracket',
  Identifier = 'identifier',
  Terminator = 'terminator',
  Comma = 'comma',
  Numeric = 'number',
  Whitespace = 'whitespace',
  String = 'string',
  Assignment = 'assignment',
  Equal = 'equal',
  StrictEqual = 'strictEqual',
  NotEqual = 'notEqual',
  NotStrictEqual = 'notStrictEqual',
  Eof = 'eof',
  If = 'condition_if',
  Else = 'condition_else',
  While = 'while',
  For = 'for',
  Return = 'return',
  Function = 'function',
  Var = 'var',
  True = 'true',
  False = 'false',
  Null = 'null',
  Undefined = 'undefined',
  Nan = 'nan',
  Infinity = 'infinity',
  This = 'this',
  New = 'new',
  In = 'in',
  Instanceof = 'instanceof',
  Typeof = 'typeof',
  Delete = 'delete',
}

export const punctuatorTokenMap = new Map();
