using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

// Передача экземпляра класса в качестве аргумента метода

namespace ConsoleApplication1
{
    class MyClass
    {
        public void Method()
        {
            Console.WriteLine("Вызван метод класса MyClass");
        }
    }

    class MyClass2
    {
        // на следующей строке создаем метод с именем CallMethod, который принимает один аргумент типа MyClass и ничего не возвращает
        public void CallMethod(MyClass my)
        {
            // В теле метода CallMethod вызываем метод с именем Method аргумента my
            my.Method();
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            MyClass my = new MyClass();
            MyClass2 my2 = new MyClass2();

            my2.CallMethod(my);

            // Delay
            Console.ReadKey();
        }
    }
}
