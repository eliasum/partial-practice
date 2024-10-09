using System;

namespace Task_2
{
    class Program
    {
        static void Main()
        {
            Console.WriteLine("Введите размерность массива:");
            string str = Console.ReadLine();
            int u = string.IsNullOrEmpty(str) ? 0 : Convert.ToInt32(str);

            var list = new MyList<int>();

            var t = new Random();
            for (int x = 0; x < u; x++)
            {
                list.Add(t.Next(100));
            }

            Console.WriteLine("Массив элементов:");
            for (int i = 0; i < list.Count; i++)
            {
                Console.Write(list[i] + " ");
            }
            Console.WriteLine();
            Console.WriteLine(new string('-', 30));

            Console.WriteLine("Введите значение для поиска:");
            if (list.Contains(Convert.ToInt32(Console.ReadLine())))
            {
                Console.WriteLine("Введенное значение содержится в массиве");
            }
            else
            {
                Console.WriteLine("Значение не найдено!");
            }

            //Delay
            Console.ReadKey();

        }
    }
}
