using System;
using System.Collections;

namespace Lessons_15
{
    class Program
    {
        static IEnumerable FindEven(int[] arr)
        {
            if (arr.Length != 0)
            {
                for (int i = 0; i < arr.Length; i++)
                    if (arr[i] % 2 == 0)
                        yield return arr[i];
            }
            else
            {
                yield break;
            }

        }

        static void Main()
        {
            int[] array = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 };
            IEnumerable res = FindEven(array);
            foreach (int elem in res)
                Console.Write("{0}  ", elem);
            Console.Write("\n");
            Console.ReadKey();
        }
    }
}
