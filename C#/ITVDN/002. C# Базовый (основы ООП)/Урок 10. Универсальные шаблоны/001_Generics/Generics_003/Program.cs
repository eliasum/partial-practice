/*2020.06.22 22:42 IMM*/

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

// универсальные шаблоны (универсальный метод)

namespace Generics_003
{
    class MyClass
    {
        // метод, параметризированный одним указателем места заполнения типом - Т
        public void Method<T>(T argument)
        {
            T variable = argument;
            Console.WriteLine(variable);
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            /*
            Создать экземпляр класса MyClass и присвоить его переменной instance
            типа MyClass
            */
            MyClass instance = new MyClass();

            // вызываем метод и закрываем его типом string
            instance.Method<string>("Hello world!");

            // явно не указывается параметр типа
            instance.Method("Привет мир!");

            Console.ReadKey();
        }
    }
}
