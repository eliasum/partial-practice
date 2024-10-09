using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _001_Nested
{
    class MyClass
    {
        public class Nested
        {
            public void Method()
            {
                Console.WriteLine("Метод из Nested класса");
            }
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            MyClass.Nested instance = new MyClass.Nested();

            instance.Method();

            Console.ReadKey();
        }
    }
}
