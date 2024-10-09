/*2022.10.12 09:24 IMM*/
using System;

// Динамические типы данных. (Динамические типы аргументов и возвращаемых значений методов.)

namespace Dynamic
{
    class Program
    {
        static dynamic Method(dynamic argument)
        {
            return "Hello " + argument + "!";
        }

        static void Main()
        {
            string @string = Method("friend");

            Console.WriteLine(@string);

            // Delay.
            Console.ReadKey();
        }
    }
}
