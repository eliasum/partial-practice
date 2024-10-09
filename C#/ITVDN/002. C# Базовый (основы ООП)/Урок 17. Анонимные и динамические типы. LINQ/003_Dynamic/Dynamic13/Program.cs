/*2022.10.12 10:30 IMM*/
using System;

// Динамические типы данных. (Анонимные типы)

namespace Dynamic
{
    class Program
    {
        static void Main()
        {
            // переменной динамического типа присваивается экземпляр анонимного типа
            dynamic instance = new { Name = "Alex", Age = 18 };

            Console.WriteLine(instance.Name);
            Console.WriteLine(instance.Age);

            // Delay.
            Console.ReadKey();
        }
    }
}
