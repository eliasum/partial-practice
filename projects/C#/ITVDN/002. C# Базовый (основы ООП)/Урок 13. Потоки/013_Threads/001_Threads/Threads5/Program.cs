/*2022.10.05 11:48 IMM*/
using System;
using System.Threading;

// Потоки. Анонимные методы.

namespace Threads
{
    class Program
    {
        /*
        метод Main() всегда запускается в контексте первичного потока, стек всегда
        выделяется потоку, а не методу Main()
        */
        static void Main()
        {
            int counter = 0;

            /*
            новый экземпляр класса Thread, ему в качестве аргумента передается 
            анонимный метод.

            Определение анонимных методов начинается с ключевого слова delegate, 
            после которого идет в скобках список параметров и тело метода в 
            фигурных скобках:

            delegate (параметры)
            {
                // инструкции
            }
            */
            // ThreadStart
            Thread thread = new Thread(delegate(){ Console.WriteLine("1. counter = {0}", ++counter); });
            thread.Start();

            Thread.Sleep(100);
            Console.WriteLine("2. counter = {0}", counter);

            /*
            новый экземпляр класса Thread, ему в качестве аргумента передается лямбда-выражение.
            Сообщение с делегатом анонимного метода
            */
            // ParameterizedThreadStart
            thread = new Thread((object argument) => { Console.WriteLine("3. counter = {0}", (int)argument); });
            thread.Start(counter);

            // Delay.
            Console.ReadKey();
        }
    }
}
