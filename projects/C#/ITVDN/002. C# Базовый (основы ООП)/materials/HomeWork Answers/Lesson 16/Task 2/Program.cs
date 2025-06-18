using System;

namespace Task_2
{
    class Program
    {
        static void Main()
        {
            Block block1 = new Block(15, 12, 5, 7);
            Block block2 = new Block(7, 12, 5, 15);

            Console.WriteLine(block1.ToString());
            Console.WriteLine(block2.ToString());

            Console.WriteLine(new string(' ', 30));

            Console.WriteLine("Блок1 равно блок2 = {0} ", block1.Equals(block2));

            if (block1.GetHashCode() == block2.GetHashCode())
            {
                Console.WriteLine("Периметры двух блоков равны");
            }
            else
            {
                Console.WriteLine("Периметры блоков не равны");
            }

            // Delay.
            Console.ReadKey();
        }
    }
}
