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
        public int baseNumber;

        // конструктор по умолчанию
        public BaseClass()
        {

        }

        // пользовательский конструктор
        public BaseClass(int baseNumber)
        {
            this.baseNumber = baseNumber;
        }
    }
}