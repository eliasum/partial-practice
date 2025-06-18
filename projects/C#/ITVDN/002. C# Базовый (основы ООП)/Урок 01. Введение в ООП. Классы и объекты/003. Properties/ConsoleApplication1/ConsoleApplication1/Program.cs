using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ConsoleApplication1
{
    class MyClass
    {
        private string field = null;

        public void SetField(string value)  // метод-мутатор - mutator (setter)
        {
            field = value;
        }

        public string GetField()            // метод-аксессор - accessor (getter)
        {
            return field;
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            MyClass instance = new MyClass();

            instance.SetField("Hello world!!");     // метод-мутатор

            string @string = instance.GetField();   // метод-аксессор

            Console.WriteLine(@string);

            Console.ReadLine();
        }
    }
}
