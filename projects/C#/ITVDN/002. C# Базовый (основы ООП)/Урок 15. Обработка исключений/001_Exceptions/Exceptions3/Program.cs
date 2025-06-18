/*2022.10.06 15:48 IMM*/
using System;

// Обработка исключений.

namespace Exceptions
{
    class Program
    {
        static void Main()
        {
            try
            {
                throw new Exception("Мое Исключение");
            }
            catch (Exception e)
            {
                Console.WriteLine("Обработка исключения.");
                Console.WriteLine(e.Message);
            }

            // Delay.
            Console.ReadKey();
        }
    }
}
