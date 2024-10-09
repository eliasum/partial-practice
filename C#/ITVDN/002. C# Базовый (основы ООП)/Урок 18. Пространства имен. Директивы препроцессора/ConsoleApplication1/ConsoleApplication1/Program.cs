/*2022.10.12 14:57 IMM*/
using System;
using ClassLibrary1;
using ClassLibrary2;

namespace ConsoleApplication1
{
    class Program
    {
        static void Main()
        {
            Class1 instance = new Class1();
            instance.Method();

            Class2 instance2 = new Class2();
            instance2.Method();

            Console.ReadKey();
        }
    }
}
