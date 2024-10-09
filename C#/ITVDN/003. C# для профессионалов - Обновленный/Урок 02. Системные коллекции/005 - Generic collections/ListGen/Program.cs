/*2022.10.19 16:06 IMM*/
using System;
using System.Collections.Generic;
using System.Linq;

namespace ListGen
{
    class MyReverseComparer<T> : Comparer<T>
    {
        public override int Compare(T x, T y)
        {
            return y.GetHashCode() - x.GetHashCode();
        }
    }

    //Сортировка списка
    static class Program
    {
        static void Main()
        {
            var intList = new List<int>() { 1, 2, 3 };
            var reverseComparer = new MyReverseComparer<int>();

            int number = intList[0];
            Console.WriteLine("Original List");
            //PrintList(intList);
            intList.PrintList();

            Console.WriteLine("a. Sort(Comparision<T> comparision)");
            /*
                реализация реверсивной сортировки с помощью делегата 
                public delegate int Comparison<in T>(T x, T y);
            */
            intList.Sort(new Comparison<int>((x, y) => y - x));

            PrintList(intList);
            /*
                реализация реверсивной сортировки с помощью самописного класса  
                class MyReverseComparer<T> : Comparer<T>
            */
            Console.WriteLine("b. Sort(IComparer<T> comparer)");


            intList.Sort(reverseComparer);

            PrintList(intList);

            /*
                Строгая сортировка с использованием метода расширения LINQ OrdeBy(Func<int,int> keySelector)
            */
            Console.WriteLine("c. Strict sort by using LINQ OrdeBy(Func<int,int> keySelector) extension method");
            var newList = intList.OrderBy(value => value);

            PrintList(newList);
            PrintList(intList);

            Console.ReadKey();
        }

        /* 
            метод расширения, всегда располагается в статическом классе, применяется
            к объекту, расположенному после ключевого слова this 
            https://ru.stackoverflow.com/questions/1059736/%D0%9A%D0%BB%D1%8E%D1%87%D0%B5%D0%B2%D0%BE%D0%B5-%D1%81%D0%BB%D0%BE%D0%B2%D0%BE-this-%D0%B2-%D0%BF%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80%D0%B0%D1%85-%D0%BC%D0%B5%D1%82%D0%BE%D0%B4%D0%B0
        */
        private static void PrintList<T>(this IEnumerable<T> intList)
        {
            foreach (T i in intList)
            {
                Console.WriteLine(i);
            }

            Console.WriteLine(new string('-', 5));
        }
    }
}
