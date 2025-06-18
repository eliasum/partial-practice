/*2020.09.27 17:44 IMM*/

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

// лямбда выражения и лямбда операторы

namespace _009_Delegates
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
            // создаем переменную типа класса-делегата MyDelegate
            MyDelegate myDelegate;

            // создаем экземпляр класса-делегата MyDelegate и сообщаем с ним анонимный (лямбда) метод 
            // инициализация экземпляра делегата анонимным методом
            myDelegate = delegate { Console.WriteLine("Hello 1"); };    // лямбда-метод (без входных параметров)
            // здесь слово delegate используется вместо сигнатуры лямбда-метода

            myDelegate += () => { Console.WriteLine("Hello 2"); };      // лямбда-оператор
            // отличие - убрали слово delegate, добавили () и =>

            myDelegate += () => Console.WriteLine("Hello 3");           // лямбда-выражение
            // отличие - убрали {}

            // вызов группы анонимных (лямбда) методов, сообщенных с комбинированным (групповым) делегатом
            myDelegate();   

            Console.ReadKey();
        }
    }
}
