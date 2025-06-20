﻿//Создание потоков. Делегат ThreadStart

/*
Используя класс Thread, мы можем выделить в приложении несколько потоков, которые
будут выполняться одновременно.

Во-первых, для запуска нового потока нам надо определить задачу в приложении, 
которую будет выполнять данный поток. Для этого мы можем добавить новый метод,
производящий какие-либо действия.

Для создания нового потока используется делегат ThreadStart, который получает
в качестве параметра метод, который мы определили выше.

И чтобы запустить поток, вызывается метод Start. Рассмотрим на примере:
*/

using System;
using System.Threading;

class Program
{
    static void Main(string[] args)
    {
        /* Делегат - это обьект указывающий на метод.
        new ThreadStart(Count) - здесь происходит передача метода Count() объекту 
        myThread типа Thread через новый экземпляр делегата ThreadStart (сообщаем
        метод Count() с делегатом типа ThreadStart). При создании нового потока будет
        выполняться код из метода Count(). 
        Т.е. метод, код которого должен выполняться в другом потоке, передается в 
        качестве аргумента экземпляру делегата ThreadStart, который в свою очередь 
        передается в качестве аргумента экземпляру класса Thread:
        метод --> экземпляр делегата ThreadStart --> объект Thread
        */
        // создаем новый поток
        Thread myThread = new Thread(new ThreadStart(Count));

        myThread.Start(); // запускаем поток

        for (int i = 1; i < 9; i++)
        {
            Console.WriteLine("Главный поток:");
            Console.WriteLine(i * i);
            Thread.Sleep(300);
        }

        Console.ReadLine();
    }

    public static void Count()
    {
        for (int i = 1; i < 9; i++)
        {
            Console.WriteLine("Второй поток:");
            Console.WriteLine(i * i);
            Thread.Sleep(400);
        }
    }
}

/*
Здесь новый поток будет производить действия, определенные в методе Count. В
данном случае это возведение в квадрат числа и вывод его на экран. И после 
каждого умножения с помощью метода Thread.Sleep мы усыпляем поток на 400 миллисекунд.

Чтобы запустить этот метод в качестве второго потока, мы сначала создаем объект
потока: Thread myThread = new Thread(new ThreadStart(Count));. В конструктор
передается делегат ThreadStart, который в качестве параметра принимает метод
Count. И следующей строкой myThread.Start() мы запускаем поток. После этого 
управление передается главному потоку, и выполняются все остальные действия,
определенные в методе Main.

Таким образом, в нашей программе будут работать одновременно главный поток, 
представленный методом Main, и второй поток. Кроме действий по созданию 
второго потока, в главном потоке также производятся некоторые вычисления. 
Как только все потоки отработают, программа завершит свое выполнение.

Подобным образом мы можем создать и три, и четыре, и целый набор новых потоков,
которые смогут решать те или иные задачи.

Существует еще одна форма создания потока: Thread myThread = new Thread(Count);

Хотя в данном случае явным образом мы не используем делегат ThreadStart, но
неявно он создается. Компилятор C# 
выводит делегат из сигнатуры метода Count и вызывает соответствующий конструктор.
*/
