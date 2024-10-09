/*2022.10.07 09:04 IMM*/
using System;

// Обработка внутренних исключений.

namespace Exceptions
{
    public class ClassWithException
    {
        // метод, генерирующий внутреннее исключение
        public void ThrowInner()
        {
            // анонимный экземпляр класса Exception
            throw new Exception("Это внутреннее исключение!");
        }

        // метод обработки внутреннего исключения
        public void CatchInner()
        {
            try
            {
                this.ThrowInner();
            }
            catch (Exception e)
            {
                // innerException:
                // Исключение, вызвавшее текущее исключение, или указатель NULL (Nothing в Visual
                // Basic), если внутреннее исключение не задано.
                // public Exception(string message, Exception innerException);
                throw new Exception("Это внешнее исключение!", e);
            }
        }
    }

    class Program
    {
        static void Main()
        {
            ClassWithException instance = new ClassWithException();
            //instance.CatchInner(); // Попробовать вызвать.
            try
            {
                instance.CatchInner();
            }
            catch (Exception exception)
            {
                Console.WriteLine("Exception caught: {0}", exception.Message);
                Console.WriteLine("Inner Exception : {0}", exception.InnerException.Message);
            }

            // Delay.
            Console.ReadKey();
         }
    }
}
