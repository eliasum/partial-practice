/*2020.09.27 17:01 IMM*/

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

// анонимные (лямбда) методы

namespace _005_Delegate
{
    // создаем класс-делегат с именем MyDelegate, 
    // метод, который будет сообщен с экземпляром данного класса-делегата,
    // не будет ничего принимать и возвращать (в данном примере)
    public delegate void MyDelegate(); // создаем класс-делегат, вместо слова class слово delegate, тела класса нет
    // делегат - это объект, с которым можно сообщить метод из другого объекта.

    class Program
    {
        static void Main(string[] args)
        {
            // создаем экземпляр класса-делегата MyDelegate и сообщаем с ним анонимный метод (лямбда метод)
            // инициализация экземпляра делегата анонимным методом
            MyDelegate myDelegate = delegate { Console.WriteLine("Hello world!"); };    // лямбда метод
            // здесь слово delegate используется вместо сигнатуры лямбда-метода

            // вызов анонимного метода, сообщенного с делегатом
            myDelegate();

            // другой способ вызова метода, сообщенного с делегатом
            myDelegate.Invoke();

            Console.ReadKey();
        }
    }
}
