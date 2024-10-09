// наследование 

namespace Inheritance
{
    class DerivedClass : BaseClass
    {
        public int derivedField;
        /*
        // конструктор по умолчанию
        public DerivedClass()
        {

        }
        */
        //Пользовательский конструктор.
        //Вызывается пользовательский конструктор базового класса, при этом не нужно
        //присваивать значения унаследованным членам в конструкторе производного класса.
        public DerivedClass(int number1, int number2) : base(number1)
        {
            // инициализируем поле производного (данного) класса
            this.derivedField = number2;
        }
    }
}