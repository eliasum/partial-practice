using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

// именованные аргументы методов

namespace Methods
{
    class Program
    {
        static int Difference(int height, int width)
        {
            return height - width;  
        }

        static void Main(string[] args)
        {
            int difference = Difference(6, 5);

            Console.WriteLine("Разность равна {0}", difference);

            difference = Difference(width: 5, height: 6);

            Console.WriteLine("Разность равна {0}", difference);

            Console.ReadKey();
        }
    }
}
