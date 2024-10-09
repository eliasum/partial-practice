using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Interfaces
{
    class Program
    {
        static void Main(string[] args)
        {
            // приведение к базовому типу (upcast) инкапсулирует один из методов каждого интерфейса
            Interface1 instance1 = new DerivedClass();
            Interface2 instance2 = new DerivedClass();

            instance1.Method1();
            instance2.Method2();

            Console.ReadKey();
        }
    }
}
