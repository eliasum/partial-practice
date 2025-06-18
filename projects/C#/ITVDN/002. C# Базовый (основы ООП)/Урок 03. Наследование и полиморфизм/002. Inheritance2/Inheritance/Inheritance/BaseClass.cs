using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

// наследование 

namespace Inheritance
{
    class BaseClass
    {
        // поля

        // открытое поле
        public string publicField = "BaseClass.publicField";

        // закрытое поле
        private string privateField = "BaseClass.privateField";

        // защищенное поле
        protected string protectedField = "BaseClass.protectedField";

        // методы

        public void Show()
        {
            Console.WriteLine(privateField);
        }
    }
}