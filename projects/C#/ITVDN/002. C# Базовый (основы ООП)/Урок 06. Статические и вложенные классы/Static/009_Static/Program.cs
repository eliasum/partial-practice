using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

// статические члены не могут быть виртуальными, переопределенными и абстрактными
// статические члены поддерживают замещение

namespace _009_Static
{
    abstract class BaseClass
    {
        public static void StaticMethod()
        {
            Console.WriteLine("BaseClass.StaticMethod");
        }
    }

    class DerivedClass : BaseClass
    {
        public static new void StaticMethod()
        {
            Console.WriteLine("DerivedClass.StaticMethod");
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            BaseClass.StaticMethod();
            DerivedClass.StaticMethod();

            Console.ReadKey();
        }
    }
}
