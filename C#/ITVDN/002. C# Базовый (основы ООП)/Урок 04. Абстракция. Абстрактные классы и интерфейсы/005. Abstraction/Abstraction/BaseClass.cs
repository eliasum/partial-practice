using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstraction
{
    abstract class AbstractBaseClass
    {
        // 1.
        // Обычный метод передается производному классу как при наследовании от конкретного класса
        public void SimpleMethod()
        {
            Console.WriteLine("AbstractBaseClass.SimpleMethod");
        }

        // 2.
        // Виртуальный метод передается производному классу как при наследовании от конкретного класса
        virtual public void VirtualMethod()
        {
            Console.WriteLine("AbstractBaseClass.VirtualMethod");
        }

        // 3.
        // Абстрактный метод реализуется в производном классе
        abstract public void AbstractMethod();
    }
}