/*2022.10.11 14:14 IMM*/
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

//Если лямбда имеет один параметр, для которого не требуется указывать тип данных, то скобки можно опустить:

namespace DSL04
{
    class Program
    {
        /*
            класс-делегат с именем PrintHandler. Метод, сообщенный с данным делегатом,
            будет принимать один строковый параметр и ничего не возвращать 
        */
        delegate void PrintHandler(string message);

        static void Main(string[] args)
        {
            /*
                переменной делегата print типа PrintHandler присвоить лямбда-выражение,
                которое принимает один строковый параметр и ничего не возвращает  
            */
            PrintHandler print = message => Console.WriteLine(message);
            print("Hello");         // Hello
            print("Welcome");       // Welcome

            Console.ReadKey();
        }
    }
}