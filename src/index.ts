import parser from '../src/parser';

describe('测试Lexer', () => {
  test('测试赋值表达式', () => {
    const testStr = "test = 1";
    const tokens = parser(testStr);
    expect(tokens).toEqual(LexerResult);
  });
});