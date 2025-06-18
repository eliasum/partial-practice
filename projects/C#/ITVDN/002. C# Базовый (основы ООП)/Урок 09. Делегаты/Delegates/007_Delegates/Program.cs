/*2020.09.27 17:16 IMM*/

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

// анонимные (лямбда) методы

namespace _006_Delegates
{
    // создаем класс-делегат, вместо слова class слово delegate, тела класса нет
    public delegate void MyDelegate(ref int a, ref int b, out int c);
    /*
    ref - берется значение переменной по ссылке
    out - тот же ref, но с условием, что параметру в методе должно быть присвоено значение.
    ref предполагает значение имеющееся ДО передачи его в метод, а out нет
    применяя ref мы можем использовать значение в методе, при этом его можно изменить, а можно и оставить
    какое было
    применяя out нельзя использовать значение в методе, только присвоить (оставить каким было - нельзя, 
    по той причине что в методе мы не знаем каким же оно было изначально и х=х не сработает) 
    */

    class Program
    {
        static void Main(string[] args)
        {
            int summand1 = 1, summand2 = 2, sum;

            // создаем экземпляр класса-делегата MyDelegate и сообщаем с ним анонимный (лямбда) метод
            // инициализация экземпляра делегата анонимным методом
            MyDelegate myDelegate = delegate (ref int a, ref int b, out int c) { a++; b++; c = a + b; };    // анонимный (лямбда) метод с входящими аргументами
            // здесь слово delegate используется вместо сигнатуры лямбда-метода

            myDelegate(ref summand1, ref summand2, out sum);    // вызов анонимного метода, сообщенного с делегатом

            Console.WriteLine("{0} + {1} = {2}", summand1, summand2, sum);

            Console.ReadKey();
        }
    }
}
