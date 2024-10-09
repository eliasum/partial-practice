using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

// Создание экземпляра по ссабой ссылке (Анонимные объекты)

namespace ConsoleApplication1
{
    class MyClass
    {
        public void Method()
        {
            Console.WriteLine("Hello world!");
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            new MyClass().Method();

            Console.ReadKey();
        }
    }
}
