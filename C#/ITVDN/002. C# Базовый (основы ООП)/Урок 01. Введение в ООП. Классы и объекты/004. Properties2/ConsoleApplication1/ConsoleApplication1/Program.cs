using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

// Классы. (Использование свойств для доступа к закрытым полям.)

// Свойство - интерфейс доступа к полю объекта.
// Свойства в C# - поля с логическим блоком, в котором есть ключевые слова get и set
// и являются суррогатом для замены методов доступа к полю.
// При обращении к свойству вызывается определенный метод, который выполняет определенные операции с объектом.

namespace ConsoleApplication1
{
    class MyClass
    {
        private string field = null;

        public string Field                     // свойство
        {
            set // void SetField(string value)  // метод-мутатор - mutator (setter)
            {
                field = value;
            }

            get // string GetField()            // метод-аксессор - accessor (getter)
            {
                return field;
            }
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            MyClass instance = new MyClass();

            instance.Field = "Hello world!";       // метод-мутатор

            Console.WriteLine(instance.Field);     // метод-аксессор

            Console.ReadLine();
        }
    }
}
