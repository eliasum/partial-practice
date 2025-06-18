using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

// наследование от класса и интерфейса, у которых совпадают сигнатуры методов

namespace Interfaces
{
    interface IInterface
    {
        void Method();
    }

    class BaseClass
    {
        public void Method()
        {
            Console.WriteLine("BaseClass.Method()");
        }
    }

    class DerivedClass : BaseClass, IInterface
    {
        // реализация интерфейса не обязательна, т.к. сигнатуры методов в классе и интерфейсе совпадают
    }

    class Program
    {
        static void Main(string[] args)
        {
            DerivedClass instance = new DerivedClass();
            instance.Method();

            IInterface instanse1 = instance as IInterface;
            instanse1.Method();

            Console.ReadKey();
        }
    }
}
