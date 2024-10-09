using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

// структуры могут содержать статические члены
// статические структуры недопустимы

namespace _005_Structure
{
    struct MyStruct
    {
        public static int Field
        {
            get;
            set;
        }

        public static void Show()
        {
            Console.WriteLine(Field);
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            // инициализация статических полей необязательна
            //MyStruct.Field = 1;

            MyStruct.Show();  // на структуре-объекте вызываем метод Show()

            Console.ReadKey();


        }
    }
}
