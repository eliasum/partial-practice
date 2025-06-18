class View {
  constructor() {
    this.app = document.getElementById('app');
    this.createUI();
  }

  createUI() {
    const form = document.createElement('form');
    const input = document.createElement('input');
    const button = document.createElement('button');
    
    input.type = 'text';
    button.textContent = 'Добавить';
    
    form.append(input, button);
    this.app.append(form);
  }
}

module.exports = View;