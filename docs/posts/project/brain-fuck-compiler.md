# Brain Fuck Compiler written in Lex & Yacc

## What is Brain Fuck?

Brain Fuck is a kind of Turing complete minimal programming language. It's working mechanism is similar to Turing machine. It has a long enough tape. At the beginning, every cell on the tape is 0. There is a data read-write head pointing to the initial position of the tape. The behavior of the read-write head is indicated by the instruction. Here are BF language instructions:

| Instruction   | Equivalent C Language Expression | Description                                                                                                        |
| ------------- | ---------------------------------|------------------------------------------------------------------------------------------------------------------- |
| `>`           | `++ptr;`                         | Move the pointer one bit to the right.                                                                             |
| `<`           | `--ptr;`                         | Move the pointer one bit to the left.                                                                              |
| `+`           | `++*ptr;`                        | Increase the value of the pointer by 1 byte.                                                                       |
| `-`           | `--*ptr;`                        | Reduce the value of the pointer by 1 byte.                                                                         |
| `.`           | `putchar(*ptr);`                 | Output the value of the pointer position according to the ASCII table.                                             |
| `,`           | `*ptr = getch();`                | Accept 1 byte of input and store it at the current pointer.                                                        |
| `[`           | `while(*ptr) {`                  | When the current value of the pointer is 0, it jumps to the corresponding `]` otherwise, it executes sequentially. |
| `]`           | `}`                              | Jump back to corresponding `[`.                                                                                    |

For example, this is a hello world program of BF language:

```brainfuck
++++++++++[>+++++++>++++++++++>+++>+<<<<-]
>++.>+.+++++++..+++.>++.<<+++++++++++++++.
>.+++.------.--------.>+.>.
```
