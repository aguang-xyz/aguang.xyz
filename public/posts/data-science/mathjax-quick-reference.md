# A Brief Introduction of MathJax

[MathJax](https://www.mathjax.org/) is a javascript display engine which can be
easily integrated into web pages. In this article, I want to cover many common
usage of MathJax.

## 1. Basic Grammar

There are two ways to insert a MathJax expression:

  * Insert a inline expression.
  * Insert a block expression.

| mode   | command   | example   | preview |
|:------:|:---------:|:---------:|:-------:|
| inline | `$...$`| `$X^2$`| $X^2$   |
| block  | `$$...$$`| `$$X^2$$`| $$X^2$$ |

### 1.1 Plain Text

| command             | preview             |
|:-------------------:|:-------------------:|
| `\text{plain text}` | $\text{plain text}$ |

### 1.2 Greek Letter

| command   | preview    | command    | preview   | command   | preview    | command    | preview   |
|:---------:|:----------:|:----------:|:---------:|:---------:|:----------:|:----------:|:---------:|
|`A        `|$ A        $|`\alpha   `|$ \alpha   $|`N        `|$ N        $|`\nu      `|$ \nu      $|
|`B        `|$ B        $|`\beta    `|$ \beta    $|`\Xi      `|$ \Xi      $|`\xi      `|$ \xi      $|
|`\Gamma   `|$ \Gamma   $|`\gamma   `|$ \gamma   $|`O        `|$ O        $|`\omicron `|$ \omicron $|
|`\Delta   `|$ \Delta   $|`\delta   `|$ \delta   $|`\Pi      `|$ \Pi      $|`\pi      `|$ \pi      $|
|`E        `|$ E        $|`\epsilon `|$ \epsilon $|`P        `|$ P        $|`\rho     `|$ \rho     $|
|`Z        `|$ Z        $|`\zeta    `|$ \zeta    $|`\Sigma   `|$ \Sigma   $|`\sigma   `|$ \sigma   $|
|`H        `|$ H        $|`\eta     `|$ \eta     $|`T        `|$ T        $|`\tau     `|$ \tau     $|
|`\Theta   `|$ \Theta   $|`\theta   `|$ \theta   $|`\Upsilon `|$ \Upsilon $|`\upsilon `|$ \upsilon $|
|`I        `|$ I        $|`\iota    `|$ \iota    $|`\Phi     `|$ \Phi     $|`\phi     `|$ \phi     $|
|`K        `|$ K        $|`\kappa   `|$ \kappa   $|`X        `|$ X        $|`\chi     `|$ \chi     $|
|`\Lambda  `|$ \Lambda  $|`\lambda  `|$ \lambda  $|`\Psi     `|$ \Psi     $|`\psi     `|$ \psi     $|
|`M        `|$ M        $|`\mu      `|$ \mu      $|`\Omega   `|$ \Omega   $|`\omega   `|$ \omega   $|

### 1.3 Spacing

| command |     preview | command |    preview | command | preview |
|:----------:|:-----------:|:----------:|:----------:|:----------:|:-------:|
| `a\qquad b`| $a\qquad b$ | `a\quad b`| $a\quad b$ |      `a\ b`|  $a\ b$ |

### 1.4 Font

| command                | preview               | command                | preview               |
|:----------------------:|:---------------------:|:----------------------:|:---------------------:|
|`\mathsf{ABC123}+ `|$     \mathsf{ABC123} $|`\mathrm{ABC123}+ `|$     \mathrm{ABC123} $|
|`\mathbf{ABC123}+ `|$     \mathbf{ABC123} $|`\mathcal{ABC123}+ `|$    \mathcal{ABC123} $|
|`\mathtt{ABC123}+ `|$     \mathtt{ABC123} $|`\mathscr{ABC123}+ `|$    \mathscr{ABC123} $|
|`\mathbb{ABC123}+ `|$     \mathbb{ABC123} $|`\mathfrak{ABC123}+ `|$   \mathfrak{ABC123} $|
|`\mathit{ABC123}+ `|$     \mathit{ABC123} $|`\boldsymbol{ABC123}+ `|$ \boldsymbol{ABC123} $|

### 1.5 Color

| command                  | preview                 | command                  | preview                 |
|:------------------------:|:-----------------------:|:------------------------:|:-----------------------:|
|`\color{black}{text}+ `|$   \color{black}{text} $|`\color{olive}{text}+ `|$   \color{olive}{text} $|
|`\color{gray}{text}+ `|$    \color{gray}{text} $|`\color{green}{text}+ `|$   \color{green}{text} $|
|`\color{silver}{text}+ `|$  \color{silver}{text} $|`\color{teal}{text}+ `|$    \color{teal}{text} $|
|`\color{white}{text}+ `|$   \color{white}{text} $|`\color{aqua}{text}+ `|$    \color{aqua}{text} $|
|`\color{maroon}{text}+ `|$  \color{maroon}{text} $|`\color{blue}{text}+ `|$    \color{blue}{text} $|
|`\color{red}{text}+ `|$     \color{red}{text} $|`\color{navy}{text}+ `|$    \color{navy}{text} $|
|`\color{yellow}{text}+ `|$  \color{yellow}{text} $|`\color{purple}{text}+ `|$  \color{purple}{text} $|
|`\color{lime}{text}+ `|$    \color{lime}{text} $|`\color{fuchsia}{text}+ `|$ \color{fuchsia}{text} $|

## 2. Operator

### 2.1 Subscript & Superscript

| command  | preview |  command  | preview |
|:--------:|:-------:|:---------:|:-------:|
|`A^{x}+ `|$ A^{x} $| `A_{x}+ `|$ A_{x} $| 


### 2.2 Relational Operator

|    command |       preview |    command |       preview |    command |       preview |
|:-------------:|:-------------:|:-------------:|:-------------:|:-------------:|:-------------:|
|           `>`|           $>$ |           `<`|           $<$ |           `=`|           $=$ |
|         `\le`|         $\le$ |         `\ge`|         $\ge$ |         `\ne`|         $\ne$ |
|         `\ll`|         $\ll$ |         `\gg`|         $\gg$ |      `\equiv`|      $\equiv$ |
|           `:`|           $:$ |     `\approx`|     $\approx$ |        `\mid`|        $\mid$ |
|     `\subset`|     $\subset$ |     `\supset`|     $\supset$ |         `\in`|         $\in$ |
|   `\subseteq`|   $\subseteq$ |   `\supseteq`|   $\supseteq$ |      `\notin`|      $\notin$ |

### 2.3 Arithmetic Operator

|  command |  preview |  command |  preview |  command |  preview |
|:--------:|:--------:|:--------:|:--------:|:--------:|:--------:|
|      `+`|      $+$ |      `-`|      $-$ |    `\pm`|    $\pm$ |
|  `\cdot`|  $\cdot$ | `\times`| $\times$ |   `\div`|   $\div$ |
|   `\cup`|   $\cup$ |   `\vee`|   $\vee$ | `\sqrt[n]{A}`|  $\sqrt[n]{A}$ |
|   `\cap`|   $\cap$ | `\wedge`| $\wedge$ | `\frac{x}{y}`| $\frac{x}{y}$ |

### 2.4 Accumulational Operator

|  command |     preview |  command |     preview |  command |     preview |
|------------:|:-----------:|------------:|:-----------:|------------:|:-----------:|
| `\sum`| $     \sum$ | `\bigcup`| $  \bigcup$ | `\bigcap`| $  \bigcap$ |
| `\prod`| $    \prod$ | `\bigvee`| $  \bigvee$ | `\bigwedge`| $\bigwedge$ |
| `\int`| $     \int$ | `\lim`| $     \lim$ |

### 2.5 Brackets

| command              | preview             | command              | preview             |
|:--------------------:|:-------------------:|:--------------------:|:-------------------:|
|              `( x )` |             $( x )$ |    `\lvert x \rvert` |   $\lvert x \rvert$ |
|              `[ x ]` |             $[ x ]$ |  `\lfloor x \rfloor` | $\lfloor x \rfloor$ |
|             `\{ x\}` |            $\{ x\}$ |    `\lceil x \rceil` |   $\lceil x \rceil$ |
|   `\langle x\rangle` |  $\langle x\rangle$ |




## 3. Layout

### 3.1 Cases

```mathjax
abs(x) =
  \begin{cases}
     x & x  > 0 \\
    -x & x <= 0 \\
  \end{cases}
```

$$
abs(x) =
  \begin{cases}
     x & x  > 0 \\
    -x & x <= 0 \\
  \end{cases}
$$

### 3.2 Array

```mathjax
\begin{array}
  {c|lcr}
  n & \text{Left} & \text{Center} & \text{Right} \\
  \hline
  1 & 1 & 2 & 3 \\
  2 & 4 & 5 & 6 \\
  3 & 7 & 8 & 9 \\
\end{array}
```

$$
\begin{array}
  {c|lcr}
  n & \text{left} & \text{center} & \text{right} \\
  \hline
  1 & 1 & 2 & 3 \\
  2 & 4 & 5 & 6 \\
  3 & 7 & 8 & 9 \\
\end{array}
$$

### 3.3 Matrix

Here is the basic format of defining a matrix:

```
\begin{matrix}
  1 & 0 \\
  0 & 1 \\
\end{matrix}
```

The command `matrix` can be replaced with `pmatrix`, `bmatrix`, `Bmatrix`,
`vmatrix` and `Vmatrix` to change the brackets of the matrix:

| mode      | preview                                           | mode      | preview                                           | mode      | preview                                           |
|:---------:|:-------------------------------------------------:|:---------:|:-------------------------------------------------:|:---------:|:-------------------------------------------------:|
| ` matrix` |   $\begin{matrix} 1 & 0 \\ 0 & 1 \\ \end{matrix}$ | `bmatrix` | $\begin{bmatrix} 1 & 0 \\ 0 & 1 \\ \end{bmatrix}$ | `vmatrix` | $\begin{vmatrix} 1 & 0 \\ 0 & 1 \\ \end{vmatrix}$ |
| `pmatrix` | $\begin{pmatrix} 1 & 0 \\ 0 & 1 \\ \end{pmatrix}$ | `Bmatrix` | $\begin{Bmatrix} 1 & 0 \\ 0 & 1 \\ \end{Bmatrix}$ | `Vmatrix` | $\begin{Vmatrix} 1 & 0 \\ 0 & 1 \\ \end{Vmatrix}$ |

