# Архитектура ПО

## 1. MVC в JavaScript проекте
Пример реализации паттерна Model-View-Controller для To-Do List:
```javascript
// projects/js/todo-list/
class Model {
  constructor() { this.tasks = []; }
  addTask(task) { this.tasks.push(task); }
}

class View {
  constructor() { this.app = document.getElementById('app'); }
  render(tasks) {
    this.app.innerHTML = tasks.map(task => `<div>${task}</div>`).join('');
  }
}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }
  addTask(task) {
    this.model.addTask(task);
    this.view.render(this.model.tasks);
  }
}
