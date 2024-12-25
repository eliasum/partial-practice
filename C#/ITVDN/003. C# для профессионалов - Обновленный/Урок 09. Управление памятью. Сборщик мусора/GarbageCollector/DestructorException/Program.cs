/*2020.10.20 19:22 IMM*/
/*2024.12.25 15:06 IMM*/

using System;

// Необработанное исключение в деструкторе,
// приводит к остановке его работы.

namespace DestructorException
{
    class MyClass
    {
        ~ MyClass()
        {
            throw new Exception();  // бросаем исключение

            Console.WriteLine("Succeeded!");    // не выведется
        }
    }

    class Program
    {
        static void Main()
        {
            MyClass my = new MyClass();
        }
    }
}
