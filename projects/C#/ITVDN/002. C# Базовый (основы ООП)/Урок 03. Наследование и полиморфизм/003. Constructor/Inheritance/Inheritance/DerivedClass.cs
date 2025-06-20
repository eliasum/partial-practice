﻿// наследование 

namespace Inheritance
{
    class DerivedClass : BaseClass
    {
        public int derivedField;

        // конструктор по умолчанию
        //public DerivedClass()
        //{

        //}

        //Пользовательский конструктор.
        //При создании объекта производного класса конструктор производного класса
        //автоматически вызывает конструктор по умолчанию из базового класса.
        //Конструктор базового класса присвоит всем данным какие-то свои безопасные значения.
        //После этого начнет работу конструктор производного класса, который повторно
        //будет определять значения для унаследованных членов. (ДВОЙНАЯ РАБОТА!)
        public DerivedClass(int number1, int number2)
        {
            // инициализируем поле базового класса
            this.baseNumber = number1;

            // инициализируем поле производного (данного) класса
            this.derivedField = number2;
        }
    }
}