/*2022.10.04 14:21 IMM*/
using System;
using System.Threading;

// Потоки.

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
        static void WriteSecond()
        {
            // Thread.CurrentThread - возвращает ссылку на экземпляр текущего потока.
            Thread thread = Thread.CurrentThread;

            // Присваиваем потоку имя.
            thread.Name = "Secondary";

            // Выводим на экран информацию о текущем потоке.
            Console.WriteLine("ID потока {0}: {1}", thread.Name, thread.GetHashCode());

            for (int counter = 0; counter < 10; counter++)
            {
                Console.WriteLine(new string(' ', 15) + thread.Name + " " + counter);
                // Приостанавливаем выполнение текущего потока.
                Thread.Sleep(1000);
            }           
        }

        /*
        метод Main() всегда запускается в контексте первичного потока, стек всегда
        выделяется потоку, а не методу Main()
        */
        static void Main()
        {
            // Получаем ссылку на экземпляр текущего потока.
            Thread primaryThread = Thread.CurrentThread;

            // Присваиваем потоку имя.
            primaryThread.Name = "Primary";

            // Выводим на экран информацию о текущем потоке.
            Console.WriteLine("ID потока {0}: {1}", primaryThread.Name, primaryThread.GetHashCode());

            /* Делегат - это объект указывающий на метод.
            Здесь происходит передача метода WriteSecond объекту thread типа Thread
            через делегат writeSecond типа ThreadStart (сообщаем метод WriteSecond()
            с делегатом типа ThreadStart). При создании нового потока будет
            выполняться код из метода WriteSecond().
            Т.е. метод, код которого должен выполняться в другом потоке, передается в 
            качестве аргумента экземпляру делегата ThreadStart, который в свою очередь 
            передается в качестве аргумента экземпляру класса Thread:
            метод --> экземпляр делегата ThreadStart --> объект Thread
            */
            // Работа вторичного потока, асинхронно (здесь предположение делегата)
            Thread secondaryThread = new Thread(WriteSecond);
            secondaryThread.Start();
            
            // Работа первичного потока, синхронно
            for (int counter = 0; counter < 10; counter++)
            {
                Console.WriteLine(primaryThread.Name + " " + counter);
                // Приостанавливаем выполнение текущего потока.
                Thread.Sleep(1500);
            }

            // Delay.
            Console.ReadKey();
        }
    }
}
