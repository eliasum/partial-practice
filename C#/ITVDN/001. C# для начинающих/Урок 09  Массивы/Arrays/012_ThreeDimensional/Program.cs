using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ThreeDimensional
{
    class Program
    {
        static void Main(string[] args)
        {
            int[,,] array = 
            {
                { { 1,2,3 }, { 4,5,6 }, { 7,8,9 } },
                { { 1,2,3 }, { 4,5,6 }, { 7,8,9 } },
                { { 1,2,3 }, { 4,5,6 }, { 7,8,9 } }
            };

            for (int i = 0; i < 3; i++)
            {
                for (int j = 0; j < 3; j++)
                {
                    for (int k = 0; k < 3; k++)
                    {
                        Console.WriteLine("{0} ", array[i, j, k]);
                    }
                    Console.WriteLine("\n");
                }
                Console.WriteLine("\n");
            }

            Console.ReadKey();

        }
    }
}
