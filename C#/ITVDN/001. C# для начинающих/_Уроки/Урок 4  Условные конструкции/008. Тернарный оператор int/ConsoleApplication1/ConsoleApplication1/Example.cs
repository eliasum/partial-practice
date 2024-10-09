using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ConsoleApplication1
{
    class Example
    {
        static void Main(string[] args)
        {
            int a = 1;
            double b = 0.0;
            int max;

            // выражения [?] и [:] должны быть одного типа

            max = (int)((a > b) ? a : b);

            // ... или так

            max = (a > b) ? a : (int)b;

            Console.WriteLine(max);

            Console.ReadKey();
        }
    }
}