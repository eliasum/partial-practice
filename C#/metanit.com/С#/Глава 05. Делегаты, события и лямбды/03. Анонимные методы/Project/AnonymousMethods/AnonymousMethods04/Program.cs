/*2022.10.11 11:07 IMM*/
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnonymousMethods04
{
    //Также, как и обычные методы, анонимные могут возвращать результат:

    class Program
    {
        delegate int Operation(int x, int y);

        static void Main(string[] args)
        {
            Operation operation = delegate (int x, int y)
            {
                return x + y;
            };

            int d = operation(4, 5);

            Console.WriteLine(d);       // 9

            Console.Read();
        }
    }
}
