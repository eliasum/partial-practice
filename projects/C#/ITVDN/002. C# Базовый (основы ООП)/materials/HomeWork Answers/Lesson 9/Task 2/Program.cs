using System;

namespace DelegateCalculate
{
    class Program
    {
        delegate double MyDelegate(int a, int b);

        static void Main()
        {
            Console.WriteLine("Введите первое число");
            int a = Convert.ToInt32(Console.ReadLine());

            Console.WriteLine("Введите второе число");
            int b = Convert.ToInt32(Console.ReadLine());

            Console.WriteLine("Введите оператор(+,-,*,/)");
            string z = Convert.ToString(Console.ReadLine());

            MyDelegate op = null;

            switch (z)
            {
                case "+":
                    op = (x, y) => { return x + y; };
                    break;
                case "-":
                    op = (x, y) => { return x - y; };
                    break;
                case "*":
                    op = (x, y) => { return x * y; };
                    break;
                case "/":
                    op = (x, y) =>
                    {
                        if (y != 0)
                        {
                            return x / (double)y;
                        }
                        else
                        {
                            Console.WriteLine("На нуль делить нельзя!");
                            return 0;
                        }
                    };
                    break;
                default:
                    Console.WriteLine("Вы неправильно ввели знак операции!");
                    break;
            }
            Console.WriteLine(new string('-', 30));
            if (op != null)
                Console.WriteLine("{0:##.###}", op(a, b));

            // Delay.
            Console.ReadKey();
        }
    }
}
