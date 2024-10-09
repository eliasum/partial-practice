/*2020.06.22 22:38 IMM*/

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

// универсальные шаблоны
// параметризированные классы
// дженерики

namespace Generics_001
{
    // создаем класс с именем MyClass, ... параметризированный одним указателем места заполнения типом - Т
    //                                 ... с открытым типом Т
    class MyClass<T>    // параметризированный класс, обобщенный класс, класс generic
    {
        public T field;
        
        public void Method()
        {
            Console.WriteLine(field.GetType());
            // метод GetType() возвращает ссылку на построенный им экземпляр класса Type, который
            // содержит в себе всю информацию о том типе, на котором был вызван метод GetType()
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            // создаем экземпляр класса MyClass... и в качестве параметра типа (тип MyClass) передаем тип int
            //                                 ... и закрываем его типом int
            MyClass<int> instance1 = new MyClass<int>();
            instance1.Method();

            // создаем экземпляр класса MyClass и в качестве параметра типа (тип MyClass) передаем тип long
            // инстанцируем класс MyClass и закрываем его типом long
            MyClass<long> instance2 = new MyClass<long>();
            instance2.Method();

            // создаем экземпляр класса MyClass и в качестве параметра типа (тип MyClass) передаем тип string
            MyClass<string> instance3 = new MyClass<string>();
            instance3.field = "ABC";
            instance3.Method();

            Console.ReadKey();
        }
    }
}
