/*2022.10.12 09:38 IMM*/
using System;

// Динамические типы данных. (События) 

namespace Dynamic
{
    delegate dynamic MyDelegate(dynamic sender, dynamic e);

    class MyClass
    {
        // динамическое поле
        dynamic myEvent;

        /*
            public event dynamic MyEvent - не работает. Событийная 
            модель не поддерживает динамическую типизацию
        */
        public event MyDelegate MyEvent
        {
            add { myEvent += value; }
            remove { myEvent -= value; }
        }
       
        public dynamic Method(dynamic sender, dynamic e)
        {
            myEvent.Invoke(sender, e);
            return default(dynamic);
        }
    }

    class Program
    {
        static dynamic Handler(dynamic sender, dynamic e)
        {
            Console.WriteLine("sender = {0}, e = {1}", sender, e);
            return default(dynamic);
        }

        static void Main()
        {
            dynamic my = new MyClass();
            my.MyEvent += new MyDelegate(Handler);
            //Console.WriteLine();
            my.Method("user", "mouse");

            // Delay.
            Console.ReadKey();
        }
    }
}
