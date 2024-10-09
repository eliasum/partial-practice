using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

// перегрузка методов

namespace Methods
{
    class Program
    {
        static void Operation()
        {
            Operation("Val", "10", 12.2);
        }

        static void Operation(string value1)
        {
            Operation(value1, "10", 12.2);
        }

        static void Operation(string value1, string value2)
        {
            Operation(value1, value2, 12.2);
        }

        static void Operation(string value1, string value2, double value3)
        {
            Console.WriteLine("{0},{1},{2}", value1, value2, value3);
        }

        static void Main(string[] args)
        {
            Operation();
            Operation("Val");
            Operation("Val", "10");
            Operation("Val", "10", 12.2);

            Console.ReadKey();
        }
    }
}
