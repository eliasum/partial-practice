/*2020.10.20 17:19 IMM*/

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp2
{
    /*
    Интерфейс IDisposable

    Интерфейс IDisposable объявляет один единственный метод Dispose,
    в котором при реализации интерфейса в классе должно происходить
    освобождение неуправляемых ресурсов. Например:
    */
    class Program
    {
        static void Main(string[] args)
        {
            Test();
            Console.ReadLine();
        }

        private static void Test()
        {
            Person p = null;

            try
            {
                p = new Person();
            }

            finally
            {
                if (p != null)
                {
                    p.Dispose();
                }
            }
        }
    }

    /*
    Интерфейс IDisposable предоставляет механизм для освобождения
    неуправляемых ресурсов.
    */
    public class Person : IDisposable
    {
        public string Name { get; set; }

        /*
        Выполняет определяемые приложением задачи, связанные с 
        удалением, высвобождением или сбросом неуправляемых ресурсов.
        */
        public void Dispose()
        {
            Console.Beep();
            Console.WriteLine("Disposed");
        }
    }
}

/*
В данном коде используется конструкция try...finally. По сути эта 
конструкция по функционалу в общем эквивалентна следующим двум строкам кода:
	
Person p = new Person();
p.Dispose();

Но конструкцию try...finally предпочтительнее использовать при вызове
метода Dispose, так как она гарантирует, что даже в случае возникновения
исключения произойдет освобождение ресурсов в методе Dispose.
*/
