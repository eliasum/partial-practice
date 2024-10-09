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
            int a = 1, b = 2, max = 0;

            max = (a > b) ? a : b;

            Console.WriteLine(max);

            Console.ReadKey();
        }
    }
}