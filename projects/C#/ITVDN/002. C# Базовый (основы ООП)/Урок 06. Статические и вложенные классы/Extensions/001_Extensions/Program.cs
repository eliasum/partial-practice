using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

// расширяющие методы (Extension methods)
// расширяющие методы могут быть только статическими и создаваться только в статических классах

namespace _001_Extensions
{
    static class ExtensionClass
    {
        // this сообщает компилятору, что данный метод является расширяющим
        public static void ExtensionMethod(this string value)
        {
            Console.WriteLine(value);
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            string text = "текстовая строка";

            // вызов метода как статического
            ExtensionClass.ExtensionMethod(text);  // ExtensionClass - класс-объект

            // вызов метода как расширяющего
            text.ExtensionMethod();  // вызов текста text, как будто он присутствует в классе string

            Console.ReadKey();
        }
    }
}
