using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ConsoleApplication1
{
    class Program
    {
        static void Main(string[] args)
        {
            double pi = 3.14159265359;
            int R = 24;
            int h = 15;

            double V = pi * Math.Pow(R, 2)*h;
            double S = 2 * pi * R * (R + h);

            Console.WriteLine("V = pi * (R^2) * h = {0}", V);
            Console.WriteLine("S = 2 * pi * R * (R + h) = {0}", S);

            Console.ReadKey();
        }
    }
}
