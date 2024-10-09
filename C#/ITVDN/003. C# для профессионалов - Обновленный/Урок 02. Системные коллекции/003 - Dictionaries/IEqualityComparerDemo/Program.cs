/*2022.10.18 15:03 IMM*/
using System;
using System.Collections;

namespace IEqualityComparerDemo
{
    // нечувствительный сравнитель
    public class InsensitiveComparer : IEqualityComparer
    {
        // регистро-нечувствительный сравнитель
        readonly CaseInsensitiveComparer comparer = new CaseInsensitiveComparer();

        /*
            преобразовать объект в строку, привести к нижнему регистру и взять 
            от полученной строки хеш-код
        */
        public int GetHashCode(object obj)
        {
            return obj.ToString().ToLowerInvariant().GetHashCode();
        }

        /*
            метод сравнения объектов:
            возвращает булевский результат сравнения двух объектов, 
            true если они совпадают и false в противном случае
        */
        public new bool Equals(object x, object y)
        {
            return comparer.Compare(x, y) == 0;
        }
    }

    class Program
    {
        static void Main()
        {
            /*
                конструктор класса Hashtable, принимающий экземпляр класса IEqualityComparer
            */
            // Создаем коллекцию не чувствительную к регистру символов.
            var dehash = new Hashtable(new InsensitiveComparer());

            dehash["First"] = "1st";
            dehash["Second"] = "2nd";
            dehash["Third"] = "3rd";
            dehash["Fourth"] = "4th";
            dehash["fourth"] = "4TH!!!";

            Console.WriteLine(dehash.Count);

            // Delay.
            Console.ReadKey();
        }
    }
}
