﻿/*2022.10.05 15:11 IMM*/
using System;
using System.Threading;

// Критическая секция (critical section).

// lock - блокирует блок кода так, что в каждый отдельный момент времени, этот блок кода
// сможет использовать только один поток. Все остальные потоки ждут пока текущий поток,
// закончит работу.

namespace CriticalSection
{
    class MyClass
    {
        /*
        объект блокировки или объект синхронизации доступа к разделяемому ресурсу
        из нескольких потоков
        */
        object block = new object();

        // метод запускаемый асинхронно (в контексте вторичного потока)
        public void Method()
        {
            // хэш текущего потока
            int hash = Thread.CurrentThread.GetHashCode();

            /*
            критическая секция - участок кода, в котором происходит попытка
            доступа к разделяемому ресурсу. 
            */
            // конструкция lock - безопасная синтаксическая конструкция

            /*Начало*/
            lock (block) // Закомментировать lock.
            {
                for (int counter = 0; counter < 10; counter++)
                {
                    // разделяемый ресурс между потоками - Console
                    Console.WriteLine("Поток # {0}: шаг {1}", hash, counter);
                    Thread.Sleep(100);
                }
                Console.WriteLine(new string('-', 20));                
            }
            /*Конец*/
        }

        class Program
        {
            static void Main()
            {
                // установить размер окна консоли
                Console.SetWindowSize(80, 40);

                // экземпляр класса MyClass
                MyClass instance = new MyClass();

                // создание и запуск трех потоков
                for (int i = 0; i < 3; i++)
                {
                    //Делегат - это объект, указывающий на метод.
                    //Здесь происходит передача метода instance.Method()
                    //объекта instance класса MyClass новому анонимному объекту 
                    //типа Thread через новый экземпляр делегата ThreadStart НЕЯВНО
                    //(сообщаем метод instance.Method() с делегатом типа ThreadStart).
                    //При создании нового потока будет выполняться код из метода
                    //instance.Method().

                    //Т.е. метод, код которого должен выполняться в другом потоке, 
                    //передается в качестве аргумента экземпляру делегата ThreadStart
                    //НЕЯВНО, который в свою очередь передается в качестве аргумента
                    //анонимному экземпляру класса Thread:
                    //метод --> экземпляр делегата ThreadStart НЕЯВНО --> объект Thread

                    // создаем и запускаем новый поток (здесь предположение делегата)
                    new Thread(instance.Method).Start();
                }

                Thread.Sleep(500);

                // Delay.
                Console.ReadKey();
            }
        }
    }
}