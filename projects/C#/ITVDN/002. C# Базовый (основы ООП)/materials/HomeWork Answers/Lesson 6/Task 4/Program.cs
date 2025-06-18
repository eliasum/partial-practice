using System;

namespace Task_4
{
    static class Extend
    {
        static public void SortUp(this int[] array)
        {
            for (int i = 0; i < array.Length; i++)
            {
                for (int j = array.Length - 1; j > i; j--)
                {
                    if (array[i] > array[j])
                    {
                        int x = array[j];
                        array[j] = array[i];
                        array[i] = x;
                    }

                }
            }
        }
    }

    class Program
    {
        static void Main()
        {
            int[] array = { 1, 5, 0, 2, 3, 7, 8, 9, 6 };

            array.SortUp();

            foreach (int a in array)
                Console.Write(a + "  ");

            // Delay.
            Console.ReadKey();
        }
    }
}
