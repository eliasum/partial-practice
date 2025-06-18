/*2022.10.05 16:18 IMM*/
using System;
using System.Threading;

// Критическая секция (critical section).

namespace CriticalSection
{
    class Program
    {
        /*
        объект блокировки или объект синхронизации доступа к разделяемому ресурсу
        из нескольких потоков
        */
        static object locker = new object();

        // метод запускаемый асинхронно (в контексте вторичного потока)
        static void WriteSecond()
        {
            for (int i = 0; i < 20; i++)
            {
                /*
                критическая секция - участок кода, в котором происходит попытка
                доступа к разделяемому ресурсу.
                */

                /*Начало*/
                lock (locker)
                {
                    // разделяемый ресурс между потоками - Console
                    Console.ForegroundColor = ConsoleColor.Yellow;
                    Console.WriteLine(new string(' ', 10) + "Secondary");
                    Console.ForegroundColor = ConsoleColor.Gray;
                    Thread.Sleep(100);
                }
                /*Конец*/
            }
        }

        static void Main()
        {
            Console.SetWindowSize(80, 45);

            /*
            Делегат - это объект, указывающий на метод.
            Здесь происходит передача метода WriteSecond объекту thread типа Thread
            через делегат writeSecond типа ThreadStart (сообщаем метод WriteSecond()
            с делегатом типа ThreadStart). При создании нового потока будет
            выполняться код из метода WriteSecond().

            Т.е. метод, код которого должен выполняться в другом потоке, передается в 
            качестве аргумента экземпляру делегата ThreadStart, который в свою очередь 
            передается в качестве аргумента экземпляру класса Thread:
            метод --> экземпляр делегата ThreadStart --> объект Thread
            */

            // создаем новый делегат типа ThreadStart
            ThreadStart writeSecond = new ThreadStart(WriteSecond);

            // создаем экземпляр вторичного потока
            Thread thread = new Thread(writeSecond);

            // запускаем новый поток асинхронно
            thread.Start();
          
            for (int i = 0; i < 20; i++)
            {
                /*
                критическая секция - участок кода, в котором происходит попытка
                доступа к разделяемому ресурсу.
                */

                /*Начало*/
                lock (locker)
                {
                    // разделяемый ресурс между потоками - Console
                    Console.ForegroundColor = ConsoleColor.Green;
                    Console.WriteLine("Primary");
                    Console.ForegroundColor = ConsoleColor.Gray;
                    Thread.Sleep(100);
                }
                /*Конец*/
            }

            // Delay.
            Console.ReadKey();
        }
    }
}
