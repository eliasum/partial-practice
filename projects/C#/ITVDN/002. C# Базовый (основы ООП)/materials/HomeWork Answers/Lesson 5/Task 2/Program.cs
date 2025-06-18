using System;

namespace Task_2
{
    class Program
    {
        static void Main()
        {
            MyArray ar = new MyArray(8);

            ar.MinMax();
            ar.Average();
            ar.Odd();

            // Delay.
            Console.ReadKey();
        }
    }
}
