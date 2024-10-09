/*2020.07.02 16:30 IMM*/

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

// частичные классы и методы

// частичные методы не могут иметь out параметры

namespace Generics_011
{
    /*
    Частичный класс, параметризированный указателем места заполнения 
    типом - T
    */
    public partial class MyClass<T>
    {
        /*
        Частичный метод, параметризированный указателем места заполнения
        типом - T
        */
        partial void PartialMethod<T>(T a, ref T b);
    }

    public partial class MyClass<T>
    {
        partial void PartialMethod<T>(T a, ref T b)
        {
            b = default(T);
            Console.WriteLine("{0}, {1}", a, b);
        }

        public void Proxy(T a, ref T b)
        {
            PartialMethod(a, ref b);
        }
    }

        class Program
    {
        static void Main(string[] args)
        {
        }
    }
}
