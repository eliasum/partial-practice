using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _002_Singleton
{
    class Singleton
    {
        private static Singleton instance = null; // закрытое статическое поле типа Singleton

        protected Singleton()  // защищенный конструктор
        {
            Console.WriteLine("защищенный конструктор protected Singleton()");
        }

        // фабричный метод - метод, что то порождающий (в данном случае себя)
        public static Singleton Instance()
        {
            // если объект еще не создан
            if(instance==null)
            {
                // то создаем новый экземпляр
                instance = new Singleton();
            }

            // иначе возвращаем ссылку на существующий объект
            return instance;
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            Singleton instance1 = Singleton.Instance();
            Singleton instance2 = Singleton.Instance();

            if (instance1 == instance2) Console.WriteLine("ссылки указывают на один экземпляр объекта");

            Console.WriteLine(instance1.GetHashCode());
            Console.WriteLine(instance2.GetHashCode());

            Console.ReadKey();
        }
    }
}
