const Model = require('../src/model'); // CommonJS импорт

test('Добавляет задачу', () => {
  const model = new Model();
  model.addTask('Купить молоко');
  expect(model.tasks).toContain('Купить молоко');
});