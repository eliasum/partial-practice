using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

// расширяющие методы не могут иметь опциональных параметров, но могут быть перегружены

namespace _003_Extension
{
    static class ExtensionClass
    {
        public static void ExtensionMethod(this string value)
        {
            Console.WriteLine(value);
        }

        public static void ExtensionMethod(this string value1, string value2)
        {
            Console.WriteLine(value1+value2);
        }

        public static void ExtensionMethod(this int value)
        {
            Console.WriteLine(value);
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            string text = "Hello ";

            text.ExtensionMethod("world!");

            "Hello ".ExtensionMethod("world!");

            2.ExtensionMethod();

            Console.ReadKey();
        }
    }
}
