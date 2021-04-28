function levensthein(
  a: string,
  b: string,
  ignoreCase: boolean = false
): number {
  const firstString = ignoreCase ? a.toLowerCase() : a;
  const secondString = ignoreCase ? b.toLowerCase() : b;

  if (firstString === secondString) {
    return 0;
  }

  var n = a.length,
    m = b.length,
    matrix: number[][] = [];
  for (var i = -1; i < n; i++) {
    matrix[i] = [];
    matrix[i][-1] = i + 1;
  }
  for (var j = -1; j < m; j++) {
    matrix[-1][j] = j + 1;
  }
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < m; j++) {
      var cout = firstString.charAt(i) == secondString.charAt(j) ? 0 : 1;
      matrix[i][j] = Math.min(
        1 + matrix[i][j - 1],
        1 + matrix[i - 1][j],
        cout + matrix[i - 1][j - 1]
      );
    }
  }
  return matrix[n - 1][m - 1];
}

export default levensthein;
