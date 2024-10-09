using System;

namespace Lessons_16
{
    class Program
    {
        static void Main()
        {
            Console.WriteLine("Введите число A");
            int operand1 = Convert.ToInt32(Console.ReadLine());

            Console.WriteLine("Введите число B");
            int operand2 = Convert.ToInt32(Console.ReadLine());

            Console.WriteLine("Введите операцию");
            string choice = Console.ReadLine();

            Calculator calculator = new Calculator();

            int? result = 0;
            bool calculation = true;
            switch (choice)
            {
                case "+":
                    {
                        result = calculator.Add(operand1, operand2);
                        break;
                    }
                case "-":
                    {
                        result = calculator.Sub(operand1, operand2);
                        break;
                    }
                case "*":
                    {
                        result = calculator.Mul(operand1, operand2);
                        break;
                    }
                case "/":
                    {
                        result = calculator.Div(operand1, operand2);
                        break;
                    }
                default:
                    {
                        Console.WriteLine("Вы ввели недопустимое значение.");
                        Console.ReadKey();
                        calculation = false;
                        break;
                    }
            }

            if (calculation && result != null)
            {
                Console.WriteLine("{0} {1} {2} = {3}", operand1, choice, operand2, result);
            }

            // Delay.
            Console.ReadKey();
        }
    }
}
