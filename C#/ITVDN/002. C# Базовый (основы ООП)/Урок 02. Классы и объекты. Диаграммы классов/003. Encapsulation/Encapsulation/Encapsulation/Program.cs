using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

// объект не может скрывать (инкапсулировать) ничего от другого объекта того же класса
// т.е. инкапсуляция внутри класса не работает

namespace Classes
{
    class MyClass
    {
        MyClass my = null;  // ссылка на самого себя

        private void Method()
        {
            Console.WriteLine("Hello");
        }

        public void CallMethod()
        {
            my = new MyClass();

            // private метод виден на экземпляре!
            my.Method();
        }
    }

    class Program
    {
        static void Main(string[] args) 
        {
            MyClass my = new MyClass();
            my.CallMethod();
            //my.Method(); // недопустимо

            Console.ReadKey();
        }
    }
}
