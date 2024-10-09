using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _003_ArrayMultiDim
{
    class Program
    {
        static void Main(string[] args)
        {
            int[,,] threeDim =
            {
                { { 1,2 },{ 3,4 } },
                { { 5,6 },{ 7,8 } }
            };

            for(int i=0; i<threeDim.GetLength(0); i++)
            {
                for (int j = 0; j < threeDim.GetLength(1); j++)
                {
                    for (int k = 0; k < threeDim.GetLength(2); k++)
                    {
                        Console.WriteLine(threeDim[i, j, k] + ", ");
                    }
                    Console.WriteLine();
                }
            }

            Console.WriteLine(threeDim.Length);

            Console.ReadKey();
        }
    }
}
