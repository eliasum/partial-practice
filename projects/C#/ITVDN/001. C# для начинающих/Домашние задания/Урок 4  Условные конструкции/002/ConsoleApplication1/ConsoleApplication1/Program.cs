using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ConsoleApplication1
{
    class Program
    {
        static void Main(string[] args)
        {
            for (; ; )
            {
                Console.WriteLine("Введите два целых числа: ");
                string operand1 = Console.ReadLine();
                string operand2 = Console.ReadLine();
                Console.WriteLine();

                Console.WriteLine("Введите знак арифметической операции: ");
                string sign = Console.ReadLine();

                switch (sign)
                { 
                    case "+":
                        Console.WriteLine("operand1 + operand2 = {0}", Convert.ToInt32(operand1) + Convert.ToInt32(operand2));
                        break;

                    case "-":
                        Console.WriteLine("operand1 - operand2 = {0}", Convert.ToInt32(operand1) - Convert.ToInt32(operand2));
                        break;

                    case "*":
                        Console.WriteLine("operand1 * operand2 = {0}", Convert.ToInt32(operand1) * Convert.ToInt32(operand2));
                        break;

                    case "/":
                        Console.WriteLine("operand1 / operand2 = {0}", Convert.ToInt32(operand1) / Convert.ToInt32(operand2));
                        break;

                    case "%":
                        Console.WriteLine("operand1 % operand2 = {0}", Convert.ToInt32(operand1) % Convert.ToInt32(operand2));
                        break;

                    default:
                        Console.WriteLine("нет такой операции");
                        continue;
                }

                Console.WriteLine("Произвести ещё вычисления?");
                if (Console.ReadLine() == "y")
                {
                    Console.WriteLine();
                    continue;
                }
                else break;
            }
        }
    }
}
