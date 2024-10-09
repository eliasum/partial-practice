using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ConsoleApplication1
{
    class MyClass
    {
        public string field;  // открытое поле

        public void Method()
        {
            Console.WriteLine(field);
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            // 1. создаем экземпляр класса MyClass (по сильной ссылке - ссылке, хранящейся в переменной)
            // 2. создаем экземпляр класса MyClass с именем instance
            // 3. инстанцируем класс MyClass
            // 4. создаем переменную с именем instance типа MyClass и присваиваем ей адрес экземпляра на куче
            // (instance - является ссылкой на экземпляр класса MyClass, построенный на куче)

            MyClass instance = new MyClass();

            // полю field экземпляра instance присваиваем значение Hello world!

            instance.field = "Hello world!";

            Console.WriteLine(instance.field);

            instance.Method();

            Console.ReadLine();
        }
    }
}
