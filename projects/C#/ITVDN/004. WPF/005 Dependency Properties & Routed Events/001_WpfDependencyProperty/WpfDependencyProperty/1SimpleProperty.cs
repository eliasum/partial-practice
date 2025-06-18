using System.Windows;

namespace WpfDependencyProperty
{
    // Простое свойство зависимостей.
    class SimpleProperty : DependencyObject
    {
        // Идентификатор свойства зависимости - поле представляющее свойство зависимости. Согласно условию должно иметь имя плюс слово Property в конце.
        // Таким образом можно отделить имя свойства от имени свойства зависимости.
        // свойство зависимости обязательно должно быть public и static
        public static DependencyProperty TestDataProperty;

        // Статический конструктор. Сработает до выполнения любого кода данного экземпляра.
        static SimpleProperty()
        {
            // Регистрация свойства зависимости. Это нужно сделать до того, как свойство начнет использоваться в коде.
            TestDataProperty = DependencyProperty.Register("TestData", typeof(string), typeof(SimpleProperty));
            // параметр 1: Имя свойства.
            // параметр 2: Тип данных свойства.
            // параметр 3: Тип, которому принадлежит это свойство.
        }

        // Упаковка свойства зависимостей в традиционное свойство.
        // Методы SetValue и GetValue унаследованы от класса DependencyObject
        public string TestData
        {
            set
            {
                SetValue(TestDataProperty, value);
            }
            get
            {
                return (string)GetValue(TestDataProperty);
            }
        }
    }
}


