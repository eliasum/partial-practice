using System;

namespace Lambda
{
    class Program
    {
        private delegate double Mydelrgate(int a, int b, int c);

        static void Main()
        {
            Console.WriteLine("Введите первое число");
            int i = Convert.ToInt32(Console.ReadLine());

            Console.WriteLine("Введите второе число");
            int j = Convert.ToInt32(Console.ReadLine());

            Console.WriteLine("Введите третье число");
            int k = Convert.ToInt32(Console.ReadLine());

            Mydelrgate del = (a, b, c) => (double)(a + b + c) / 3;
            Console.WriteLine("Среднее арифметическое введенных числел {0:##.###}", del(i, j, k));

            // Delay.
            Console.ReadKey();
        }
    }
}
