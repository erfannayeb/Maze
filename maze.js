const maze = (difficulty) => {
  const { Engine, Render, Bodies, World, Runner, Body, Events } = Matter;
  //pick difficulty
  const checkDifficulty = (check) => {
    const setDifficulty = {
      horizontalCells: 0,
      verticalCells: 0,
    };
    if (check === "easy") {
      setDifficulty.horizontalCells = 6;
      setDifficulty.verticalCells = 4;
      return setDifficulty;
    } else if (check === "medium") {
      setDifficulty.horizontalCells = 10;
      setDifficulty.verticalCells = 8;
      return setDifficulty;
    } else if (check === "hard") {
      setDifficulty.horizontalCells = 15;
      setDifficulty.verticalCells = 10;
      return setDifficulty;
    } else if (check === "expert") {
      setDifficulty.horizontalCells = 25;
      setDifficulty.verticalCells = 20;
      return setDifficulty;
    }
  };
  const width = window.innerWidth;
  const height = window.innerHeight;
  const { horizontalCells, verticalCells } = checkDifficulty(difficulty);
  const unitLengthX = width / horizontalCells;
  const unitLengthY = height / verticalCells;
  const engine = Engine.create();
  engine.world.gravity.y = 0;
  const { world } = engine;
  const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
      width,
      height,
      wireframes: false,
    },
  });

  Render.run(render);
  Runner.run(Runner.create(), engine);

  //walls
  const walls = [
    Bodies.rectangle(width / 2, 0, width, 2, { isStatic: true }),
    Bodies.rectangle(width / 2, height, width, 2, { isStatic: true }),
    Bodies.rectangle(0, height / 2, 2, height, { isStatic: true }),
    Bodies.rectangle(width, height / 2, 2, height, { isStatic: true }),
  ];
  World.add(world, walls);

  // Maze generator
  const shuffle = (arr) => {
    let counter = arr.length;

    while (counter > 0) {
      const index = Math.floor(Math.random() * counter);

      counter--;

      const temp = arr[counter];
      arr[counter] = arr[index];
      arr[index] = temp;
    }

    return arr;
  };

  const grid = Array(verticalCells)
    .fill(null)
    .map(() => Array(horizontalCells).fill(false));
  const verticals = Array(verticalCells)
    .fill(null)
    .map(() => Array(horizontalCells - 1).fill(false));
  const horizontals = Array(verticalCells - 1)
    .fill(null)
    .map(() => Array(horizontalCells).fill(false));

  const startRow = Math.floor(Math.random() * verticalCells);
  const startColumn = Math.floor(Math.random() * horizontalCells);

  const stepThroughCell = (row, column) => {
    // aya visit shode ya na
    if (grid[row][column]) {
      return;
    }
    // visit shode shavad
    grid[row][column] = true;
    //peyda kardan hamsaye ha
    const neighbors = shuffle([
      [row - 1, column, "up"],
      [row, column - 1, "left"],
      [row, column + 1, "right"],
      [row + 1, column, "down"],
    ]);

    //for each neighbor
    for (let neighbor of neighbors) {
      const [nextRow, nextColumn, direction] = neighbor;
      //vojod darad?
      if (
        nextRow < 0 ||
        nextRow >= verticalCells ||
        nextColumn < 0 ||
        nextColumn >= horizontalCells
      ) {
        continue;
      }
      //visit shode ya na
      if (grid[nextRow][nextColumn]) {
        continue;
      }
      //baz kardan divar ha
      if (direction === "up") {
        horizontals[row - 1][column] = true;
      } else if (direction === "down") {
        horizontals[row][column] = true;
      } else if (direction === "right") {
        verticals[row][column] = true;
      } else if (direction === "left") {
        verticals[row][column - 1] = true;
      }
      stepThroughCell(nextRow, nextColumn);
    }
  };
  stepThroughCell(startRow, startColumn);
  // walls
  horizontals.forEach((row, rowIndex) => {
    row.forEach((open, columnIndex) => {
      if (open) {
        return;
      }
      const wall = Bodies.rectangle(
        columnIndex * unitLengthX + unitLengthX / 2,
        rowIndex * unitLengthY + unitLengthY,
        unitLengthX,
        5,
        {
          label: "wall",
          isStatic: true,
          render: {
            fillStyle: "#1d83d1",
          },
        }
      );
      World.add(world, wall);
    });
  });
  verticals.forEach((row, rowIndex) => {
    row.forEach((open, columnIndex) => {
      if (open) {
        return;
      }
      const wall = Bodies.rectangle(
        columnIndex * unitLengthX + unitLengthX,
        rowIndex * unitLengthY + unitLengthY / 2,
        5,
        unitLengthY,
        {
          label: "wall",
          isStatic: true,
          render: {
            fillStyle: "#1d83d1",
          },
        }
      );
      World.add(world, wall);
    });
  });
  // Goal
  const goal = Bodies.rectangle(
    width - unitLengthX / 2,
    height - unitLengthY / 2,
    unitLengthX * 0.7,
    unitLengthY * 0.7,
    {
      label: "goal",
      isStatic: true,
      render: {
        fillStyle: "white",
      },
    }
  );
  World.add(world, goal);
  // Ball
  const ballRadius = Math.min(unitLengthX, unitLengthY) / 4;
  const ball = Bodies.circle(unitLengthX / 2, unitLengthY / 2, ballRadius, {
    label: "ball",
    render: {
      fillStyle: "white",
    },
  });
  World.add(world, ball);

  document.addEventListener("keydown", (event) => {
    const { x, y } = ball.velocity;
    if (event.keyCode === 87 || event.keyCode === 38) {
      Body.setVelocity(ball, { x, y: y - 3 });
    }
    if (event.keyCode === 83 || event.keyCode === 40) {
      Body.setVelocity(ball, { x, y: y + 3 });
    }
    if (event.keyCode === 68 || event.keyCode === 39) {
      Body.setVelocity(ball, { x: x + 3, y });
    }
    if (event.keyCode === 65 || event.keyCode === 37) {
      Body.setVelocity(ball, { x: x - 3, y });
    }
  });
  document.addEventListener("touchstart", (firstEvent) => {
    firstEvent.preventDefault();
    const { x, y } = ball.velocity;
    const firstX = firstEvent.clientX;
    const firstY = firstEvent.clientY;
    document.addEventListener("touchend", (secondEvent) => {
      secondEvent.preventDefault();
      const secondX = secondEvent.clientX;
      const secondY = secondEvent.clientY;
      if (secondY > firstY) {
        Body.setVelocity(ball, { x, y: y + 3 });
      }
      if (secondY < firstY) {
        Body.setVelocity(ball, { x, y: y - 3 });
      }
      if (secondX > firstX) {
        Body.setVelocity(ball, { x: x + 3, y });
      }
      if (secondX < firstX) {
        Body.setVelocity(ball, { x: x - 3, y });
      }
    });
  });
  //won condition
  Events.on(engine, "collisionStart", (event) => {
    const labels = ["goal", "ball"];
    event.pairs.forEach((collision) => {
      if (
        labels.includes(collision.bodyA.label) &&
        labels.includes(collision.bodyB.label)
      ) {
        document.querySelector(".winner").classList.remove("hidden");
        world.gravity.y = 1;
        world.bodies.forEach((body) => {
          if (body.label === "wall") {
            Body.setStatic(body, false);
          }
        });
        return;
      }
    });
  });
};
