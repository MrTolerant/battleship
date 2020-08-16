const ship = {
  position: 'vertical',
  startCell: { x: 0, y: 0 },
  rotate: () => {},
  isPisitionValid: () => {},
  generate: (length, cell) => {
    this.startCell = cell
    this.position = Math.floor(Math.random() * 2) ? 'vertical' : 'horizontal'
    for (let i = 0; i < length; i += 1) {}
  },
  cells: [],
  length: 0
}
