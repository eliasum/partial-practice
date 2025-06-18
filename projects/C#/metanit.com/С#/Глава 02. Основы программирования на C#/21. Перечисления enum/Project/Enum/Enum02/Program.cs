/*2020.07.11 20:13 IMM*/

using System;

//Зачастую переменная перечисления выступает в качестве хранилища
//состояния, в зависимости от которого производятся некоторые действия.
//Так, рассмотрим применение перечисления на более реальном примере:

namespace Enum02
{
    class Program
    {
        enum Operation
        {
            Add = 1,
            Subtract,
            Multiply,
            Divide
        }

        static void MathOp(double x, double y, Operation op)
        {
            double result = 0.0;

            switch (op)
            {
                case Operation.Add:
                    result = x + y;
                    break;
                case Operation.Subtract:
                    result = x - y;
                    break;
                case Operation.Multiply:
                    result = x * y;
                    break;
                case Operation.Divide:
                    result = x / y;
                    break;
            }

            Console.WriteLine("Результат операции равен {0}", result);
        }

        static void Main(string[] args)
        {
            /*
            Тип операции задаем с помощью константы Operation.Add, 
            которая равна 1
            */
            MathOp(10, 5, Operation.Add);

            /*
            Тип операции задаем с помощью константы 
            Operation.Multiply, которая равна 3
            */
            MathOp(11, 5, Operation.Multiply);

            Console.ReadLine();
        }
    }
}

//Здесь у нас имеется перечисление Operation, которое представляет 
//арифметические операции. Также у нас определен метод MathOp, который в
//качестве параметров принимает два числа и тип операции. В основном
//методе Main мы два раза вызываем процедуру MathOp, передав в нее два
//числа и тип операции.

