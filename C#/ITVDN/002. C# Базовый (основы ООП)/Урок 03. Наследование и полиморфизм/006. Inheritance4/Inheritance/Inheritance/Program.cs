using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

// полиморфизм - возможность объектов с одинаковой спецификацией иметь различную реализацию
// формы полиморфизма:
// 1. Ad-hoc полиморфизм
// 2. классический (принудительный) полиморфизм:
// - использование виртуальных членов (переопределение virtual/override)
// - приведение типов
// ! - В случае одновременного использования двух форм классического полиморфизма,
// первая форма нейтрализует вторую (доминирует над второй).

namespace Inheritance
{
    class Program
    {
        static void Main(string[] args)
        {
            DerivedClass instance = new DerivedClass();
            instance.Method();

            // UpCast
            BaseClass instanceUp = instance;  // UpCast делается неявным образом
            instanceUp.Method();

            // DownCast
            DerivedClass instanceDown = (DerivedClass)instanceUp;
            instanceDown.Method();            // DownCast невозможен без предварительного UpCast

            Console.ReadKey();
        }
    }
}
