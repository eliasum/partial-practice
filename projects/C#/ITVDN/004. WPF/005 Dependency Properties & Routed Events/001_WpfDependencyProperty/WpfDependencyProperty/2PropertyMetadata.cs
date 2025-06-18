using System.Windows;

namespace WpfDependencyProperty
{
    // Свойство зависимостей, которое использует метаданные
    class PropertyMetadata : DependencyObject
    {
        // Поле представляющее свойство зависимости. Согласно условию должно иметь имя плюс слово Property в конце.
        // Таким образом, можно отделить имя свойства от имени свойства зависимости.
        public static readonly DependencyProperty TestDataProperty;

        // Статический конструктор. Сработает до выполнения любого кода данного экземпляра.
        static PropertyMetadata()
        {
            // Объект указывает какие службы вы хотите использовать вместе со своим свойством зависимостей (например, поддержку привязки данных, анимации и т.д.)
            FrameworkPropertyMetadata metadata = new FrameworkPropertyMetadata("default value", FrameworkPropertyMetadataOptions.NotDataBindable);

            // Регистрация свойства зависимости. Это нужно сделать до того, как свойство начнет использоваться в коде.
            TestDataProperty = DependencyProperty.Register("TestData", typeof(string), typeof(PropertyMetadata), metadata, new ValidateValueCallback(Validate));
            // параметр 1: Имя свойства.
            // параметр 2: Тип данных свойства.
            // параметр 3: Тип, которому принадлежит это свойство.
            // параметр 4: Метаданные.
            // параметр 5: Метод для проверки корректности значения.
        }

        // Упаковка свойства зависимостей в традиционное свойство.
        // Методы SetValue и GetValue унаследованы от класса DependencyObject
        public string TestData
        {
            set { SetValue(TestDataProperty, value); }
            get { return (string)GetValue(TestDataProperty); }
        }

        //  Проверка значения.
        static bool Validate(object value)
        {
            if (value.ToString() == "error")
                return false;
            return true;
        }
    }
}


