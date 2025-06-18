using System;

namespace Task_4
{
    class MyDate
    {
        readonly DateTime date;

        public MyDate(DateTime date)
        {
            this.date = date;
        }

        public static MyDate operator -(MyDate date1, MyDate date2)
        {
            TimeSpan timeSpan = date1.date - date2.date;
            DateTime newDate = date1.date.AddDays(timeSpan.Days);
            return new MyDate(newDate);
        }

        public static MyDate operator +(MyDate date1, MyDate date2)
        {
            TimeSpan timeSpan = date1.date - date2.date;
            DateTime newDate = date1.date.AddDays(-timeSpan.Days);
            return new MyDate(newDate);
        }

        public static MyDate Sub(MyDate d1, MyDate d2)
        {
            return d1 - d2;
        }

        public static MyDate Add(MyDate d1, MyDate d2)
        {
            return d1 + d2;
        }

        public override string ToString()
        {
            return "Дата: " + date;
        }
    }
}
