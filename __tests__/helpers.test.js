const {format_plural} = require('../utils/helpers');


  
  test('format_plural() returns a pluralized word', () => {
    const word1 = format_plural('tiger', 1);
    const word2 = format_plural('lion', 2);
  
    expect(word1).toBe('tiger');
    expect(word2).toBe('lions');
  });