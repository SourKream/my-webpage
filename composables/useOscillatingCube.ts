export default function useOscillatingCube(divId: string) {
  const render = (p5: any) => {
    const width = 700;
    const height = 480;

    const size = 20;
    const num = 16;
    const border = 6;

    let time = 0;

    p5.setup = () => {
      const canvas = p5.createCanvas(width, height, p5.WEBGL);
      canvas.parent(divId);
      p5.ortho();
    };

    p5.draw = () => {
      p5.background(255);
      p5.fill(150);
      p5.rotateX(-p5.asin(p5.tan(p5.PI / 6)));
      p5.rotateY(p5.PI / 4);

      for (let z = 0; z < num; z++) {
        for (let x = 0; x < num; x++) {
          p5.push();
          const r = p5.dist(
            (x - num / 2) * size + size / 2,
            (z - num / 2) * size + size / 2,
            0,
            0
          );
          const h = p5.floor(140 + 80 * p5.cos(0.027 * r - time));
          p5.translate(
            (x - num / 2) * size + size / 2,
            0,
            (z - num / 2) * size + size / 2
          );
          p5.normalMaterial();
          p5.box(size - border, h, size - border);
          p5.pop();
        }
      }

      time += 0.075;
    };
  };

  return {
    render,
  };
}
