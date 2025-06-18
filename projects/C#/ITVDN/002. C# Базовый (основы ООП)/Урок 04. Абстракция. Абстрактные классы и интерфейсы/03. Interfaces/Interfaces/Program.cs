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
            DerivedClass instance = new DerivedClass();

            // instance - на экземпляре не видим методов интерфейсов

            // приведем экземпляр класса DerivedClass - instance к базовому интерфейсному типу Interface1

            Interface1 instance1 = instance as Interface1;
            Interface2 instance2 = instance as Interface2;

            instance1.Method();
            instance2.Method();

            Console.ReadKey();
        }
    }
}
