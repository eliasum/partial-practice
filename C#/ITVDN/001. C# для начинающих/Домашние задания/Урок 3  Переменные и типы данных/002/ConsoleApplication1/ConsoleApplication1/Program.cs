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
            int x = 10, y = 12, z = 3;

            x += y - x++ * z;
            Console.WriteLine("x += y - x++ * z == {0}", x);

	        z = --x - y * 5;
            Console.WriteLine("z = --x - y * 5 == {0}", z);
 
	        y /= x + 5 % z;
            Console.WriteLine("y /= x + 5 % z == {0}", y);

	        z = x++ + y * 5;
            Console.WriteLine("z = x++ + y * 5 == {0}", z);

	        x = y - x++ * z;
            Console.WriteLine("x = y - x++ * z == {0}", x);

            Console.ReadKey();

        }
    }
}
