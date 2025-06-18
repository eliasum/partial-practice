using System;

namespace Task_2
{
    class MyArray
    {
        int[] array;

        public MyArray(int n)
        {
            array = new int[Math.Abs(n)];
            Random random = new Random();
            for (int i = 0; i < array.Length; i++)
            {
                array[i] = random.Next(0, 40);
                Console.Write("{0}, ", array[i]);
            }
        }

        public void MinMax()
        {
            int min = array[0];
            int max = array[0];
            for (int i = 1; i < array.Length; i++)
            {
                max = Math.Max(max, array[i]);
                min = Math.Min(min, array[i]);
            }
            Console.WriteLine("\nMax = {0}; Min = {1}", max, min);
        }

        public int Sum()
        {
            int sum = 0;
            for (int i = 0; i < array.Length; i++)
            {
                sum += array[i];
            }
            Console.Write("Sum = {0}, ", sum);
            return sum;
        }

        public void Average()
        {
            Console.WriteLine("Average = {0}, ", Sum() / array.Length);
        }

        public void Odd()
        {
            for (int i = 0; i < array.Length; i++)
            {
                if (array[i] % 2 != 0)
                {
                    Console.Write("{0} ", array[i]);
                }
            }
        }

    }
}
