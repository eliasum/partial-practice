using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

// readonly - поля только для чтения

namespace ReadOnly
{
    class Program
    {
        // поле только для чтения (устанавливается только конструктором и инициализатором переменной)!
        public readonly string field = "hello";

        // конструктор
        public Program()  // изменение поля толькодлячтения возможно
        {                 // только при объявлении и в кострукторе класса
            field = "Поле только для чтения ";

            field += "!";
        }

        static void Main(string[] args)
        {
            Program program = new Program();

            Console.WriteLine(program.field);

            // ошибка компиляции
             //program.field = "Попытка записи в поле только для чтения.";

            Console.ReadKey();
        }
    }
}
