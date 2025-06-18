/*2022.10.11 13:54 IMM*/
using System;

//Если лямбда-выражение содержит несколько действий, то они помещаются в фигурные скобки:

namespace DSL02
{
    class Program
    {
        /*
            класс-делегат с именем Message. Метод, сообщенный с данным делегатом,
            не будет ничего принимать и ничего возвращать 
        */
        delegate void Message();

        static void Main(string[] args)
        {
            /*
                переменной делегата hello типа Message присвоить лямбда-выражение,
                которое ничего не принимает и ничего не возвращает  
            */
            Message hello = () =>
            {
                Console.Write("Hello ");
                Console.WriteLine("World");
            };
            hello();       // Hello World

            Console.ReadKey();
        }
    }
}