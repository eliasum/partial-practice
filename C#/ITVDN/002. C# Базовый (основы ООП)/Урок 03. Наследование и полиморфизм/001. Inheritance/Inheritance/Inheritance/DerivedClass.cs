// наследование 

namespace Inheritance
{
    class DerivedClass : BaseClass
    {
        // конструктор
        public DerivedClass()
        {
            // изменяем все доступные поля, унаследованные от базового класса
            publicField = "DerivedClass.publicField";
            protectedField = "DerivedClass.protectedField";
        }
    }
}