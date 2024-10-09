/*2022.10.12 10:39 IMM*/
using System;

// Динамические типы данных.

namespace Dynamic
{
    class Calculator
    {
        public dynamic Add(dynamic a, dynamic b)
        {
            return a + b;
        }
    }

    class Program
    {
        static void Main()
        {
            dynamic calculator = new Calculator();
            
            Console.WriteLine(calculator.Add(2, 3));
            Console.WriteLine(calculator.Add("1", 2));
            Console.WriteLine(calculator.Add(1.0, 2.1));
            Console.WriteLine(calculator.Add(1.0f, 2.1f));

            // Delay.
            Console.ReadKey();
        }
    }
}
