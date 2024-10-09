/*2021.12.29 16:49 IMM*/

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

// ограничения параметра типа (тип либо ссылочный, либо структурный)

namespace GenericsConstraints
{
    /*
        class MyClass1 параметризированный указателем места заполнения 
        типом T

        where T : class  -   Аргумент типа должен иметь ссылочный тип, 
        это также распространяется на тип любого класса, интерфейса, 
        делегата или массива.
    */
    class MyClass1<T> where T : class
    {
        public T variable;
    }

    /*
        class MyClass2 параметризированный указателем места заполнения 
        типом T

        where T : struct  -  Аргумент типа должен иметь тип значения
        (структурного типа). 
        Допускается указание любого типа значения, кроме Nullable. 

        Nullable: https://metanit.com/sharp/tutorial/2.17.php
        В отличие от ссылочных типов переменным/параметрам значимых типов нельзя
        напрямую присвоить значение null. Тем не менее нередко бывает удобно, чтобы
        переменная/параметр значимого типа могли принимать значение null, например,
        получаем числовое значение из базы данных, которое в бд может отсутствовать.
        То есть, если значение в базе данных есть - получим число, если нет - то null.

        Чтобы присвоения переменной или параметру значимого типа значения null, эти
        переменная/параметр значимого типа должны представлять тип nullable. Для этого
        после названия типа указывается знак вопроса ?

        int? val = null;
    */
    class MyClass2<T> where T : struct
    {
        public T variable;
    }

    class Program
    {
        static void Main(string[] args)
        {
            /*
                создаем экземпляр класса MyClass1 и закрываем его типом string
            */
            MyClass1<string> instance1 = new MyClass1<string>();
            //MyClass1<int> instance1 = new MyClass1<int>();                // Ошибка.    int - структурный тип.

            /*
                создаем экземпляр класса MyClass2 и закрываем его типом int
            */
            MyClass2<int> instance2 = new MyClass2<int>();
            //MyClass2<string> instance2 = new MyClass2<string>();          // Ошибка.    string - ссылочный тип.

            // Delay.
            Console.ReadKey();
        }
    }
}
