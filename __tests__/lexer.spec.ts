import lexer from '../src/lexer';
import LexerResult from './lexer.json';

describe('测试Lexer', () => {
  test('正确生成Tokens', () => {
    const testStr = "var test === 'hello test';c = 2;d = 'another string' + 2;function(a = 3, b = 4) { var c = [4];return c; }";
    const tokens = lexer(testStr);
    expect(tokens).toEqual(LexerResult);
  });
});