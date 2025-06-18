/*2025.04.30 13:45 IMM*/
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Action
{
    class Program
    {
        static void Main(string[] args)
        {
            /*
            Action<string> — это делегат в C#, который представляет метод, принимающий один 
            параметр типа string и не возвращающий значение (т.е. возвращаемое значение типа void).

            Разбор:
            Action — это предустановленный тип делегата в .NET, который используется для 
            представления методов, не возвращающих значения. Он может принимать до 16 параметров
            (например, Action<T1>, Action<T1, T2>, и так далее).

            <string> — это тип, который будет передаваться в качестве параметра методу, к которому
            привязан делегат. В данном случае метод принимает один параметр типа string.
            */

            // Создание делегата, который ссылается на метод PrintMessage
            Action<string> action = PrintMessage;

            action("Hello, world!");

            Console.ReadKey();
        }

        // Метод, который соответствует делегату Action<string>
        static void PrintMessage(string message)
        {
            Console.WriteLine(message);
        }
    }
}
/*В этом примере:

Мы создаём делегат Action<string>, который ссылается на метод PrintMessage.

Когда мы вызываем action("Hello, world!");, делегат вызывает метод PrintMessage, 
передавая строку "Hello, world!" в качестве параметра.

Зачем это нужно?
Делегаты, такие как Action<string>, полезны для:

Инкапсуляции логики — позволяет передавать методы как параметры в другие методы.

Обработки событий — например, когда вы хотите связать несколько обработчиков с событием.

Функциональной парадигмы — передача методов как объектов для обработки данных.
*/
