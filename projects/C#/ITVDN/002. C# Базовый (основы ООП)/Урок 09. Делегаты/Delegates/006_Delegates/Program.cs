using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

// анонимные (лямбда) методы

namespace _006_Delegates
{
    // создаем класс-делегат, вместо class слово delegate, тела класса нет
    // делегат - это объект, с которым можно сообщить метод из другого объекта.
    public delegate int MyDelegate(int a, int b);

    class Program
    {
        static void Main(string[] args)
        {
            int summand1 = 1, summand2 = 2, sum = 0;

            // создаем экземпляр класса-делегата MyDelegate и сообщаем с ним анонимный (лямбда) метод 
            // инициализация экземпляра делегата анонимным методом
            MyDelegate myDelegate = delegate (int a, int b) { return a + b; }; // анонимный (лямбда) метод с входящими аргументами
            // здесь слово delegate используется вместо сигнатуры лямбда-метода

            sum = myDelegate(summand1, summand2);   // вызов анонимного метода, сообщенного с делегатом
           
            Console.WriteLine("{0} + {1} = {2}", summand1, summand2, sum);

            Console.ReadKey();
        }
    }
}
