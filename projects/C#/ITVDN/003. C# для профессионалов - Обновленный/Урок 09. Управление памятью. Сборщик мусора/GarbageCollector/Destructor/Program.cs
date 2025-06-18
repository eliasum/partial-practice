/*2020.10.20 18:15 IMM*/
/*2024.12.25 10:54 IMM*/

using System;

namespace Destructor
{
    class MyClass
    {
        // Destructor (Метод Finalize - другое название деструктора)
        ~ MyClass()
        {
            Console.WriteLine("Hello from Destructor!");

            // Например: Закрыть соединение с Базой Данных.
        }
    }

    class Program
    {
        static void Main()
        {
            MyClass my = new MyClass();

            // Деструктор невозможно вызвать вручную.
            // Вызывается автоматически сборщиком мусора.
            // my.~MyClass();
        }
    }
}
