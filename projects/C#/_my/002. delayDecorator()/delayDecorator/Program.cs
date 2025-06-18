/*2025.04.30 13:21 IMM*/

using System;
using System.Threading.Tasks;

class Program
{
    /*
    Action<string> — это делегат в C#, который представляет метод, принимающий один 
    параметр типа string и не возвращающий значение (т.е. возвращаемое значение типа void).
    */
    // Функция, которая принимает другую функцию и задержку
    static Action<string> Delay(Action<string> action, int ms)
    {
        return (message) => 
        {
            /*
            t — это объект типа Task, который используется в методе ContinueWith для указания действия,
            которое должно быть выполнено после завершения асинхронной операции Task.Delay. В данном 
            случае t не используется напрямую, так как важен только вызов action(message).
            */
            // Запуск асинхронной задержки
            Task.Delay(ms).ContinueWith(t => action(message));
        };
    }

    static void Main()
    {
        // Создаем обертку с задержкой 1000 мс
        var delayedLog = Delay(Console.WriteLine, 1000);
        delayedLog("Hello, after 1 second!");  // передаем аргумент "Hello, after 1 second!"

        Console.ReadKey();
    }
}
