/*2022.10.11 14:19 IMM*/
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

//Возвращение результата

//Лямбда-выражение может возвращать результат.Возвращаемый результат можно указать после лямбда-оператора:

namespace DSL05
{
    class Program
    {
        /*
            класс-делегат с именем Operation. Метод, сообщенный с данным делегатом,
            будет принимать два целочисленных параметра и возвращать один целочисленный
            параметр
        */
        delegate int Operation(int x, int y);

        static void Main(string[] args)
        {
            /*
                переменной делегата sum типа Operation присвоить лямбда-выражение,
                которое принимает два целочисленных параметра и возвращант один
                целочисленный параметр
            */
            //var sum = (int x, int y) => x + y;
            Operation sum = (int x, int y) => x + y;
            int sumResult = sum(4, 5);                  // 9
            Console.WriteLine(sumResult);               // 9

            Operation multiply = (x, y) => x * y;
            int multiplyResult = multiply(4, 5);        // 20
            Console.WriteLine(multiplyResult);          // 20

            Console.ReadKey();
        }
    }
}


