/*2022.10.03 10:35 IMM*/
using System;

// События.

namespace Events
{
    /*
        создать открытый класс делегат EventDelegate(). Метод, который будет сообщён 
        с экземпляром данного делегата ничего не принимает и ничего не возвращает
    */
    public delegate void EventDelegate();

    public class MyClass
    {
        /*
            простое (незащищенное) событие MyEvent без методов доступа add и remove,
            ссылающееся на делегат EventDelegate
        */
        public event EventDelegate MyEvent = null;

        public void InvokeEvent()
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
            MyClass instance = new MyClass();

            // Присоединение обработчиков событий.
            instance.MyEvent += new EventDelegate(Handler1);
            instance.MyEvent += new EventDelegate(Handler2);
            // подписывание событию MyEvent анонимного метода
            instance.MyEvent += delegate { Console.WriteLine("Анонимный метод 1."); };

            instance.InvokeEvent();

            Console.WriteLine(new string('-', 20));

            // Открепляем Handler2().
            instance.MyEvent -= new EventDelegate(Handler2);
            
            // Невозможно открепить ранее присоединенный анонимный метод.
            instance.MyEvent -= delegate { Console.WriteLine("Анонимный метод 1."); };

            instance.InvokeEvent();

            // Delay.
            Console.ReadKey();
        }
    }
}
