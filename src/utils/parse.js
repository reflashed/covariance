export const parseTextArea = (textArea) => {
  const points = [];

  const lines = textArea.split('\n');
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];

    const point = line.split(',')
      .map(x => x.trim())
      .map(x => parseInt(x, 10));

    points.push(point);
  }

  return points;
};

export const parsePoints = (points) => {
  let parsed = '';

  for (let i = 0; i < points.length; i += 1) {
    const point = points[i];
    const [x, y] = point;
    parsed += `${x},${y}`;

    const isLastPoint = (i === (points.length-1));
    if (!isLastPoint) parsed += '\n';
  }

  return parsed;
};
