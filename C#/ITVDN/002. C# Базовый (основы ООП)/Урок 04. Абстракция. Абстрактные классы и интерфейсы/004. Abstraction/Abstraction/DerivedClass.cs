using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstraction
{
    class DerivedConcreteClass : AbstractBaseClass
    {
        // переопределяем виртуальный метод VirtualMethod() базового абстрактного класса
        // Если мы не переопределим виртуальный метод, то будет использован метод из базового класса

        public override void VirtualMethod()
        {
            Console.WriteLine("DerivedConcreteClass.VirtualMethod");
        }

        // реализуем абстрактный метод AbstractMethod() базового абстрактного класса
        public override void AbstractMethod()
        {
            Console.WriteLine("DerivedConcreteClass.AbstractMethod");
        }
    }
}