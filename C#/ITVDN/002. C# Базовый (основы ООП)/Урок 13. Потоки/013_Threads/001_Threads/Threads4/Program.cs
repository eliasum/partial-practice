/*2022.10.04 17:52 IMM*/
using System;
using System.Threading;

// Потоки. Передача данных в поток.

namespace Threads
{
    class Program
    {
        /* все статические методы находятся в области объекта, а не экземпляра, т.е. 
        статический метод может быть только один, но только не при работе с потоками,
        когда строится копия метода для каждого потока.
        Статический метод, который планируется выполнять в контексте вторичного потока,
        т.е. асинхронно. 
        */
        static void WriteSecond(object argument)
        {
            for (int i = 0; i < 10; i++)
            {
                Console.WriteLine(argument);
                Thread.Sleep(1000);
            }
        }

        /*
        метод Main() всегда запускается в контексте первичного потока, стек всегда
        выделяется потоку, а не методу Main()
        */
        static void Main()
        {
            /* Делегат - это обьект указывающий на метод.
            Здесь происходит передача метода WriteSecond объекту thread типа Thread
            через делегат writeSecond типа ParameterizedThreadStart (сообщаем метод
            WriteSecond() с делегатом типа ParameterizedThreadStart). При создании
            нового потока будет выполняться код из метода WriteSecond().
            Т.е. метод, код которого должен выполняться в другом потоке, передается в 
            качестве аргумента экземпляру делегата ParameterizedThreadStart, который
            в свою очередь передается в качестве аргумента экземпляру класса Thread:
            метод --> экземпляр делегата ParameterizedThreadStart --> объект Thread
            */
            // создание экземпляра класса делегата и сообщение с ним WriteSecond()
            ParameterizedThreadStart writeSecond = 
                new ParameterizedThreadStart(WriteSecond);

            // новый экземпляр класса Thread
            Thread thread = new Thread(writeSecond);
            thread.Start("Hello");

            Thread.Sleep(500);

            // Delay.
            Console.ReadKey();
        }
    }
}
