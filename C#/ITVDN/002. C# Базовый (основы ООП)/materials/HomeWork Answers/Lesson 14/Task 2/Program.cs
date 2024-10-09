using System;

namespace Task_2
{
    class Program
    {
        static void Main()
        {
            MyList<int> list = new MyList<int>();
            for (int i = 0; i < 5; i++)
                list.Add(i);

            Console.WriteLine("Длина массива = {0}", list.Count);

            foreach (int item in list)
                Console.Write("{0}  ", item);

            // Delay.
            Console.ReadKey();
        }
    }
}
