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
            // компилятор определяет размер массива на основании выражения инициализации
            /*
            int[,] array =
            {
                { 1,2,3 },
                { 4,5,6 },
                { 7,8,9 }
            };
            */
            int[,] array = new int[3, 3];
            for(int i=0; i<3; i++)
            {
                for(int j=0;j<3;j++)
                {
                    array[i, j] = j+1+i*3;
                }
            }

            Console.WriteLine(array);

            for (int i = 0; i < 3; i++)
            {
                for (int j = 0; j < 3; j++)
                {
                    Console.WriteLine("{0}", array[i, j]);
                }
                Console.WriteLine("\n");
            }

            Console.ReadKey();
        }
    }
}
