/*2020.09.28 21:58 IMM*/

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

// предположение делегата

namespace _013_Delegates
{
    static class MyClass
    {
        public static void Method()
        {
            Console.WriteLine("Строку вывел метод, сообщенный с делегатом");
        }
    }

    // создаем класс-делегат с именем MyDelegate, 
    // метод, который будет сообщен с экземпляром данного класса-делегата,
    // не будет ничего принимать и возвращать (в данном примере)
    public delegate void MyDelegate(); // создаем класс-делегат, вместо слова class слово delegate, тела класса нет
    // делегат - это объект, с которым можно сообщить метод из другого объекта.

    class Program
    {
        static void Main(string[] args)
        {
            // MyDelegate myDelegate = new MyDelegate(MyClass.Method);

            // инициализация экземпляра делегата неанонимным методом
            MyDelegate myDelegate = MyClass.Method; // предположение делегата (этот код идентичен коду выше)
            myDelegate();

            Console.ReadKey();

        }
    }
}
