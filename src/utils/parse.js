function validatePoint(point) {
  const correctLength = (point.length === 2);
  if (!correctLength) return false;

  const x = point[0];
  const y = point[1];

  const xIsNumber = (typeof point[0] === 'number');
  const yIsNumber = (typeof point[1] === 'number');
  if (!xIsNumber || !yIsNumber) return false;

  if (isNaN(point[0]) || isNaN(point[1])) return false;

  const xWithinBounds = (x >= 0 && x <= 10);
  const yWithinBounds = (y >= 0 && y <= 10);
  if (!xWithinBounds || !yWithinBounds) return false;

  return true;
}

export const parseTextArea = (textArea) => {
  const resp = {
    'points': [],
    'corrects': [],
  };

  const lines = textArea.split('\n');
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];

    const point = line.split(',')
      .map(x => x.trim())
      .map(x => x && Number(x));

    if (validatePoint(point)) {
      resp['points'].push(point);
      resp['corrects'].push(true);
    } else {
      resp['corrects'].push(false);
    }
  }

  return resp;
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
