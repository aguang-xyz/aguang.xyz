# Leet Code Weekly Contest 189

## 1. Number of Students Doing Homework at a Given Time

No need to talk.

```javascript
var busyStudent = function(startTime, endTime, queryTime) {

  return startTime.filter((idx, s) =>
		s <= queryTime && queryTime <= endTime[idx]).length;
};
```

## 2. Rearrange Words in a Sentence

Multi-key sort.

```javascript
var arrangeWords = function(text) {
    
  let words = text.split(' ')
    .map((word, idx) => ({ word: word.toLowerCase(), idx }))
    .sort((x, y) => {
    
      if (x.word.length < y.word.length) return -1;
      if (x.word.length > y.word.length) return 1;

      return x.idx < y.idx ? -1 : 1;
    })
    .map(x => x.word)
    .join(' ');
  
  return words[0].toUpperCase() + words.substr(1);
};
```

## 3. People Whose List of Favorite Companies Is Not a Subset of Another List

Hash.

```javascript
var peopleIndexes = function(favoriteCompanies) {
  
  return favoriteCompanies
    .map((x, i) =>
      favoriteCompanies.some((y, j) =>
        i !== j && x.every(xi => y.includes(xi))) ? null : i)
    .filter(x => x !== null);
};
```

## 4. Maximum Number of Darts Inside of a Circular Dartboard

The best center could be:

1. a given point; or
2. the center of circumcircle of two given points.

```javascript
var count = function(x, y, r, points) {
  
  return points.map(p => [p[0] - x, p[1] - y])
    .filter(d => d[0] * d[0] + d[1] * d[1] <= r * r).length;
}

var centers = function(x1, y1, x2, y2, r) {
  
  let dx = x2 - x1, dy = y2 - y1;
  
  let d = Math.sqrt(dx * dx + dy * dy);
  
  let ax = x1 + dx / 2, ay = y1 + dy / 2;
  
  if (d === 2 * r) {
    
    return [{ x: ax, y: ay }];
  }
  
  if (d > 2 * r) {
    
    return [];
  }
  
  let h = Math.sqrt(r * r - d * d / 4);
  
  return [{
    x: ax - dy / d * h,
    y: ay + dx / d * h
  }, {
    x: ax + dy / d * h,
    y: ay - dx / d * h
  }];
}

var numPoints = function(points, r) {
  
  let ans = Math.max(...(points.map(p => count(p[0], p[1], r, points))));
  
  points.forEach((x, i) =>
    points.slice(i + 1).forEach(y =>
      centers(x[0], x[1], y[0], y[1], r)
        .forEach(p => ans = Math.max(ans, count(p.x, p.y, r, points)))));
  
  return ans;
};
```
