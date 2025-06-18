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
    }

    // класс, реализующий интерфейс IInterface
    public class BaseClass : IInterface
    {
        /*
            создать открытое поле myEvent типа EventDelegate, которое будет
            ссылаться на делегат типа EventDelegate. Ссылка будет предоставлена
            событию MyEvent на экземпляре класса MyClass
        */
        EventDelegate myEvent = null;

        /*
            Создание сложного (безопасного) виртуального события MyEvent:
            Реализация методов доступа add и remove для события, контролируют подписку
            и отписку обработчика события
        */
        public virtual event EventDelegate MyEvent      // Виртуальное событие.
        {
            add { myEvent += value; }
            remove { myEvent -= value; }
        }

        // метод InvokeEvent()
        public void InvokeEvent()
        {
            // на событии MyEvent вызвать метод Invoke()
            /*
                здесь произойдет вызов метода(методов), сообщённого(сообщённых) с
                делегатом, на который будет ссылаться событие MyEvent
            */
            myEvent.Invoke();
        }
    }

    // производный класс, наследуемый от BaseClass, который реализует IInterface
    public class DerivedClass : BaseClass
    {
        public override event EventDelegate MyEvent     // Переопределенное событие.
        {
            add
            {
                base.MyEvent += value;
                Console.WriteLine("К событию базового класса был прикреплен обработчик - {0}", value.Method.Name);
            }
            remove
            {
                base.MyEvent -= value;
                Console.WriteLine("От события базового класса был откреплен обработчик - {0}", value.Method.Name);
            }
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

            // Метод который вызывает событие.
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
