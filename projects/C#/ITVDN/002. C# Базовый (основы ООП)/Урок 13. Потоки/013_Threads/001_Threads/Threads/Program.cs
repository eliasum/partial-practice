/*2022.10.04 11:20 IMM*/
using System;
using System.Threading;

// Потоки.

namespace Threads
{
    class Program
    {
        // Метод, который планируется выполнять в отдельном потоке (асинхронно)
        static void WriteSecond()
        {
            while (true)
            {
                Console.WriteLine(new string(' ', 10) + "Secondary");
            }
        }

        static void Main()
        {
            /* Делегат - это объект, указывающий на метод.
            Здесь происходит передача метода WriteSecond объекту thread типа Thread
            через делегат writeSecond типа ThreadStart (сообщаем метод WriteSecond()
            с делегатом типа ThreadStart). При создании нового потока будет
            выполняться код из метода WriteSecond().
            Т.е. метод, код которого должен выполняться в другом потоке, передается в 
            качестве аргумента экземпляру делегата ThreadStart, который в свою очередь 
            передается в качестве аргумента экземпляру класса Thread:
            метод --> экземпляр делегата ThreadStart --> объект Thread
            */
            ThreadStart writeSecond = new ThreadStart(WriteSecond);

            // новый экземпляр класса Thread
            Thread thread = new Thread(writeSecond);

            thread.Start();

            while (true)
            {
                Console.WriteLine("Primary");
            }
            
            // Delay.
            Console.ReadKey();
        }
    }
}
