/*2021.12.29 18:00 IMM*/

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

// ограничения переметров типа

namespace GenericsConstraints
{
    class Base
    {

    }

    // class Derived наследуется от класса Base
    class Derived : Base
    {

    }

    /*
        class MyClass параметризированный указателем места заполнения типом T

        where T : Base - аргумент типа должен являться или быть производным от
        указанного базового класса
    */
    class MyClass<T> where T : Base
    {

    }

    class Program
    {
        static void Main(string[] args)
        {
            MyClass<Base> mc1 = new MyClass<Base>();

            MyClass<Derived> mc2 = new MyClass<Derived>();

            //MyClass<string> mc3 = new MyClass<string>();  // ошибка

            Console.ReadKey();
        }
    }
}
