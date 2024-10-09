using System;

namespace Task_2
{
    class Program
    {
        static void Main()
        {
            Company comp = new Company();
            Console.WriteLine(comp[5]);

            // Delay.
            Console.ReadKey();
        }
    }
}
