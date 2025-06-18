test('добавление задачи', () => {
  const model = { tasks: [], addTask(task) { this.tasks.push(task); } };
  model.addTask('Учить Jest');
  expect(model.tasks).toContain('Учить Jest');
});