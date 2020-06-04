# minesweeper-node
A simple text-based Minesweeper implementation.


# How to play

```bash
node index.js 
```

* Moves are input as `<row>,<column>`.
* The first tile uncovered will not contain a mine.
* If a tile contains a `0`, its neighbors are recursively uncovered.
* Game ends if a mine is uncovered or if the only uncovered tiles contain mines.

# TODO

* Ability to flag tiles
* Specify number of rows, columns, and mines from command line
* Better representation of uncovered tiles than `null`

![image](https://user-images.githubusercontent.com/606164/83812358-41e07b00-a670-11ea-9764-cc1d16503b14.png)
