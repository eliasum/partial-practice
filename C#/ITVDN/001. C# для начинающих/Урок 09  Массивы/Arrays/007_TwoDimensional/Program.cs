using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TwoDimensional
{
    class Program
    {
        static void Main(string[] args)
        {
            int[,] array = new int[3, 3];

            array[0, 0] = 1;
            array[0, 1] = 2;
            array[0, 2] = 3;

            array[1, 0] = 4;
            array[1, 1] = 5;
            array[1, 2] = 6;

            array[2, 0] = 7;
            array[2, 1] = 8;
            array[2, 2] = 9;

            Console.WriteLine(array[0, 0]);
            Console.WriteLine(array[0, 1]);
            Console.WriteLine(array[0, 2]);
            Console.WriteLine("\n");
            Console.WriteLine(array[1, 0]);
            Console.WriteLine(array[1, 1]);
            Console.WriteLine(array[1, 2]);
            Console.WriteLine("\n");
            Console.WriteLine(array[2, 0]);
            Console.WriteLine(array[2, 1]);
            Console.WriteLine(array[2, 2]);

            Console.ReadKey();
        }
    }
}
