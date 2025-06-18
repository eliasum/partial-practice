using System;

namespace Task_4
{
    class Program
    {
        static void Main()
        {
            Console.WriteLine("Введите размерность массива:");
            int u = Convert.ToInt32(Console.ReadLine());

            var list = new MyList<int>(u);

            var t = new Random();
            for (int x = 0; x < u; x++)
            {
                list.Add(x, t.Next(100));
            }

            Console.WriteLine("Массив");
            int[] f = list.GetArray();   // использование расширяющего метода

            for (int i = 0; i < f.Length; i++)
            {
                Console.Write("{0} ", f[i]);
            }

            Console.WriteLine();
            Console.WriteLine("Длинна массива: {0}", list.Lenght);

            // Delay.
            Console.ReadKey();
        }
    }
}
