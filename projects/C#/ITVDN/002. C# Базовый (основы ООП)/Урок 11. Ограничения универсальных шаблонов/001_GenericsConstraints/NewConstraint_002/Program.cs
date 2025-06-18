/*2021.12.29 17:01 IMM*/

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

// Ограничения параметров типа

namespace GenericsConstraints
{ 
    // class MyClass параметризированный указателем места заполнения типом T

    // where T : new()  -  Аргумент типа должен иметь открытый конструктор без параметров.

    /*
        При использовании с другими ограничениями ограничение new() должно устанавливаться 
        последним:
    */
    // class MyClass<T> where T : class, new()   { /* ... */ }

    // Так же это ограничение не работает с абстрактными классами.

    class MyClass<T> where T : new()
    {
        /*
            создание экземпляра типа T с открытым конструктором без параметров на куче.
            Это демонстрация создания экземпляра неизвестного на данный момент типа.
        */

        public T instance = new T();    

        public void GetValues()
        {
            Console.WriteLine(instance.ToString());
        }
    }

    class TestClass : Object
    {
        // два автосвойства
        public int MyIntProperty { get; set; }
        public string MyStringProperty { get; set; }

        // переопределение метода ToString() из базового класса object
        public override string ToString()
        {
            return string.Format("{0} - {1}", MyIntProperty, MyStringProperty);
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            /*
                создаем экземпляр класса MyClass и закрываем его типом TestClass.

                При создании экземпляра класса MyClass в нем создается экземпляр
                класса TestClass ( public TestClass instance = new TestClass(); )
            */
            MyClass<TestClass> foo = new MyClass<TestClass>();
            foo.instance.MyIntProperty = 1;
            foo.instance.MyStringProperty = "Hello World!";
            foo.GetValues();

            Console.ReadKey();
        }
    }
}
