/*2020.09.28 22:42 IMM*/

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

// рекурсия в лямбда методах

namespace _014_Delegates
{
    // создаем класс-делегат, вместо слова class слово delegate, тела класса нет
    delegate void MyDelegate(int a); 

    class Program
    {
        static void Main(string[] args)
        {
            MyDelegate my = null;   // требуется обязательно присвоить null

            // требуется отдельное присвоение ссылки на делегат с сообщенным лямбда-оператором
            // в месте создания переменной, недопустимо сразу создавать лямбда-оператор
            // (именно в данном примере с рекурсией)
            
            // 1. анонимный (лямбда) метод
            // здесь слово delegate используется вместо сигнатуры лямбда-метода
            my = delegate(int i)      
            {
                i--;
                Console.WriteLine("Begin {0}", i);

                if(i>0)
                {
                    my(i);
                }

                Console.WriteLine("End {0}", i);
            };
            
            // 2. лямбда-оператор
            my = (int i) =>     
            {
                i--;
                Console.WriteLine("Begin {0}", i);

                if (i > 0)
                {
                    my(i);
                }

                Console.WriteLine("End {0}", i);
            };
            
            // 3. лямбда-выражение
            my = i =>
            {
                i--;
                Console.WriteLine("Begin {0}", i);

                if (i > 0)
                {
                    my(i);
                }

                Console.WriteLine("End {0}", i);
            };
           
            my(3);

            Console.ReadKey();
        }
    }
}
