using System.Collections;
using System.Collections.Generic;
using System;
using System.Threading;

namespace Yield
{
    class UserCollection
    {
        // метод возвращает перечисляемую коллекцию
        public static IEnumerable Power()
        {
            /*
            yield - оператор автоматической генерации программного кода итераторов
            (перечислителей, энумераторов, переборщиков) коллекций

            переводится yield - возвращать, выдавать (когда речь идет о функции в программе)

            yield должен находиться только в методе с возвращаемым значением IEnumerable 
            */
            for (int i = 0; i < 10; i++)
            {
                yield return "Hello world!";
            }
            
        }
    }
}
