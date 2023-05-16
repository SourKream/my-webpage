import type p5 from "p5";

export default function useGameOfLife(divId: string) {
  const render = (p5: p5) => {
    const gridSize = 75;
    const cellSize = 8;

    let grid = new Array(gridSize) as boolean[][];
    let pause = false;
    let wrap = true;

    let FR = 20;

    p5.setup = () => {
      const canvas = p5.createCanvas(600, 600);
      canvas.parent(divId);

      // Random Initilise Current Generation
      for (let i = 0; i < gridSize; i++) grid[i] = new Array(gridSize);
      randomInitialise();
    };

    p5.draw = () => {
      p5.background(220);

      if (pause) p5.frameRate(20);
      else p5.frameRate(FR);

      // Draw Current Generation
      p5.strokeWeight(1);
      if (pause) p5.stroke(255, 102, 102);
      else p5.stroke(192, 192, 192);
      for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
          if (grid[i][j]) p5.fill(0);
          else p5.fill(255);
          p5.rect(i * cellSize, j * cellSize, cellSize, cellSize);
        }
      }

      // Draw Boundary
      p5.strokeWeight(2);
      p5.noFill();
      if (wrap) p5.stroke(0, 255, 0);
      else p5.stroke(255, 0, 0);
      p5.rect(0, 0, cellSize * gridSize, cellSize * gridSize);

      if (!pause) {
        // Find Next Generation
        const nextGrid = new Array(gridSize);
        for (let i = 0; i < gridSize; i++) {
          nextGrid[i] = new Array(gridSize);
          for (let j = 0; j < gridSize; j++) {
            // Neighbours of a cell
            let n;
            if (wrap) n = numNeighWrap(i, j);
            else n = numNeigh(i, j);

            // GOL Rules
            if (grid[i][j]) {
              if (n < 2) nextGrid[i][j] = false;
              else if (n > 3) nextGrid[i][j] = false;
              else nextGrid[i][j] = true;
            } else {
              if (n === 3) nextGrid[i][j] = true;
              else nextGrid[i][j] = false;
            }
          }
        }

        grid = nextGrid;
      }
    };

    p5.keyPressed = () => {
      const key = p5.key;
      if (p5.key === "p") pause = !pause;
      else if (key === "f") {
        if (FR < 60) FR += 1;
      } else if (key === "s") {
        if (FR > 1) FR -= 1;
      } else if (key === "r") FR = 20;
      else if (key === "t") randomInitialise();
      else if (key === "w") wrap = !wrap;
      else if (key === "c") cleanGrid();
      else if (key === "1")
        loadGosperGun(
          p5.floor(p5.mouseX / cellSize),
          p5.floor(p5.mouseY / cellSize)
        );
      else if (key === "2")
        loadPentadecathlon(
          p5.floor(p5.mouseX / cellSize),
          p5.floor(p5.mouseY / cellSize)
        );
    };

    p5.mouseDragged = () => {
      if (p5.mouseX > 0 && p5.mouseX < gridSize * cellSize)
        if (p5.mouseY > 0 && p5.mouseY < gridSize * cellSize) {
          if (p5.keyIsPressed && p5.keyCode === p5.SHIFT)
            grid[p5.floor(p5.mouseX / cellSize)][
              p5.floor(p5.mouseY / cellSize)
            ] = false;
          else
            grid[p5.floor(p5.mouseX / cellSize)][
              p5.floor(p5.mouseY / cellSize)
            ] = true;
        }
    };

    p5.mouseClicked = () => {
      if (p5.mouseX > 0 && p5.mouseX < gridSize * cellSize)
        if (p5.mouseY > 0 && p5.mouseY < gridSize * cellSize)
          grid[p5.floor(p5.mouseX / cellSize)][p5.floor(p5.mouseY / cellSize)] =
            !grid[p5.floor(p5.mouseX / cellSize)][
              p5.floor(p5.mouseY / cellSize)
            ];
    };

    function numNeigh(i: number, j: number) {
      let c = 0;

      if (i - 1 >= 0) {
        if (grid[i - 1][j]) c += 1;

        if (j - 1 >= 0) if (grid[i - 1][j - 1]) c += 1;

        if (j + 1 < gridSize) if (grid[i - 1][j + 1]) c += 1;
      }

      if (i + 1 < gridSize) {
        if (grid[i + 1][j]) c += 1;

        if (j - 1 >= 0) if (grid[i + 1][j - 1]) c += 1;

        if (j + 1 < gridSize) if (grid[i + 1][j + 1]) c += 1;
      }

      if (j - 1 >= 0) if (grid[i][j - 1]) c += 1;

      if (j + 1 < gridSize) if (grid[i][j + 1]) c += 1;

      return c;
    }

    function numNeighWrap(i: number, j: number) {
      let c = 0;

      if (grid[(i - 1 + gridSize) % gridSize][j]) c += 1;
      if (grid[(i - 1 + gridSize) % gridSize][(j - 1 + gridSize) % gridSize])
        c += 1;
      if (grid[(i - 1 + gridSize) % gridSize][(j + 1) % gridSize]) c += 1;
      if (grid[(i + 1) % gridSize][j]) c += 1;
      if (grid[(i + 1) % gridSize][(j - 1 + gridSize) % gridSize]) c += 1;
      if (grid[(i + 1) % gridSize][(j + 1) % gridSize]) c += 1;
      if (grid[i][(j - 1 + gridSize) % gridSize]) c += 1;
      if (grid[i][(j + 1) % gridSize]) c += 1;

      return c;
    }

    function cleanGrid() {
      for (let i = 0; i < gridSize; i++)
        for (let j = 0; j < gridSize; j++) grid[i][j] = false;
    }

    function loadGosperGun(i: number, j: number) {
      if (i + 36 > gridSize - 1) return;
      if (j + 9 > gridSize - 1) return;

      grid[i + 1][j + 5] = true;
      grid[i + 1][j + 6] = true;
      grid[i + 2][j + 5] = true;
      grid[i + 2][j + 6] = true;

      grid[i + 11][j + 5] = true;
      grid[i + 11][j + 6] = true;
      grid[i + 11][j + 7] = true;
      grid[i + 12][j + 4] = true;
      grid[i + 12][j + 8] = true;
      grid[i + 13][j + 3] = true;
      grid[i + 13][j + 9] = true;
      grid[i + 14][j + 3] = true;
      grid[i + 14][j + 9] = true;
      grid[i + 15][j + 6] = true;
      grid[i + 16][j + 4] = true;
      grid[i + 16][j + 8] = true;
      grid[i + 17][j + 7] = true;
      grid[i + 17][j + 6] = true;
      grid[i + 17][j + 5] = true;
      grid[i + 18][j + 6] = true;

      grid[i + 21][j + 5] = true;
      grid[i + 21][j + 4] = true;
      grid[i + 21][j + 3] = true;
      grid[i + 22][j + 5] = true;
      grid[i + 22][j + 4] = true;
      grid[i + 22][j + 3] = true;
      grid[i + 23][j + 2] = true;
      grid[i + 23][j + 6] = true;
      grid[i + 25][j + 1] = true;
      grid[i + 25][j + 2] = true;
      grid[i + 25][j + 6] = true;
      grid[i + 25][j + 7] = true;

      grid[i + 35][j + 3] = true;
      grid[i + 35][j + 4] = true;
      grid[i + 36][j + 3] = true;
      grid[i + 36][j + 4] = true;
    }

    function loadPentadecathlon(i: number, j: number) {
      if (i + 2 > gridSize - 1) return;
      if (j + 9 > gridSize - 1) return;

      grid[i + 1][j] = true;
      grid[i + 1][j + 1] = true;
      grid[i][j + 2] = true;
      grid[i + 2][j + 2] = true;
      grid[i + 1][j + 3] = true;
      grid[i + 1][j + 4] = true;
      grid[i + 1][j + 5] = true;
      grid[i + 1][j + 6] = true;
      grid[i][j + 7] = true;
      grid[i + 2][j + 7] = true;
      grid[i + 1][j + 8] = true;
      grid[i + 1][j + 9] = true;
      grid[i + 1][j + 1] = true;
    }

    function randomInitialise() {
      for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
          if (p5.random(100) <= 12) grid[i][j] = true;
          else grid[i][j] = false;
        }
      }
    }
  };

  return {
    render,
  };
}
