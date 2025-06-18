/*2022.10.07 13:53 IMM*/
using System;

// Базовый класс Object.

namespace ClassObject
{
    class MyClass
    {
        public override string ToString()
        {
            return "Hello world!";
        }
    }

    class Program
    {
        static void Main()
        {
            MyClass instance = new MyClass();

            Console.WriteLine(instance.ToString());

            // Delay.
            Console.ReadKey();
        }
    }
}
