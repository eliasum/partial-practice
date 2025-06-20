﻿/*2024.05.16 22:00 IMM*/

using System;

//        Замыкания

//Замыкание(closure) представляет объект функции, который запоминает свое лексическое
// окружение даже в том случае, когда она выполняется вне своей области видимости.

//Технически замыкание включает три компонента:

//  - внешняя функция, которая определяет некоторую область видимости и в которой 
//определены некоторые переменные и параметры -лексическое окружение

//  - переменные и параметры(лексическое окружение), которые определены во внешней функции

//  - вложенная функция, которая использует переменные и параметры внешней функции

//В языке C# реализовать замыкания можно разными способами - с помощью локальных функций
// и лямбда-выражений.

//Рассмотрим создание замыканий через локальные функции:

class Program
{
    static void Main(string[] args)
    {
        Action Outer()  // метод или внешняя функция
        {
            int x = 5;  // лексическое окружение - локальная переменная
            void Inner()    // локальная функция
            {
                x++;        // операции с лексическим окружением
                Console.WriteLine(x);
            }
            return Inner;   // возвращаем локальную функцию
        }

        var fn = Outer();   // fn = Inner, так как метод Outer возвращает функцию Inner
                            // вызываем внутреннюю функцию Inner
        fn();   // 6
        fn();   // 7
        fn();   // 8

        Console.Read();
    }
}