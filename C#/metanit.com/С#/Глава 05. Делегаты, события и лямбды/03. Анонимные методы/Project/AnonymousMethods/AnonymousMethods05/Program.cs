/*2022.10.11 11:09 IMM*/
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnonymousMethods05
{
    //При этом анонимный метод имеет доступ ко всем переменным, определенным во 
    //внешнем коде:

    class Program
    {
        delegate int Operation(int x, int y);

        static void Main(string[] args)
        {
            int z = 8;

            Operation operation = delegate (int x, int y)
            {
                return x + y + z;
            };

            int d = operation(4, 5);

            Console.WriteLine(d);       // 17

            Console.Read();
        }
    }

    //В каких ситуациях используются анонимные методы? Когда нам надо определить
    //однократное действие, которое не имеет много инструкций и нигде больше не 
    //используется. В частности, их можно использовать для обработки событий,
    //которые будут рассмотрены далее.
}
