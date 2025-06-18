class Model {
  constructor() {
    this.tasks = [];
  }
  
  addTask(task) {
    this.tasks.push(task);
  }
}

module.exports = Model; // CommonJS экспорт