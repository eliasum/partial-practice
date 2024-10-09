using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Interfaces
{
    interface IInterface
    {
        void Method();
    }

    class MyClass : IInterface
    {
        public void Method()
        {
            Console.WriteLine("Метод - реализация интерфейса.");
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            IInterface my = new MyClass();

            my.Method();

            Console.ReadKey();

           
        }
    }
}
