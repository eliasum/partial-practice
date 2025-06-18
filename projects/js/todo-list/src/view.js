export class View {
  constructor() {
    this.app = document.getElementById('app');
    this.form = document.createElement('form');
    this.input = document.createElement('input');
    this.button = document.createElement('button');
    
    this.input.type = 'text';
    this.button.textContent = 'Добавить';
    
    this.form.append(this.input, this.button);
    this.app.append(this.form);
  }

  render(tasks) {
    const tasksList = document.createElement('ul');
    tasksList.innerHTML = tasks.map(task => 
      `<li>${task}</li>`
    ).join('');
    
    this.app.append(tasksList);
  }
}