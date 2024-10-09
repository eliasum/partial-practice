using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstraction
{
    class Program
    {
        static void Main(string[] args)
        {
            DerivedConcreteClass instance = new DerivedConcreteClass();

            instance.SimpleMethod();
            instance.VirtualMethod();
            instance.AbstractMethod();

            Console.ReadKey();
        }
    }
}
