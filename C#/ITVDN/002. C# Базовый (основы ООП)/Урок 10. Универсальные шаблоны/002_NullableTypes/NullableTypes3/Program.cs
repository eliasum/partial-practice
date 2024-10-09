/*2020.07.02 17:19 IMM*/

using System;

// Операция поглощения - ??

namespace NullableTypes
{
    class Program
    {
        static void Main()
        {
            int? a = null;
            int? b; // b = null

            b = a ?? 10; // b = 10
            //b = a != null ? a : 10;
            Console.WriteLine(b);

            a = 3;
            b = a ?? 10; // b = 3
            //b = a != null ? a : b;
            Console.WriteLine(b);

            // Delay.
            Console.ReadKey();
        }
    }
}
