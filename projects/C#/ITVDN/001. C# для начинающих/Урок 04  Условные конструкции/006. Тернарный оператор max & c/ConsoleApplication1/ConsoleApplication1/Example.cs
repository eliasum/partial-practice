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
            int a = 1, b = 2, с = -5, max = 0;

            max = a > b ? с = a : с = b; // сначала c = a, а только потом max = c

            Console.WriteLine(max);
            Console.WriteLine(с);

            Console.ReadKey();
        }
    }
}