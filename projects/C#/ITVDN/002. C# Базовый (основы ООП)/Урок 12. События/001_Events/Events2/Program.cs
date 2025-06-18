/*2022.06.07 17:46 IMM*/

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
            создать открытое поле myEvent типа EventDelegate, которое будет
            ссылаться на делегат типа EventDelegate. Ссылка будет предоставлена
            событию MyEvent на экземпляре класса MyClass
        */
        EventDelegate myEvent = null;

        /*
            Создание сложного (безопасного) события MyEvent:
            Реализация методов доступа add и remove для события, контролируют подписку
            и отписку обработчика события
        */
        public event EventDelegate MyEvent
        {
            add { myEvent += value; }
            remove { myEvent -= value; }
        }

        // метод InvokeEvent()
        public void InvokeEvent()
        {
            /*
                На событии myEvent вызвать метод Invoke()

                здесь произойдет вызов метода(методов), сообщённого(сообщённых) с
                делегатом, на который будет ссылаться событие MyEvent
            */
            myEvent.Invoke();
        }
    }

    class Program
    {
        /*
            Методы обработчики события. Их сигнатуры удовлетворяют требованию делегата 
            EventDelegate()
        */

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
            // создать экземпляр класса MyClass - объект, реагирующий на событие
            MyClass instance = new MyClass();

            /*
                Присоединение обработчиков событий. (Подписка на событие экземпляра
                класса MyClass)

                создать экземпляр делегата EventDelegate, сообщить с ним 
                метод-обработчик Handler1 и подписать его на событие MyEvent,
                где '+=' - знак подписки на событие
            */
            instance.MyEvent += new EventDelegate(Handler1);

            /*
                техника предположения делегата создана именно для событийной 
                модели
            */  
            instance.MyEvent += Handler2;

            /*
                Метод который вызывает событие.

                Запрещено на событии извне вызывать метод Invoke(), т.е. вот так: 

                instance.MyEvent.Invoke();

                Это безопасный вызов события. Можно добавить различные проверки
                в методе InvokeEvent().
            */
            instance.InvokeEvent();

            Console.WriteLine(new string('-', 20));

            // Открепляем Handler2().
            instance.MyEvent -= Handler2;

            instance.InvokeEvent();

            // Delay.
            Console.ReadKey();
        }
    }
}
