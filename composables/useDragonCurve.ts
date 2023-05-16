import type p5 from "p5";

export default function useDragonCurve(divId: string) {
  const render = (p5: p5) => {
    let initC = -1;
    let iter = 0;

    let points = [] as Array<{ x: number; y: number }>;

    let Draw = true;

    p5.setup = () => {
      const canvas = p5.createCanvas(750, 600);
      canvas.parent(divId);

      resetPoints();
    };

    p5.draw = () => {
      if (Draw) {
        p5.background(255);
        p5.stroke(0, 102, 153);
        p5.strokeWeight(2);
        p5.noFill();

        p5.beginShape();
        for (let i = 0; i < points.length; i++) {
          p5.vertex(points[i].x, points[i].y);
        }
        p5.endShape();

        p5.textSize(32);
        p5.fill(0, 102, 153);
        p5.text(iter, 650, 50);
        p5.textSize(20);
        p5.strokeWeight(1);
        // p5.text("Distance", 50, 500);
        // p5.text("Decay", 50, 530);
        // p5.text("Lat Decay", 50, 560);

        Draw = false;
      }
    };

    p5.keyPressed = () => {
      if (p5.key === "i") iterate();
      if (p5.key === "r") resetPoints();
    };

    function resetPoints() {
      initC = -1;
      iter = 0;
      points = [];
      points.push(p5.createVector(200, 320));
      points.push(p5.createVector(630, 320));
      Draw = true;
    }

    function iterate() {
      if (iter === 18) return;

      iter += 1;
      Draw = true;

      const newPoints = [];
      let c = initC;

      // Play With This
      initC *= 1;
      // initC *= 0.99;
      //   initC *= decay_input.value();

      // Play With This
      const d = 1;
      // var d = 0.5;
      //   const d = distance_input.value();

      for (let i = 1; i < points.length; i++) {
        const x1 = points[i - 1].x;
        const y1 = points[i - 1].y;
        const x2 = points[i].x;
        const y2 = points[i].y;

        // Play With This
        // c *= -0.9999;
        c *= -1;
        // c *= -1 * lat_decay_input.value();

        newPoints.push(points[i - 1]);
        newPoints.push(
          p5.createVector(
            (x1 + x2) / 2 + (d * c * (y2 - y1)) / 2,
            (y1 + y2) / 2 - (d * c * (x2 - x1)) / 2
          )
        );
      }
      newPoints.push(points[points.length - 1]);

      points = newPoints;
    }
  };

  return {
    render,
  };
}
