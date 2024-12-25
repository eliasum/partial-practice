/*2020.10.20 20:02 IMM*/
/*2024.12.25 15:24 IMM*/

using System;

namespace DestructorObject
{
    class MyClass : Object 
    {
        // INFO:
        // В базовом классе Object имеется свой деструктор, 
        // но он не вызывается для объектов производного класса.
        // В производных классах, требуется создавать собственный деструктор.
        
        // См. Ctrl + Alt + j 
    }

    class Program
    {
        static void Main()
        {
            MyClass my = new MyClass();
        }
    }
}
