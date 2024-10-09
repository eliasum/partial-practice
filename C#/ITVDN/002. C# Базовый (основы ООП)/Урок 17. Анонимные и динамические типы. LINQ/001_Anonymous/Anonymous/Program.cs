/*2022.10.10 16:09 IMM*/
using System;

// Анонимные типы.

// Анонимные типы предлагают удобный способ инкапсулирования набора свойств в один объект 
// без необходимости предварительного явного определения типа.
// Имя типа создается компилятором и недоступно на уровне исходного кода.
// Анонимные типы являются ссылочными типами, которые происходят непосредственно от класса object.
// Компилятор присваивает им имена, несмотря на то что эти имена недоступны для приложения.

namespace Anonymous
{
    //class MyClass
    //{
    //    public string Name { get; set; }
    //    public int Age { get; set; }
    //}

    class Program
    {
        static void Main()
        {
            //var instance = new MyClass() { Name = "Alex", Age = 27 };
            var instance = new { Name = "Alex", Age = 27 };

            //instance.Name = "XXX"; // readonly

            Console.WriteLine("Name = {0}, Age = {1}", instance.Name, instance.Age);

            Type type = instance.GetType();

            Console.WriteLine(type.ToString());

            // Delay.
            Console.ReadKey();
        }
    }
}
