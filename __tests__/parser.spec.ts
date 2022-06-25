import parser from '../src/parser';

describe('测试Lexer', () => {
  test('正确生成Tokens', () => {
    const testStr = "{test = 'test'; b = 2 * 3; c = testb;}";
    const astNode = parser(testStr);
    console.log('ast node is', JSON.stringify(astNode, null ,2));
  });
});