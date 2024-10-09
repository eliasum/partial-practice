using System;

namespace Task_4
{
    class Program
    {
        static void Main(string[] args)
        {
            MyDate date1 = new MyDate(DateTime.Now);
            Console.WriteLine(date1.ToString());

            MyDate date2 = new MyDate(new DateTime(2012, 12, 4));
            Console.WriteLine(date2.ToString());

            Console.WriteLine(MyDate.Sub(date1, date2).ToString());
            Console.WriteLine(MyDate.Add(date1, date2).ToString());

            // Delay.
            Console.ReadKey();
        }
    }
}
