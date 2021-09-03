const fs = require('fs');
const path = require('path');
const { parse: parseUrl } = require('url');
const QRCodeImpl = require('qr.js/lib/QRCode');
const ErrorCorrectLevel = require('qr.js/lib/ErrorCorrectLevel')

const README = fs.readFileSync(path.join(__dirname, './readme.md'), 'UTF-8');

const defaultQueryValues = {
  bgColor: '#fff',
  fgColor: '#000',
  level: 'L',
  margin: 0,
  width: 500
}

module.exports = async (req, res) => {
  if (req.url === '/') {
    return README;
  }

  const { query } = parseUrl(req.url, true);
  const {
    bgColor,
    fgColor,
    level,
    margin,
    value,
    width
  } = Object.assign({}, defaultQueryValues, query);

  const qrcode = new QRCodeImpl(-1, ErrorCorrectLevel[level]);
  qrcode.addData(value);
  qrcode.make();

  const cells = qrcode.modules;

  res.setHeader('Content-Type', 'image/svg+xml');

  const marginInCells = cells.length / parseInt(width, 10) * parseInt(margin, 10);
  const viewBox = `${0 - marginInCells} ${0 - marginInCells} ${cells.length + marginInCells * 2} ${cells.length + marginInCells * 2}`;

  return `<svg xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges" viewBox="${viewBox}" height="${width}px" width="${width}px" style="border: ${margin} solid ${bgColor}">${
      cells.map((row, rowIndex) =>
        row.map((cell, colIndex) =>
          `<rect height="1" width="1" style="fill: ${cell ? fgColor : bgColor}" x="${colIndex}" y="${rowIndex}"></rect>`
        ).join('')
      ).join('')
    }</svg>`;
};
