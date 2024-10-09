using System;

namespace Classes
{
    // вторая часть класса  
    partial class PartialClass
    {
        // определение частичного метода
        partial void PartialMethod()
        {
            Console.WriteLine("Вызван частичный метод PartialMethod()");
        }

        // вызов чатичного метода через метод обертку
        public void CallPartialMethod()
        {
            PartialMethod();

            // при вызове нереализованного частичного метода компилятор его проигнорирует
            // и ошибки уровня выполнения не будет
            MyMethod();
        }

        #region Реализация частичных методов в других частях класса необязательна!
        //partial void MyMethod()
        //{
        //    Console.WriteLine("Реализация частичных методов в других частях класса PartialClass необязательна!");
        //}
        #endregion
    }
}