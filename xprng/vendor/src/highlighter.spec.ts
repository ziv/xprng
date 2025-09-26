import {Highlighter} from './highlighter';

describe('Highlighter', () => {
  it('should throw an exception for missing client', () => {
    const highlighter = new Highlighter();
    expect(() => highlighter.highlight('code', 'ts')).toThrow();
  });
});
