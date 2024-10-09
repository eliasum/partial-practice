using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

// зубчатые массивы (jagged arrays)

namespace Jagged
{
    class Program
    {
        static void Main(string[] args)
        {
            int[][] jagged = new int[3][];

            jagged[0] = new int[] { 1,2 };
            jagged[1] = new int[] { 1,2,3,4,5 };
            jagged[2] = new int[] { 1,2,3 };

            // во внешнем цикле выполняется проход по всем вложенным массивам
            for(int i=0; i<jagged.Length; i++)
            {
                // во внутреннем цикле выполняется обращение к каждому элементу вложенного массива
                for (int j = 0; j < jagged[i].Length; j++)
                {
                    Console.WriteLine("{0} ", jagged[i][j]);
                }
                Console.WriteLine("\n");
            }

            Console.ReadKey();  
        }
    }
}
