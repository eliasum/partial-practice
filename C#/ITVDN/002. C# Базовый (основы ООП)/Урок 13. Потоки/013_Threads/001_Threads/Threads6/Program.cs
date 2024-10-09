/*2022.10.05 14:05 IMM*/
using System;
using System.Threading;

// Основные и фоновые потоки. По умолчанию свойство IsBackground равно false.

namespace Threads
{
    class Program
    {
        // Метод, который планируется выполнять в отдельном потоке (асинхронно)
        static void WriteSecond()
        {
            // бесконечный цикл
            while (true)
            {
                Console.WriteLine(new string(' ', 15) + "Secondary");
                Thread.Sleep(500);
            }
        }

        static void Main()
        {
            /* 
            Делегат - это объект указывающий на метод.
            Здесь происходит передача метода WriteSecond объекту thread типа Thread
            через делегат writeSecond типа ThreadStart (сообщаем метод
            WriteSecond() с делегатом типа ThreadStart). При создании
            нового потока будет выполняться код из метода WriteSecond().

            Т.е. метод, код которого должен выполняться в другом потоке, передается в 
            качестве аргумента экземпляру делегата ThreadStart, который
            в свою очередь передается в качестве аргумента экземпляру класса Thread:
            метод --> экземпляр делегата ThreadStart --> объект Thread
            */
            // Работа вторичного потока.
            ThreadStart writeSecond = new ThreadStart(WriteSecond);

            // создаем экземпляр нового потока
            Thread thread = new Thread(writeSecond);

            // запускаем новый поток
            thread.Start();

            // Работа первичного потока.
            for (int i = 0; i < 10; i++)
            {
                Console.WriteLine("Primary");
                Thread.Sleep(500);
            }

            // ПРИНУДИТЕЛЬНО завершить работу вторичного потока, сделае его фоновым    
            //thread.IsBackground = true;
        }
    }
}
