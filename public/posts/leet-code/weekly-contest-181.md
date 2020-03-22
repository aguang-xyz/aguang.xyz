# Mar 22, 2020 - Leet Code Weekly Contest 181

## 1. [Create Target Array in the Given Order](https://leetcode.com/contest/weekly-contest-181/problems/create-target-array-in-the-given-order/)

Naive, no need to talk.

```{c}
int* createTargetArray(int* nums, int numsSize, int* index, int indexSize, int* returnSize){

    int i, j, *ret = (int*) malloc(sizeof(int) * numsSize);
    
    for (i = 0; i < numsSize && i < indexSize; i++) {
        
        for (j = i; j > index[i]; j--) {
            
            ret[j] = ret[j - 1];
        }
        
        ret[index[i]] = nums[i];
    }
    
		*returnSize = numsSize;
    
    return ret;
}
```

## 2. [Four Divisors](https://leetcode.com/contest/weekly-contest-181/problems/four-divisors/)

$ O(nums.length \times \sqrt {Max(nums)}) $

```{c}
int countDivisors(int x) {
    
    int i, j, count = 0, sum = 0;
    
    for (i = 1; i <= sqrt(x); i++) {
        
        if (x % i == 0) {
            
            j = x / i;
            
            count += (i == j) ? 1 : 2;
            
            sum += (i == j) ? i : (i + j);
        }
    }
    
    return count == 4 ? sum : 0;
}

int sumFourDivisors(int* nums, int numsSize){

    int i, sum = 0;
    
    for (i = 0; i < numsSize; i++) {
        
       sum += countDivisors(nums[i]);
    }
    
    return sum;
}
```

## 3. [Check if There is a Valid Path in a Grid](https://leetcode.com/contest/weekly-contest-181/problems/check-if-there-is-a-valid-path-in-a-grid/)

DFS.

```{c}
int L = 0, R = 1, U = 2, D = 3;

int ability[][4] = {
    
    { 1, 1, 0, 0 },
    { 0, 0, 1, 1 },
    { 1, 0, 0, 1 },
    { 0, 1, 0, 1 },
    { 1, 0, 1, 0 },
    { 0, 1, 1, 0 }
};

bool dfs(bool **visit, int **grid, int m, int n, int x, int y) {
    
    if (!visit[x][y]) {
        
        visit[x][y] = true;
        
        if (x == (m - 1) && y == (n - 1)) {
            
            return true;
        }
        
        // Up
        if (x > 0 && ability[grid[x - 1][y]][D] && ability[grid[x][y]][U] && dfs(visit, grid, m, n, x - 1, y)) {
                
            return true;
        }
        
        // Down
        if (x < (m - 1) && ability[grid[x + 1][y]][U] && ability[grid[x][y]][D] && dfs(visit, grid, m, n, x + 1, y)) {
            
            return true;
        }
        
        // Left
        if (y > 0 && ability[grid[x][y - 1]][R] && ability[grid[x][y]][L] && dfs(visit, grid, m, n, x, y - 1)) {
            
            return true;
        }
        
        // Right
        if (y < (n - 1) && ability[grid[x][y + 1]][L] && ability[grid[x][y]][R] && dfs(visit, grid, m, n, x, y + 1)) {
            
            return true;
        }
    }
    
    return false;
}

bool hasValidPath(int** grid, int gridSize, int* gridColSize){

    int i, j, m = gridSize, n = gridColSize[0];
    
    bool **visit = (int**) malloc(sizeof(bool*) * m);
    
    for (i = 0; i < m; i++) {
        
        visit[i] = (int*) malloc(sizeof(bool) * n);
        
        for (j = 0; j < n; j++) {
            
            visit[i][j] = false;
            
            grid[i][j]--;
        }
    }
    
    return dfs(visit, grid, m, n, 0, 0);
}
```

## 4. [Longest Happy Prefix](https://leetcode.com/contest/weekly-contest-181/problems/longest-happy-prefix/)

You should know what is **Partial Match Table** (A concept from KMP algorithm).

```{c}
char * longestPrefix(char * s){

    int i, j, len = strlen(s);
    
    int *pmt = (int*) malloc(sizeof(int) * len);
    
    char *ret;
    
    // Calculate Partial Match Table.
    pmt[0] = -1;
    
    for (i = 0, j = -1; i < len - 1; ) {
        
        
        if (j == -1 || s[i] == s[j]) {
            
            i++, j++;
            
            pmt[i] = j;
        } else {
            
            j = pmt[j];
        }
    }
    
    // Generate Answer
    
    for (j = pmt[len - 1]; j != -1 && s[j] != s[len - 1]; j = pmt[j]);
    
    ret = (char*) malloc(sizeof(char) * (j + 2));
    
    for (i = 0; i <= j; i++) {
        
        ret[i] = s[i];
    }
    
    ret[j + 1] = '\0';
    
    return ret;
}
```
