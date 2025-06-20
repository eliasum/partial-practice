# Контекст `this` в JavaScript

## Основные правила:
1. **В методах объекта**: `this` ссылается на сам объект.
   ```javascript
   const user = {
     name: "Anna",
     greet() { console.log(this.name); } // this = user
   };
   
   