using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OneElement
{
    class Program
    {
        static void Main(string[] args)
        {
            int[] vector = new int[1];
            vector[0] = 100;
            Console.WriteLine(vector[0]);

            int[,] matrix = new int[1,1];
            matrix[0,0] = 200;
            Console.WriteLine(matrix[0,0]);

            Console.ReadKey();
        }
    }
}
