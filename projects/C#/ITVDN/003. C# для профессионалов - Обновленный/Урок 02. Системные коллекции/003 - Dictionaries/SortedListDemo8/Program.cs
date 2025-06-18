/*2022.10.18 16:09 IMM*/
using System;
using System.Collections;

namespace SortedListDemo8
{
    class Program
    {
        static void Main()
        {
            /*
                конструктор экземпляра класса SortedList принимает экземпляр
                сравнителя, в данном случае DescendingComparer() - сортировка 
                по убыванию
            */
            var sort = new SortedList(new DescendingComparer());
       
            sort["First"] = "1st";
            sort["Second"] = "2nd";
            sort["Third"] = "3rd";
            sort["Fourth"] = "4th";
            sort["fourth"] = "44th";

            foreach (DictionaryEntry entry in sort)
            {
                Console.WriteLine("{0} = {1}", entry.Key, entry.Value);
            }

            // Delay.
            Console.ReadKey();
        }
    }

    /*
        класс сортировки по убыванию
    */
    public class DescendingComparer : IComparer
    {
        // регистро-нечувствительный сравнитель
        CaseInsensitiveComparer comparer = new CaseInsensitiveComparer();

        public int Compare(object x, object y)
        {
            /*
                сортировка по убыванию реализуется за счет перестановки 
                местами параметров x и y
            */
            // Для сортировки по убыванию.
            // Объекты, переданные для сравнения, меняются местами.
            int result = comparer.Compare(y, x);
            return result;
        }
    }
}
