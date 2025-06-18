using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

// методы с опциональными параметрами

namespace Methods
{
    class Program
    {
        // метод вызывается так же, если бы это были перегрузки
        static void Operation(string value1 = "val", int value2 = 10, double value3 = 12.2)
        {
            Console.WriteLine("{0},{1},{2}", value1, value2, value3);
        }

        static void Main(string[] args)
        {
            Operation();
            Operation("Val");
            Operation("Val", 10);
            Operation("Val", 10, 12.2);

            Operation("Val", value3: 12.2);
            Operation(value2:33, value3: 12.2);

            Console.ReadKey();
        }
    }
}
