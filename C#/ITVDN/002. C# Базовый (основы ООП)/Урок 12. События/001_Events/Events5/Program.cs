/*2022.10.03 10:04 IMM*/

using System;

// События (abstract and virtual).

namespace Events
{
    /*
        создать открытый класс делегат EventDelegate(). Метод, который будет сообщён 
        с экземпляром данного делегата ничего не принимает и ничего не возвращает
    */
    public delegate void EventDelegate();

    interface IInterface
    {
        event EventDelegate MyEvent;                    // Абстрактное событие.
        void InvokeEvent();
    }

    // класс, реализующий интерфейс IInterface
    public class BaseClass : IInterface
    {
        // виртуальное простое (незащищенное) событие без методов доступа add и remove
        public virtual event EventDelegate MyEvent = null;

        public virtual void InvokeEvent()
        {
            // на событии MyEvent вызвать метод Invoke()
            /*
                здесь произойдет вызов метода(методов), сообщённого(сообщённых) с
                делегатом, на который будет ссылаться событие MyEvent
            */
            MyEvent.Invoke();
        }
    }

    public class DerivedClass : BaseClass
    {
        // переопределение простого (незащищенного) события без методов доступа add и remove
        public override event EventDelegate MyEvent = null;

        // переопределение метода вызова события MyEvent
        public override void InvokeEvent()
        {
            // на событии MyEvent вызвать метод Invoke()
            /*
                здесь произойдет вызов метода(методов), сообщённого(сообщённых) с
                делегатом, на который будет ссылаться событие MyEvent
            */
            MyEvent.Invoke();
        }
    }

    class Program
    {
        // Методы обработчики события.

        static private void Handler1()
        {
            Console.WriteLine("Обработчик события 1");
        }

        static private void Handler2()
        {
            Console.WriteLine("Обработчик события 2");
        }

        static void Main()
        {
            DerivedClass instance = new DerivedClass();

            // Присоединение обработчиков событий.
            instance.MyEvent += new EventDelegate(Handler1);
            instance.MyEvent += new EventDelegate(Handler2);

            //Метод который вызывает событие.
            instance.InvokeEvent();

            Console.WriteLine(new string('-', 20));

            // Открепляем Handler2().
            instance.MyEvent -= new EventDelegate(Handler2);
            instance.InvokeEvent();

            // Delay.
            Console.ReadKey();
        }
    }
}
