using System;
using System.Collections;
using System.Collections.Generic;

namespace HelloApp
{
    // ---3--- 
    // реализация интерфейса IEnumerator
    class WeekEnumerator : IEnumerator<string>
    {
        string[] days;
        int position = -1;

        // конструктор
        public WeekEnumerator(string[] days)
        {
            this.days = days;
        }
        public string Current
        {
            get
            {
                if (position == -1 || position >= days.Length)
                    throw new InvalidOperationException();
                return days[position];
            }
        }

        // ---4--- 
        object IEnumerator.Current => throw new NotImplementedException();

        /*
        Ключевой момент при реализации перечислителя - перемещения указателя 
        на элемент. В классе WeekEnumerator для хранения текущей позиции определена
        переменная position. Следует учитывать, что в самом начале (в исходном 
        состоянии) указатель должен указывать на позицию условно перед первым 
        элементом. Когда будет производиться цикл foreach, то данный цикл 
        вначале вызывает метод MoveNext и фактически перемещает указатель на одну
        позицию в перед и только затем обращается к свойству Current для получения
        элемента в текущей позиции. 
        */
        public bool MoveNext()
        {
            if (position < days.Length - 1)
            {
                position++;
                return true;
            }
            else
                return false;
        }

        public void Reset()
        {
            position = -1;
        }

        public void Dispose() { }
    }

    // ---2--- 
    /*
    класс Week, который представляет неделю и хранит все дни недели, 
    реализует интерфейс IEnumerable 
    */
    class Week
    {
        string[] days = { "Monday", "Tuesday", "Wednesday", "Thursday",
                         "Friday", "Saturday", "Sunday" };

        /*
        вместо реализации IEnumerator мы просто возвращаем в методе 
        GetEnumerator объект IEnumerator для массива. Благодаря
        этому мы можем перебрать все дни недели в цикле foreach.
        для перебора коллекции через foreach в принципе необязательно 
        реализовать интерфейс IEnumerable. Достаточно в классе определить
        публичный метод GetEnumerator, который бы возвращал объект IEnumerator
        */
        public IEnumerator<string> GetEnumerator()
        {
            //return days.GetEnumerator();    // ---2--- 

            /*
            Здесь теперь класс Week использует не встроенный перечислитель,
            а WeekEnumerator, который реализует IEnumerator 
            */
            return new WeekEnumerator(days);    // ---3--- 
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            /*
            ---1--- 

            int[] numbers = { 0, 2, 4, 6, 8, 10 };

            IEnumerator ie = numbers.GetEnumerator(); // получаем IEnumerator

            while (ie.MoveNext())   // пока не будет возвращено false
            {
                int item = (int)ie.Current;     // берем элемент на текущей позиции
                Console.WriteLine(item);
            }

            ie.Reset(); // сбрасываем указатель в начало массива

            Console.Read();
            */

            // ---2, 3--- 
            Week week = new Week();

            foreach (var day in week)
            {
                Console.WriteLine(day);
            }

            Console.Read();
        }
    }
}