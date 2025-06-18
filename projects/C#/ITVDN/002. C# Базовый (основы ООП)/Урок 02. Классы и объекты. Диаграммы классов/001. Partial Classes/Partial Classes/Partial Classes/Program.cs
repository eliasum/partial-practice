using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

// частичные классы

namespace Classes
{
    class Program
    {
        static void Main(string[] args)
        {
            PartialClass instance = new PartialClass();

            instance.MethodFromPart1();  // метод из первой части класса PartialClass
            instance.MethodFromPart2();  // метод из второй части класса PartialClass

            Console.ReadKey();
        }
    }
}
